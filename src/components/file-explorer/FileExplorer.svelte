<script>
  import { onMount } from 'svelte';
  
  import { API_GetFileInfo, API_GetFileList } from '../api/download.js';

  let data = [];
  let error = false;

  onMount(async () => {
    try {
      const fileInfo = await API_GetFileInfo('/');
      if (fileInfo.type === 'directory') {
        data = await API_GetFileList('/');
      } else {
        throw new Error('The path is not a directory.');
      }
    } catch (err) {
      console.error(err);
    }
  });
</script>

{#if error}
  <p>{error}</p>
{:else if data.length === 0}
  <p>loading...</p>
{:else}
  {#each data as item}
    <div>./{item.name}</div>
  {/each}
{/if}