<script>
  import { onMount } from 'svelte';

  import { API_GetFileInfo, API_GetFileList } from '../api/download.js';

  let data = [];
  let error = '';

  onMount(async () => {
    try {
      const path = decodeURIComponent(window.location.pathname);
      const fileInfo = await API_GetFileInfo(path);

      if (fileInfo.type !== 'directory') {
        throw new Error('The path is not a directory.');
      }

      const files = await API_GetFileList(path);

      if (path != '/') {
        data = [
          {
            name: '..',
            path: '../',
            modified: '',
            size: '',
            type: 'directory'
          },
          ...files
        ];
      } else {
        data = files;
      }
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
    <div><a href="{item.path}">{item.name}</a></div>
  {/each}
{/if}
