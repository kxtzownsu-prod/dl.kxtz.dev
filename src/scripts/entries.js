export const DIRECTORY_TYPE = 'directory';
export const FILE_TYPE = 'file';
const ENTRY_COLLATOR = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base'
});

export function isDirectory(entry) {
  return entry?.type === DIRECTORY_TYPE;
}

export function isFile(entry){
  return entry?.type === FILE_TYPE;
}

export function hasSubdirectories(entry) {
  return entry?.subdirs?.length > 0;
}

export function compareEntries(a, b) {
  if (a.type !== b.type) {
    return isDirectory(a) ? -1 : 1;
  }

  return ENTRY_COLLATOR.compare(a.name, b.name);
}

export function sortEntries(entries) {
  return [...entries].sort(compareEntries);
}

export function displayEntryName(entry) {
  return entry.name;
}
