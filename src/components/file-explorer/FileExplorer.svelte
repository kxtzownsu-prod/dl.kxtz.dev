<script>
  import { displayEntryName, isDirectory, sortEntries } from '../../entries.js';
  import { directoryHref } from '../../path.js';
  import { API_GetFileInfo, API_GetFileList } from '../api/files.js';

  let {
    path = '/',
    onNavigate = () => {}
  } = $props();

  let data = $state([]);
  let error = $state('');
  let loading = $state(true);
  let requestID = 0;

  async function loadDirectory(path) {
    const currentRequestID = ++requestID;

    data = [];
    error = '';
    loading = true;

    try {
      const fileInfo = await API_GetFileInfo(path);

      if (!isDirectory(fileInfo)) {
        throw new Error('The path is not a directory.');
      }

      const files = await API_GetFileList(path);

      if (currentRequestID != requestID) {
        return;
      }

      data = sortEntries(files);
      loading = false;
    } catch (err) {
      if (currentRequestID != requestID) {
        return;
      }

      console.error(err);
      error = err.message || 'failed to load directory';
      loading = false;
    }
  }

  $effect(() => {
    loadDirectory(path);
  });
</script>

{#if error}
  <p>{error}</p>
{:else if loading}
  <p>loading...</p>
{:else}
  {#each data as item}
    <div>
      {#if isDirectory(item)}
        <a
          href={directoryHref(item.path)}
          onclick={(event) => onNavigate(event, item.path)}
        >
          {displayEntryName(item)}
        </a>
      {:else}
        <a href={item.path}>{displayEntryName(item)}</a>
      {/if}
    </div>
  {/each}
{/if}
