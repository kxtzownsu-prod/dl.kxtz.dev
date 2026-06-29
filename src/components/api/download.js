import {API_GetBackend, API_Request} from './backend.js';

function normalizePath(path) {
  if (typeof path !== 'string' || path.length === 0) {
    throw new TypeError('path must be a non-empty string');
  }

  return path.startsWith('/') ? path : `/${path}`;
}

function fileName(path) {
  const normalized = normalizePath(path);
  return normalized.slice(normalized.lastIndexOf('/') + 1);
}

function makeAPIURL(baseURL, route, path) {
  const url = new URL(route, `${baseURL}/`);
  url.searchParams.set('path', normalizePath(path));
  return url.toString();
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') ?? '';
  return contentType.includes('application/json')
    ? await response.json()
    : await response.text();
}

export async function API_GetDirectDownloadLink(path) {
  return makeAPIURL(await API_GetBackend(), '/api/v2/download', path);
}

export async function API_GetRawFile(path) {
  const response = await API_Request('/api/v2/raw', {
    params: {
      path: normalizePath(path)
    }
  });

  return await response.text();
}

export async function API_GetFileList(path = '/') {
  const response = await API_Request('/api/v2/files', {
    params: {
      path: normalizePath(path)
    }
  });

  return await parseResponse(response);
}

function getFilesFromList(files) {
  return Array.isArray(files) ? files : files?.files ?? [];
}

export async function API_GetFileInfo(path) {
  const response = await API_Request('/api/v2/info', {
    params: {
      path: normalizePath(path)
    }
  });

  return await response.json();
}

export async function API_DownloadFile(path) {
  const link = document.createElement('a');

  link.href = await API_GetDirectDownloadLink(path);
  link.rel = 'noopener';
  document.body.append(link);
  link.click();
  link.remove();
}
