export const DIRECTORY_TYPE = 'directory';

export function isDirectory(entry) {
  return entry?.type === DIRECTORY_TYPE;
}

export function hasSubdirectories(entry) {
  return entry?.subdirs?.length > 0;
}

export function compareEntries(a, b) {
  if (a.type !== b.type) {
    return isDirectory(a) ? -1 : 1;
  }

  return a.name.localeCompare(b.name, undefined, {sensitivity: 'base'});
}

export function sortEntries(entries) {
  return [...entries].sort(compareEntries);
}

export function displayEntryName(entry) {
  return isDirectory(entry) && !entry.name.endsWith('/')
    ? `${entry.name}/`
    : entry.name;
}
