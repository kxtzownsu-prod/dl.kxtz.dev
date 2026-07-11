<script>
  import { API_GetFileInfo, API_GetFileList } from '../api/download.js';

  let {
    path = '/',
    onNavigate = () => {}
  } = $props();

  let data = $state([]);
  let error = $state('');
  let requestID = 0;

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

  async function loadDirectory(path) {
    const currentRequestID = ++requestID;

    data = [];
    error = '';

    try {
      const fileInfo = await API_GetFileInfo(path);

      if (fileInfo.type !== 'directory') {
        throw new Error('The path is not a directory.');
      }

      const files = await API_GetFileList(path);
      const sortedFiles = [...files].sort(fileSort);

      if (currentRequestID != requestID) {
        return;
      }

      data = sortedFiles;
    } catch (err) {
      if (currentRequestID != requestID) {
        return;
      }

      console.error(err);
      error = err.message || 'failed to load directory';
    }
  }

  $effect(() => {
    loadDirectory(path);
  });
</script>

{#if error}
  <p>{error}</p>
{:else if data.length === 0}
  <p>loading...</p>
{:else}
  {#each data as item}
    <div>
      {#if item.type == 'directory'}
        <a
          href={item.path}
          onclick={(event) => {
            event.preventDefault();
            onNavigate(item.path);
          }}
        >
          {displayName(item)}
        </a>
      {:else}
        <a href={item.path}>{displayName(item)}</a>
      {/if}
    </div>
  {/each}
{/if}
