const API_MAIN = 'https://ddl.kxtz.dev';
const API_FALLBACK = 'https://ddl-fallback.kxtz.dev';
const API_CACHE_KEY = 'kxtz_api_cache';
const DEFAULT_CACHE_TIMEOUT = 5 * 60 * 1000; /* 5 minutes */
const REQUEST_TIMEOUT = 10 * 1000; /* 10 seconds */

function getCache() {
  window.__cache__ ??= {};
  return window.__cache__;
}

function normalizeBaseURL(url) {
  if (typeof url !== 'string' || url.trim() === '') return null;
  const withProtocol = /^https?:\/\//.test(url) ? url : `https://${url}`;
  return withProtocol.replace(/\/+$/, '');
}

function makeURL(baseURL, path, params = {}) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(normalizedPath, `${baseURL}/`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  }

  return url;
}

function readStoredCache() {
  const cache = getCache();
  if (cache.apiURL && cache.apiCachedAt) return cache;

  try {
    const stored = localStorage.getItem(API_CACHE_KEY);
    if (!stored) return cache;
    const parsed = JSON.parse(stored);
    cache.apiURL = parsed.apiURL;
    cache.apiCachedAt = parsed.apiCachedAt;
    cache.isFallback = Boolean(parsed.isFallback);
  } catch {}

  return cache;
}

function writeStoredCache(apiURL, isFallback) {
  const cache = getCache();
  cache.apiURL = apiURL;
  cache.apiCachedAt = Date.now();
  cache.isFallback = isFallback;

  try {
    localStorage.setItem(API_CACHE_KEY, JSON.stringify({
      apiURL: cache.apiURL,
      apiCachedAt: cache.apiCachedAt,
      isFallback: cache.isFallback
    }));
  } catch {}
}

function clearStoredCache() {
  delete window.__cache__;

  try {
    localStorage.removeItem(API_CACHE_KEY);
  } catch {}
}

function isCacheValid(cache) {
  if (!cache.apiURL || !cache.apiCachedAt) return false;
  return Date.now() - Number(cache.apiCachedAt) < DEFAULT_CACHE_TIMEOUT;
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

async function checkAPI(baseURL) {
  const url = makeURL(baseURL, '/api/v2/ping');
  try {
    const response = await fetchWithTimeout(url, {
      method: 'GET'
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function API_Init() {
  const cache = readStoredCache();
  if (isCacheValid(cache)) {
    const cachedURL = normalizeBaseURL(cache.apiURL);
    const oppositeURL = cachedURL === API_FALLBACK ? API_MAIN : API_FALLBACK;

    if (cachedURL && await checkAPI(cachedURL)) {
      writeStoredCache(cachedURL, cachedURL === API_FALLBACK);
      return cachedURL;
    }

    if (await checkAPI(oppositeURL)) {
      writeStoredCache(oppositeURL, oppositeURL === API_FALLBACK);
      return oppositeURL;
    }

    clearStoredCache();
    throw new Error('no api backend is available');
  }

  if (await checkAPI(API_MAIN)) {
    writeStoredCache(API_MAIN, false);
    return API_MAIN;
  }

  if (await checkAPI(API_FALLBACK)) {
    writeStoredCache(API_FALLBACK, true);
    return API_FALLBACK;
  }

  clearStoredCache();
  throw new Error('no api backend is available');
}

export function API_GetCachedBackend() {
  const cache = readStoredCache();
  return isCacheValid(cache) ? normalizeBaseURL(cache.apiURL) : null;
}

export function API_IsFallback() {
  return Boolean(getCache().isFallback);
}

export async function API_GetBackend() {
  return await API_Init();
}

export async function API_Request(path, options = {}) {
  const baseURL = await API_GetBackend();
  const url = makeURL(baseURL, path, options.params);
  const {params: _params, timeout, ...requestOptions} = options;
  const response = await fetchWithTimeout(url, {
    ...requestOptions,
    timeout
  });

  if (!response.ok) {
    throw new Error(`api request failed: ${response.status} ${response.statusText}`);
  }

  return response;
}

export async function API_GetJSON(path, options = {}) {
  const response = await API_Request(path, options);
  return await response.json();
}

export async function API_Ping() {
  return await API_GetJSON('/api/v2/ping');
}

export {API_FALLBACK, API_MAIN};
