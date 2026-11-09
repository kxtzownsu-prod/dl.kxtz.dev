import { pathSegments } from '../../scripts/path.js';
import { API_PathParams, API_Request, API_RequestBlob, API_RequestText, API_GetURL } from './backend.js';

const STREAM_DOWNLOAD_THRESHOLD = 256 * 1024 * 1024;

export const API_RAW_FILE_PATH = "/api/v2/raw";

export async function API_GetDirectDownloadLink(path) {
  return await API_GetURL('/api/v2/download', API_PathParams(path));
}

export async function API_GetRawFile(path) {
  return await API_RequestText(API_RAW_FILE_PATH, {
    params: API_PathParams(path)
  });
}

export async function API_GetRawFileBlob(path) {
  return await API_RequestBlob(API_RAW_FILE_PATH, {
    params: API_PathParams(path)
  });
}

async function streamDownload(path, filename) {
  const response = await API_Request('/api/v2/download', {
    params: API_PathParams(path)
  });

  let handle;
  try {
    handle = await window.showSaveFilePicker({suggestedName: filename});
  } catch (error) {
    if (response.body) await response.body.cancel();
    throw error;
  }

  const writable = await handle.createWritable();

  if (!response.body) {
    await writable.write(await response.blob());
    await writable.close();
    return;
  }

  await response.body.pipeTo(writable);
}

async function blobDownload(path, filename) {
  const blob = await API_RequestBlob('/api/v2/download', {
    params: API_PathParams(path)
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.rel = 'noopener';
  document.body.append(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function API_DownloadFile(path, size = 0) {
  const filename = pathSegments(path).pop() || 'download';

  try {
    if (size >= STREAM_DOWNLOAD_THRESHOLD && 'showSaveFilePicker' in window) {
      await streamDownload(path, filename);
    } else {
      await blobDownload(path, filename);
    }
  } catch (error) {
    if (error.name !== 'AbortError') console.error(error);
  }
}
