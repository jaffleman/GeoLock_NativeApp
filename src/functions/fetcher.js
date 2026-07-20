// fetcher.js

const API_URL = 'https://api.jaffleman.tech/geolock';

const METHODS_WITH_BODY = new Set([
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
]);

/* -------------------------------------------------------------------------- */
/*                                    LOGS                                    */
/* -------------------------------------------------------------------------- */

const log = (...args) => {
  if (__DEV__) {
    console.log('[FETCHER]', ...args);
  }
};

/* -------------------------------------------------------------------------- */
/*                                HTTP ERROR                                  */
/* -------------------------------------------------------------------------- */

class HttpError extends Error {
  constructor(response, payload, url) {
    super(
      `HTTP ${response.status} ${response.statusText || ''}`.trim()
    );

    this.name = 'HttpError';
    this.status = response.status;
    this.payload = payload;
    this.url = url;
  }
}

/* -------------------------------------------------------------------------- */
/*                              PARSE RESPONSE                                */
/* -------------------------------------------------------------------------- */

async function parseResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const contentType =
    response.headers?.get?.('content-type') || '';

  const isJson =
    contentType.includes('application/json');

  try {
    return isJson
      ? await response.json()
      : await response.text();
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                                FETCHER                                     */
/* -------------------------------------------------------------------------- */

/**
 * @param {Object} options
 * @param {string} options.route
 * @param {string} [options.method="GET"]
 * @param {*} [options.data]
 * @param {Object} [options.headers]
 * @param {number} [options.timeoutMs=4000]
 * @param {string} [options.idempotencyKey]
 * @param {AbortSignal} [options.signal]
 * @param {(result:any|false)=>void} [options.callback]
 *
 * @returns {Promise<any|false>}
 */
export default async function fetcher({
  route,
  method = 'GET',
  data,
  headers = {},
  timeoutMs = 4000,
  idempotencyKey,
  signal: externalSignal,
  callback,
}) {
  const startedAt = Date.now();

  const controller = new AbortController();

  let timeoutId;
  let abortListener;

  try {
    /* ---------------------------------------------------------------------- */
    /*                            Gestion timeout                              */
    /* ---------------------------------------------------------------------- */

    timeoutId = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    /* ---------------------------------------------------------------------- */
    /*                     Propagation d'un Abort externe                      */
    /* ---------------------------------------------------------------------- */

    if (externalSignal) {
      abortListener = () => controller.abort();

      if (externalSignal.aborted) {
        controller.abort();
      } else {
        externalSignal.addEventListener(
          'abort',
          abortListener,
          { once: true }
        );
      }
    }

    /* ---------------------------------------------------------------------- */
    /*                                URL finale                               */
    /* ---------------------------------------------------------------------- */

    const finalRoute = route.startsWith('/')
      ? route
      : `/${route}`;

    const url = `${API_URL}${finalRoute}`;

    /* ---------------------------------------------------------------------- */
    /*                                Headers                                  */
    /* ---------------------------------------------------------------------- */

    const finalHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (idempotencyKey) {
      finalHeaders['Idempotency-Key'] =
        idempotencyKey;
    }

    /* ---------------------------------------------------------------------- */
    /*                              Fetch options                              */
    /* ---------------------------------------------------------------------- */

    const options = {
      method,
      headers: finalHeaders,
      signal: controller.signal,
    };

    if (
      METHODS_WITH_BODY.has(method.toUpperCase()) &&
      data !== undefined
    ) {
      options.body = JSON.stringify(data);
    }

    log(`${method} ${url}`);

    /* ---------------------------------------------------------------------- */
    /*                                 FETCH                                   */
    /* ---------------------------------------------------------------------- */

    const response = await fetch(url, options);

    const payload = await parseResponse(response);

    if (!response.ok) {
      throw new HttpError(response, payload, url);
    }

    const duration = Date.now() - startedAt;

    log(
      `SUCCESS ${response.status} (${duration}ms)`
    );

    if (typeof callback === 'function') {
      callback(payload);
    }

    return payload;
  } catch (error) {
    const duration = Date.now() - startedAt;

    if (error?.name === 'AbortError') {
      log(`ABORTED (${duration}ms)`);

      if (typeof callback === 'function') {
        callback(false);
      }

      return false;
    }

    if (error instanceof HttpError) {
      log(
        `HTTP ERROR ${error.status}`,
        error.payload
      );
    } else {
      log(
        'NETWORK ERROR',
        error?.message || String(error)
      );
    }

    if (typeof callback === 'function') {
      callback(false);
    }

    return false;
  } finally {
    clearTimeout(timeoutId);

    if (externalSignal && abortListener) {
      externalSignal.removeEventListener(
        'abort',
        abortListener
      );
    }
  }
}