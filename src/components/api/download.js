import {API_GetBackend, API_Request} from './backend.js';

function normalizePath(path) {
  if (typeof path !== 'string' || path.length === 0) {
    throw new TypeError('path must be a non-empty string');
  }

  return path.startsWith('/') ? path : `/${path}`;
}

function parentPath(path) {
  const normalized = normalizePath(path);
  const lastSlash = normalized.lastIndexOf('/');
  if (lastSlash <= 0) return '/';
  return normalized.slice(0, lastSlash);
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
  if (contentType.includes('application/json')) return await response.json();
  return await response.text();
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
  if (Array.isArray(files)) return files;
  if (Array.isArray(files?.files)) return files.files;
  if (Array.isArray(files?.entries)) return files.entries;
  if (Array.isArray(files?.children)) return files.children;
  if (Array.isArray(files?.items)) return files.items;
  return [];
}

export async function API_GetFileInfo(path) {
  const normalized = normalizePath(path);
  const files = await API_GetFileList(parentPath(normalized));
  const name = fileName(normalized);

  return getFilesFromList(files).find((file) => {
    const filePath = file.path ?? file.name ?? file.filename;
    return filePath === normalized || filePath === name;
  }) ?? null;
}

export async function API_GetFileBlob(path) {
  const response = await API_Request('/api/v2/download', {
    params: {
      path: normalizePath(path)
    }
  });

  return await response.blob();
}

export async function API_DownloadFile(path) {
  const blob = await API_GetFileBlob(path);
  const link = document.createElement('a');
  const objectURL = URL.createObjectURL(blob);

  link.href = objectURL;
  link.download = fileName(path);
  link.rel = 'noopener';
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectURL);
}
