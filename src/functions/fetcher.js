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
// console.log('Using ROUTE_IPV6:', ROUTE_IPV6);
// console.log('Using ROUTE_IPV4:', ROUTE_IPV4);
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
  console.log(`********************PROMISEANY: checking promises...********************`);
  console.log("promise.any:", typeof Promise.any);
  if (typeof Promise.any === 'function') return Promise.any(promises);
  return new Promise((resolve, reject) => {
    console.log(`********************PROMISEANY: creating new promise********************`);
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

const API_URL = 'https://api.jaffeman.tech/geolock';

/**
 * Fetch unique sur l'API IPv4.
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

  const url = `${API_URL}${route}`;
  console.log('URL:', url);

  const controller = new AbortController();

  // Propagation d'un éventuel AbortSignal externe
  const propagateAbort = () => {
    try {
      controller.abort('external abort');
    } catch {}
  };

  if (externalSignal) {
    if (externalSignal.aborted) {
      propagateAbort();
    } else {
      try {
        externalSignal.addEventListener('abort', propagateAbort, {
          once: true,
        });
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

  const withBody =
    METHODS_WITH_BODY.has(method.toUpperCase()) &&
    data !== undefined;

  const fetchOptions = {
    method,
    headers: finalHeaders,
    signal: controller.signal,
    ...(withBody && { body: JSON.stringify(data) }),
  };

  let timeoutId;

  try {
    const startedAt = Date.now();

    timeoutId = setTimeout(() => {
      controller.abort('timeout');
    }, timeoutMs);

    console.log(
      `Requête ${method} vers ${url} ${
        withBody ? '(avec body)' : '(sans body)'
      }`
    );

    const response = await fetch(url, fetchOptions);

    clearTimeout(timeoutId);

    console.log(
      `HTTP ${response.status} ${response.statusText || ''}`
    );

    if (!response.ok) {
      const payload = await parseResponse(response);

      const err = new Error(
        `HTTP ${response.status} ${response.statusText || ''}`.trim()
      );

      err.status = response.status;
      err.payload = payload;
      err.url = url;

      throw err;
    }

    const result = await parseResponse(response);

    const duration = Date.now() - startedAt;

    console.log(
      `**** FETCH DONE (${response.status}) in ${duration}ms ****`
    );

    callback(result);

    return result;
  } catch (err) {
    clearTimeout(timeoutId);

    const name = err?.name || err?.status || 'Error';
    const msg = err?.message || String(err);

    console.log(`${logMargin} échec => ${name}: ${msg}`);

    if (err?.url) {
      console.log(`URL: ${err.url}`);
    }

    callback(false);

    return false;
  }
}
