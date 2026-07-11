<script>
  import { onMount } from 'svelte';

  import { directoryHref, normalizePath } from '../../path.js';
  import { API_GetTree } from '../api/tree.js';
  import SidebarFolderItem from './SidebarFolderItem.svelte';
  import SidebarFolderList from './SidebarFolderList.svelte';

  let {
    currentPath = '/',
    onNavigate = () => {}
  } = $props();

  let tree = $state([]);
  let error = $state('');
  let openFolders = $state(new Set(['/']));

  let entries = $derived([{
    name: 'My Files',
    path: '/',
    type: 'directory',
    subdirs: tree
  }]);
  let visibleEntries = $derived(flattenTree(entries, openFolders));

  function flattenTree(items, expanded, depth = 0) {
    const visible = [];
    const sortedItems = [...items].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, {sensitivity: 'base'}));

    for (const item of sortedItems) {
      visible.push({item, depth});

      if (item.subdirs?.length > 0 && expanded.has(item.path)) {
        visible.push(...flattenTree(item.subdirs, expanded, depth + 1));
      }
    }

    return visible;
  }

  function expandPath(path) {
    const expanded = new Set(openFolders);
    const parts = normalizePath(path).split('/').filter(Boolean);

    expanded.add('/');

    for (let index = 1; index <= parts.length; index++) {
      expanded.add(`/${parts.slice(0, index).join('/')}`);
    }

    openFolders = expanded;
  }

  function toggleFolder(path) {
    const expanded = new Set(openFolders);

    if (expanded.has(path)) {
      expanded.delete(path);
    } else {
      expanded.add(path);
    }

    openFolders = expanded;
  }

  onMount(async () => {
    try {
      tree = await API_GetTree();
      expandPath(currentPath);
    } catch (err) {
      console.error(err);
      error = err.message || 'failed to load folders';
    }
  });
</script>

<div>
  <SidebarFolderList class="overflow-x-hidden">
    {#each visibleEntries as entry (entry.item.path)}
      <SidebarFolderItem
        depth={entry.depth}
        isFirstEntry={entry.item.path == '/'}
        isOpen={openFolders.has(entry.item.path)}
        hasSubdirs={entry.item.subdirs?.length > 0}
        folderName={entry.item.name}
        folderPath={directoryHref(entry.item.path)}
        folderType={entry.item.type}
        selected={normalizePath(currentPath) == entry.item.path}
        onNavigate={() => onNavigate(entry.item.path)}
        onToggle={() => toggleFolder(entry.item.path)}
      />
    {/each}
  </SidebarFolderList>

  {#if error}
    <p class="px-2 pt-2 text-on_surface">{error}</p>
  {/if}
</div>
