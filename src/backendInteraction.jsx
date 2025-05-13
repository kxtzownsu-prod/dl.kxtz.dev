export const PRIMARY_ORIGIN = "https://ddl.kxtz.dev";
export const BACKUP_ORIGIN = "https://ddl-bak.kxtz.dev";
let _cachedActiveOrigin = null;

export async function getActiveOrigin() {
  if (_cachedActiveOrigin) return _cachedActiveOrigin;

  try {
    const res = await fetch(`${PRIMARY_ORIGIN}/api/ping`, { method: "OPTIONS", signal: AbortSignal.timeout?.(5000) });
    if (res.ok) {
      _cachedActiveOrigin = PRIMARY_ORIGIN;
      return PRIMARY_ORIGIN;
    }
  } catch (err) {
    console.warn("[getActiveOrigin] PRIMARY failed:", err.message);
  }

  _cachedActiveOrigin = BACKUP_ORIGIN;
  return BACKUP_ORIGIN;
}

export const ACTIVE_ORIGIN = getActiveOrigin();

export async function getBackendUrl(endpoint, path) {
  const encodedPath = encodeURIComponent(path);
  const origin = await getActiveOrigin();
  return `${origin}/api/v1/${endpoint}?path=${encodedPath}`;
}


export const backend = {
  async fetchWithFallback(primary, backup, options) {
    try {
      const res = await fetch(primary, { ...options, signal: AbortSignal.timeout?.(5000) });
      if (!res.ok) throw new Error("Primary failed");
      return res;
    } catch (err) {
      console.warn("[fetchWithFallback] Primary failed:", err.message);
      const res = await fetch(backup, { ...options, signal: AbortSignal.timeout?.(5000) });
      if (!res.ok) throw new Error("Backup failed too");
      return res;
    }
  },

  async filelist(path = window.location.pathname) {
    const encoded = encodeURIComponent(path);
    const urlPrimary = `${PRIMARY_ORIGIN}/api/v1/files?path=${encoded}`;
    const urlBackup = `${BACKUP_ORIGIN}/api/v1/files?path=${encoded}`;
    const res = await backend.fetchWithFallback(urlPrimary, urlBackup);
    return await res.json();
  },

  async download(path) {
    const encoded = encodeURIComponent(path);
    const primaryUrl = `${PRIMARY_ORIGIN}/api/v1/download?path=${encoded}`;
    const backupUrl = `${BACKUP_ORIGIN}/api/v1/download?path=${encoded}`;

    try {
      const res = await fetch(primaryUrl, { method: "OPTIONS" });
      if (res.ok) {
        return primaryUrl;
      } else {
        throw new Error("Primary responded but not OK");
      }
    } catch (err) {
      console.warn("[download fallback] Primary OPTIONS failed, using backup:", err.message);
      return backupUrl;
    }
  },

  async raw(path) {
    const encoded = encodeURIComponent(path);
    const urlPrimary = `${PRIMARY_ORIGIN}/api/v1/raw?path=${encoded}`;
    const urlBackup = `${BACKUP_ORIGIN}/api/v1/raw?path=${encoded}`;
    const res = await backend.fetchWithFallback(urlPrimary, urlBackup);
    return await res.text();
  },
};
