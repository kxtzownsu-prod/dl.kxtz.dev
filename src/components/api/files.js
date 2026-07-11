import {API_PathParams, API_RequestJSON} from './backend.js';

function requireArray(value, endpoint) {
  if (!Array.isArray(value)) {
    throw new TypeError(`${endpoint} response must be an array`);
  }

  return value;
}

export async function API_GetTree() {
  return requireArray(await API_RequestJSON('/api/v2/tree'), 'tree');
}

export async function API_GetFileList(path = '/') {
  const files = await API_RequestJSON('/api/v2/files', {
    params: API_PathParams(path)
  });
  return requireArray(files, 'files');
}

export async function API_GetFileInfo(path) {
  return await API_RequestJSON('/api/v2/info', {
    params: API_PathParams(path)
  });
}
