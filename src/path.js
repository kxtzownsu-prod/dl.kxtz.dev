function decodedPathSegments(path) {
  if (typeof path !== 'string' || path.length === 0) {
    throw new TypeError('path must be a non-empty string');
  }

  let decodedPath = path;

  try {
    decodedPath = decodeURIComponent(path);
  } catch {}

  return decodedPath.split('/').filter(Boolean);
}

export function normalizePath(path) {
  const parts = decodedPathSegments(path);
  return parts.length === 0 ? '/' : `/${parts.join('/')}`;
}

export function pathSegments(path) {
  return decodedPathSegments(path);
}

export function directoryHref(path) {
  const parts = pathSegments(path);

  if (parts.length === 0) {
    return '/';
  }

  const encodedPath = parts
    .map((part) => encodeURIComponent(part))
    .join('/');

  return `/${encodedPath}/`;
}
