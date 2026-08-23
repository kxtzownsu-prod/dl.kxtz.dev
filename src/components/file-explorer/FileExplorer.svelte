<script>
  import { displayEntryName, isDirectory, isFile, sortEntries } from '../../scripts/entries.js';
  import { directoryHref } from '../../scripts/path.js';
  import { API_GetFileInfo, API_GetFileList } from '../api/files.js';
  import FileRenderer from '../file-renderer/FileRenderer.svelte';

  let {
    path = '/',
    onNavigate = () => {}
  } = $props();

  let data = $state([]);
  let error = $state('');
  let loading = $state(true);
  let requestID = 0;
  let isPathFile = $state(false); // always assume the path is a dir

  async function loadDirectory(path) {
    const currentRequestID = ++requestID;

    data = [];
    error = '';
    loading = true;
    isPathFile = false; // this is in case we're opening a directory *after* a file was 
                        // already opened, in which case the isPathFile var would still
                        // be 'true', causing it to not properly load the dir.

    try {
      const fileInfo = await API_GetFileInfo(path);

      if (!isDirectory(fileInfo)) {
        if (!isFile(fileInfo)){
          throw new Error('This path is not a file or directory, or it does not exist.');
        }

        isPathFile = true;
        data = fileInfo;
        loading = false;
        return;
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
{:else if isPathFile}
  <FileRenderer fileObject={data} />
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
