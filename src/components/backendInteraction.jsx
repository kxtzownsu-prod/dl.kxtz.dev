import { log, warn, err } from "../logging.jsx";

export const PRIMARY_ORIGIN = "https://ddl.fog.gay";
export const BACKUP_ORIGIN = "https://ddl.fanqyxl.net"; // keeping this as mine because you never know when it'll come back
let _cachedActiveOrigin = null;

// imho, this is pretty messy so just ignore it? :3
// all you need to do to change the backend URLs is change the two URLs above
// - kxtz

export async function getActiveOrigin() {
	if (_cachedActiveOrigin) return _cachedActiveOrigin;

	try {
		const res = await fetch(`${PRIMARY_ORIGIN}/api/ping`, {
			method: "GET",
			signal: AbortSignal.timeout?.(5000),
		});

		if (res.ok) {
			_cachedActiveOrigin = PRIMARY_ORIGIN;
			return PRIMARY_ORIGIN;
		}
	} catch (e) {
		warn(`Primary failed: ${e.message}`);
	}

	_cachedActiveOrigin = BACKUP_ORIGIN;
	return BACKUP_ORIGIN;
}

export async function getBackendUrl(endpoint, path) {
	const encodedPath = encodeURIComponent(path);
	const origin = await getActiveOrigin();
	return `${origin}/api/v1/${endpoint}?path=${encodedPath}`;
}

export const backend = {
	async fetchWithFallback(primary, backup, options) {
		try {
			const res = await fetch(primary, {
				...options,
				signal: AbortSignal.timeout?.(5000),
			});
			if (!res.ok) throw new Error("Primary failed");
			return res;
		} catch (e) {
			warn(`Primary failed: ${e.message}`);
			const res = await fetch(backup, {
				...options,
				signal: AbortSignal.timeout?.(5000),
			});
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
		} catch (e) {
			warn(`Primary OPTIONS failed, using backup: ${e.message}`);
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
