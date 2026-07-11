import {API_GetURL, API_PathParams, API_RequestText} from './backend.js';

export async function API_GetDirectDownloadLink(path) {
  return await API_GetURL('/api/v2/download', API_PathParams(path));
}

export async function API_GetRawFile(path) {
  return await API_RequestText('/api/v2/raw', {
    params: API_PathParams(path)
  });
}

export async function API_DownloadFile(path) {
  const link = document.createElement('a');

  link.href = await API_GetDirectDownloadLink(path);
  link.rel = 'noopener';
  document.body.append(link);
  link.click();
  link.remove();
}
