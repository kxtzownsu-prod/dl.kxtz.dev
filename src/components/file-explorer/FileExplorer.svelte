<script>
  import { onMount } from 'svelte';

  import { API_GetFileInfo, API_GetFileList } from '../api/download.js';

  let data = [];
  let error = '';

  function fileSort(a, b) {
    if (a.type !== b.type) {
      return a.type === 'directory' ? -1 : 1;
    }

    return a.name.localeCompare(b.name, undefined, {sensitivity: 'base'});
  }

  function displayName(item) {
    return item.type === 'directory' && !item.name.endsWith('/')
      ? `${item.name}/`
      : item.name;
  }

  function parentPath(path) {
    const parts = path.split('/').filter(Boolean);

    if (parts.length <= 1) {
      return '/';
    }

    return `/${parts.slice(0, -1).join('/')}/`;
  }

  onMount(async () => {
    try {
      const path = decodeURIComponent(window.location.pathname);
      const fileInfo = await API_GetFileInfo(path);

      if (fileInfo.type !== 'directory') {
        throw new Error('The path is not a directory.');
      }

      const files = await API_GetFileList(path);
      const sortedFiles = [...files].sort(fileSort);

      data = [
        {
          name: '..',
          path: parentPath(path),
          modified: '',
          size: '',
          type: 'directory'
        },
        ...sortedFiles
      ];
    } catch (err) {
      console.error(err);
      error = err.message || 'Failed to load directory.';
    }
  });
</script>

{#if error}
  <p>{error}</p>
{:else if data.length === 0}
  <p>loading...</p>
{:else}
  {#each data as item}
    <div><a href="{item.path}">{displayName(item)}</a></div>
  {/each}
{/if}
