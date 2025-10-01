// fetcher.js
/*
=> Entrée : un objet de paramètres (route, méthode, data, headers, etc.)
Action :
    1. Construit 2 URLs (ROUTE_IPV6 + route et ROUTE-IPV4 + route)
    2. Lance 2 fetch en parallèle, un par URL
    3. Prend le premier succès via Promise.any (avec polyfill si nécessaire)
    4. Annule la requête perdante via AbortController
    5. Gère un timeout global (qui annule les deux)
    6. Parse intelligemment la réponse (JSON / texte / 204)
    7. Retourne la donnée (et appelle callback) ou false en cas d’échec global
    8. “Swallow” les rejets des promesses perdantes pour supprimer le warning RN

=> Sortie : la donnée parsée, ou false en cas d’échec
*/

// fetcher.js
import { ROUTE_IPV6, ROUTE_IPV4 } from '@env';
console.log('Using ROUTE_IPV6:', ROUTE_IPV6);
console.log('Using ROUTE_IPV4:', ROUTE_IPV4);
// console.log('Using LOCAL_APP_ROUTE22:', LOCAL_APP_ROUTE22); --- IGNORE ---

/* ----------------------- Safe global ref ----------------------- */
const G =
  (typeof globalThis === 'object' && globalThis) ||
  (typeof global === 'object' && global) ||
  (typeof window === 'object' && window) ||
  (typeof self === 'object' && self) ||
  {};

/* ----------------------- AggregateError-safe helpers ----------------------- */
const createAggregateError = (errors, message) => {
  // Si l'implémentation native existe, on l'utilise
  if (typeof G.AggregateError === 'function') {
    return new G.AggregateError(errors, message);
  }
  // Fallback minimal compatible RN : Error avec shape d'un AggregateError
  const err = new Error(message);
  err.name = 'AggregateError';
  err.errors = errors;
  return err;
};

const isAggregateError = (e) => {
  if (!e) return false;
  // Si la classe native existe
  if (typeof G.AggregateError === 'function' && e instanceof G.AggregateError) return true;
  // Sinon on détecte par le shape (name + .errors array)
  return e.name === 'AggregateError' && Array.isArray(e.errors);
};

/* ----------------------- Polyfill Promise.any (sans dépendre d'un AggregateError global) ----------------------- */
const promiseAny = (promises) => {
  if (typeof Promise.any === 'function') return Promise.any(promises);
  return new Promise((resolve, reject) => {
    const errors = [];
    let pending = promises.length;
    if (pending === 0) {
      reject(createAggregateError([], 'All promises were rejected'));
      return;
    }
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(resolve)
        .catch((e) => {
          errors[i] = e;
          if (--pending === 0) {
            reject(createAggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
};

const METHODS_WITH_BODY = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

/* ----------------------- Utils: parse réponse ----------------------- */
async function parseResponse(resp) {
  // 204 No Content
  if (resp.status === 204) return null;

  const ct = resp.headers?.get?.('content-type') || '';
  const isJson = ct.includes('application/json');

  try {
    return isJson ? await resp.json() : await resp.text();
  } catch {
    // Corps vide ou JSON invalide -> on renvoie null
    return null;
  }
}

/* ----------------------- fetcher principal ----------------------- */
/**
 * Fait 2 requêtes en parallèle (IPv6 & IPv4) et retourne la 1ère qui réussit.
 * Annule proprement le perdant, timeout global, et évite les "Unhandled Rejection".
 *
 * @param {{
 *   route: string,
 *   method?: string,
 *   data?: any,
 *   headers?: Record<string,string>,
 *   timeoutMs?: number,
 *   idempotencyKey?: string,
 *   callback?: (res: any|false) => void,
 *   signal?: AbortSignal, // optionnel: annulation externe (propagée aux 2 requêtes)
 * }} params
 * @param {string} logMargin
 * @returns {Promise<any|false>}
 */
export default async function fetcher(
  {
    route,
    method = 'GET',
    data,
    headers = {},
    timeoutMs = 4000, 
    idempotencyKey,
    callback = () => false,
    signal: externalSignal,
  },
  logMargin = ''
) {
  console.log('**** FETCH START ****');

  const url6 = `${ROUTE_IPV6}${route}`;
  const url4 = `${ROUTE_IPV4}${route}`;

  const ctrl6 = new AbortController();
  const ctrl4 = new AbortController();

  // Propagation d’un signal externe éventuel
  const propagateAbort = () => {
    try {
      ctrl6.abort('external abort');
      ctrl4.abort('external abort');
    } catch {}
  };
  if (externalSignal) {
    if (externalSignal.aborted) {
      propagateAbort();
    } else {
      try {
        externalSignal.addEventListener('abort', propagateAbort, { once: true });
      } catch {
        externalSignal.onabort = propagateAbort;
      }
    }
  }

  const finalHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };
  if (idempotencyKey) {
    finalHeaders['Idempotency-Key'] = idempotencyKey;
  }

  const optsBase = {
    method,
    headers: finalHeaders,
  };

  // Ajouter le body uniquement si méthode + data
  const withBody = METHODS_WITH_BODY.has(method.toUpperCase()) && data !== undefined;
  console.log("avec body?: ", withBody)
  const opts6 = withBody
    ? { ...optsBase, body: JSON.stringify(data), signal: ctrl6.signal }
    : { ...optsBase, signal: ctrl6.signal };
  const opts4 = withBody
    ? { ...optsBase, body: JSON.stringify(data), signal: ctrl4.signal }
    : { ...optsBase, signal: ctrl4.signal };

  // Timeout global
  let timeoutId;
  const onTimeout = () => {
    try {
      ctrl6.abort('timeout');
      ctrl4.abort('timeout');
    } catch {}
  };

  // Swallow des rejets du "perdant" (évite "Possible Unhandled Promise Rejection")
  const swallowRejection = (label) => (e) => {
    if (__DEV__) {
      console.log(`[${label}] swallowed rejection:`, e?.name || 'Error', e?.message || String(e));
    }
    // Pas de rethrow: on avale volontairement pour éviter le warning RN
  };

  // doFetch: consomme une promesse de Response (déjà créée) et applique notre logique
  const doFetch = async (label, url, responsePromise) => {
    try {
      const resp = await responsePromise; // <-- si abort / net fail, ça rejette ici (capté)
      if (!resp.ok) {
        const payload = await parseResponse(resp);
        const err = new Error(`HTTP ${resp.status} ${resp.statusText || ''}`.trim());
        err.status = resp.status;
        err.payload = payload;
        err.url = url;
        err.label = label;
        throw err;
      }
      const parsed = await parseResponse(resp);
      return { label, url, data: parsed };
    } catch (err) {
      err.label = err.label || label;
      err.url = err.url || url;
      throw err;
    }
  };

  try {
    const startedAt = Date.now();
    timeoutId = setTimeout(onTimeout, timeoutMs);

    // Crée d'abord les fetch "bruts"
    const raw6 = fetch(url6, opts6);
    const raw4 = fetch(url4, opts4);

    // IMPORTANT: attacher un .catch() **directement** sur les promesses fetch
    // pour éviter toute alerte "Unhandled" quand on les abort.
    raw6.catch(swallowRejection('ipv6/fetch'));
    raw4.catch(swallowRejection('ipv4/fetch'));

    // Envelopper avec notre logique de check/parse
    const p6 = doFetch('ipv6', url6, raw6);
    const p4 = doFetch('ipv4', url4, raw4);

    // Éviter "Unhandled" même si Promise.any résout (le perdant peut rejeter après)
    p6.catch(swallowRejection('ipv6/doFetch'));
    p4.catch(swallowRejection('ipv4/doFetch'));

    // Premier succès
    const winner = await promiseAny([p4,p6]);

    // On a un résultat => annule le perdant & nettoie
    clearTimeout(timeoutId);
    try {
      ctrl6.abort('winner chosen');
      ctrl4.abort('winner chosen');
    } catch {}

    const duration = Date.now() - startedAt;
    console.log(`**** FETCH DONE (${winner.label}) in ${duration}ms ****`);

    // Callback + retour
    callback(winner.data);
    return winner.data;
  } catch (err) {
    clearTimeout(timeoutId);

    if (isAggregateError(err)) {
      console.log(`${logMargin} échec => toutes les requêtes ont échoué`);
      const list = err.errors || [];
      list.forEach((e, i) => {
        const name = e?.name || e?.status || 'Error';
        const msg = e?.message || String(e);
        console.log(
          `[${i}] ${e?.label || 'unknown'} | ${name}: ${msg} | URL: ${e?.url || 'n/a'}`
        );
      });
    } else {
      const name = err?.name || err?.status || 'Error';
      const msg = err?.message || String(err);
      console.log(`${logMargin} échec => ${name}: ${msg}`);
      if (err?.url) console.log(`URL: ${err.url}`);
    }

    callback(false);
    return false;
  }
}
