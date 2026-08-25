import { normalizePath } from '../../scripts/path.js';

export const API_CACHE_KEY = 'kxtz_api_cache';
export const API_KEY_KEY = 'apiKey';
export const CACHE_TIMEOUT_AMOUNT_KEY = 'cacheTimeoutTimeAmount';
export const CACHE_TIMEOUT_UNIT_KEY = 'cacheTimeoutTimeUnit';

const REQUEST_TIMEOUT = 10 * 1000; /* 10 seconds */
const BACKENDS = ['https://ddl.kxtz.dev', 'https://ddl-fallback.kxtz.dev'];

/* see src/components/info-popout/Popout.svelte for why these are named like this */
const CACHE_UNIT_MS = {
  'Minute(s)': 60 * 1000,
  'Hour(s)': 60 * 60 * 1000,
  'Day(s)': 24 * 60 * 60 * 1000,
  'Week(s)': 7 * 24 * 60 * 60 * 1000
};

const DEFAULT_CACHE_TTL = 5 * CACHE_UNIT_MS['Minute(s)'];

let apiBackend = null;
let apiBackendTime = 0;
let findingBackend = null;

function useStorage(callback) {
  try {
    return callback(localStorage);
  } catch {
    return null;
  }
}

function requestHeaders(headers = {}) {
  const apiKey = useStorage((storage) => storage.getItem(API_KEY_KEY));

  return apiKey ? {Authorization: apiKey, ...headers} : headers;
}

function cacheTTL() {
  const amount = Number(useStorage((storage) => storage.getItem(CACHE_TIMEOUT_AMOUNT_KEY)));
  const unit = useStorage((storage) => storage.getItem(CACHE_TIMEOUT_UNIT_KEY));

  return Number.isFinite(amount) && amount > 0 && CACHE_UNIT_MS[unit]
    ? amount * CACHE_UNIT_MS[unit]
    : DEFAULT_CACHE_TTL;
}

function backendCacheStale() {
  return Date.now() - apiBackendTime >= cacheTTL();
}

function readCachedBackend() {
  const cached = useStorage((storage) =>
    JSON.parse(storage.getItem(API_CACHE_KEY)));

  if (!BACKENDS.includes(cached?.url) || Date.now() - cached.time >= cacheTTL()) return;

  apiBackend = cached.url;
  apiBackendTime = cached.time;
}

readCachedBackend();

function cacheBackend(url) {
  apiBackend = url;
  apiBackendTime = Date.now();
  useStorage((storage) =>
    storage.setItem(API_CACHE_KEY, JSON.stringify({url, time: apiBackendTime})));
}

function clearBackend() {
  apiBackend = null;
  apiBackendTime = 0;
  useStorage((storage) => storage.removeItem(API_CACHE_KEY));
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout ?? REQUEST_TIMEOUT);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}

function makeURL(baseURL, path, params = {}) {
  const url = new URL(path.startsWith('/') ? path : `/${path}`, `${baseURL}/`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  }

  return url;
}

async function findBackend() {
  for (const backend of new Set([apiBackend, ...BACKENDS].filter(Boolean))) {
    try {
      const ping = await fetchWithTimeout(makeURL(backend, '/api/v2/ping'), {
        headers: requestHeaders()
      });

      if (!ping.ok) continue;
      cacheBackend(backend);
      return backend;
    } catch {
      continue;
    }
  }

  clearBackend();
  throw new Error('no api backend is available');
}

export async function API_GetBackend() {
  if (apiBackend && !backendCacheStale()) return apiBackend;

  findingBackend ??= findBackend().finally(() => {
    findingBackend = null;
  });

  return await findingBackend;
}

export async function API_Request(path, options = {}) {
  const {params: _params, timeout, ...requestOptions} = options;
  const request = async () => await fetchWithTimeout(makeURL(await API_GetBackend(), path, options.params), {
    ...requestOptions,
    headers: requestHeaders(requestOptions.headers),
    timeout
  });

  let response;
  try {
    response = await request();
  } catch {
    clearBackend();
    response = await request();
  }

  if (!response.ok) {
    throw new Error(`api request failed: ${response.status} ${response.statusText}`);
  }

  return response;
}

export async function API_RequestJSON(path, options = {}) {
  return await (await API_Request(path, options)).json();
}

export async function API_RequestText(path, options = {}) {
  return await (await API_Request(path, options)).text();
}

export function API_PathParams(path) {
  return {
    path: normalizePath(path)
  };
}

export async function API_GetURL(path, params = {}) {
  return makeURL(await API_GetBackend(), path, params).toString();
}
