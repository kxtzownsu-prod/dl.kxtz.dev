const API_CACHE_KEY = 'kxtz_api_cache';
const API_CACHE_TTL = 5 * 60 * 1000; /* 5 minutes */
const REQUEST_TIMEOUT = 10 * 1000; /* 10 seconds */
const BACKENDS = ['https://ddl.kxtz.dev', 'https://ddl-fallback.kxtz.dev'];

let apiBackend = readCachedBackend();

function readCachedBackend() {
  try {
    const cached = JSON.parse(localStorage.getItem(API_CACHE_KEY));
    if (BACKENDS.includes(cached?.url) && Date.now() - cached.time < API_CACHE_TTL) {
      return cached.url;
    }
  } catch {}

  return null;
}

function cacheBackend(url) {
  apiBackend = url;

  try {
    localStorage.setItem(API_CACHE_KEY, JSON.stringify({url, time: Date.now()}));
  } catch {}
}

function clearBackend() {
  apiBackend = null;

  try {
    localStorage.removeItem(API_CACHE_KEY);
  } catch {}
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
      if (!(await fetchWithTimeout(makeURL(backend, '/api/v2/ping'))).ok) continue;
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
  return apiBackend ?? await findBackend();
}

export async function API_Request(path, options = {}) {
  const {params: _params, timeout, ...requestOptions} = options;
  const request = async () => await fetchWithTimeout(makeURL(await API_GetBackend(), path, options.params), {
    ...requestOptions,
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
