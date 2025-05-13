const PRIMARY_ORIGIN = "https://ddl.kxtz.dev";
const BACKUP_ORIGIN = "https://ddl-bak.kxtz.dev";

export const ACTIVE_ORIGIN = PRIMARY_ORIGIN;

export function getBackendUrl(endpoint, path) {
  const encodedPath = encodeURIComponent(path);
  return `${ACTIVE_ORIGIN}/api/v1/${endpoint}?path=${encodedPath}`;
}

export const backend = {
  async fetchWithFallback(primary, backup, options) {
    try {
      const res = await fetch(primary, options);
      if (!res.ok) throw new Error("Primary failed");
      return res;
    } catch (err) {
      console.warn("[fetchWithFallback] Primary failed:", err.message);
      const res = await fetch(backup, options);
      if (!res.ok) throw new Error("Backup failed too");
      return res;
    }
  },

  async filelist(path = window.location.pathname) {
    const encoded = encodeURIComponent(path);
    const urlPrimary = `https://ddl.kxtz.dev/api/v1/files?path=${encoded}`;
    const urlBackup = `https://ddl-bak.kxtz.dev/api/v1/files?path=${encoded}`;
    const res = await backend.fetchWithFallback(urlPrimary, urlBackup);
    return await res.json();
  },

  async download(path) {
    const encoded = encodeURIComponent(path);
    return `https://ddl.kxtz.dev/api/v1/download?path=${encoded}`;
  },

  async raw(path) {
    const encoded = encodeURIComponent(path);
    const urlPrimary = `https://ddl.kxtz.dev/api/v1/raw?path=${encoded}`;
    const urlBackup = `https://ddl-bak.kxtz.dev/api/v1/raw?path=${encoded}`;
    const res = await backend.fetchWithFallback(urlPrimary, urlBackup);
    return await res.text();
  },
};
