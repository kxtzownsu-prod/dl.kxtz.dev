export function normalizePath(path) {
  if (!path || path == '/') {
    return '/';
  }

  let decodedPath = path;

  try {
    decodedPath = decodeURIComponent(path);
  } catch {}

  return `/${decodedPath.split('/').filter(Boolean).join('/')}`;
}

export function directoryHref(path) {
  const normalized = normalizePath(path);

  if (normalized == '/') {
    return '/';
  }

  const encodedPath = normalized
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');

  return `/${encodedPath}/`;
}
