<script>
  import './FileExplorer.css';

  import { onMount } from 'svelte';
  import { API_GetFileInfo, API_GetFileList } from '../api/download.js';

  let path = decodeURIComponent(window.location.pathname) || '/';
  let info = null;
  let files = [];
  let error = null;

  function entries(value) {
    return Array.isArray(value) ? value : value?.files ?? [];
  }

  function name(file) {
    return file.name ?? file.path?.split('/').pop() ?? file.path;
  }

  function sorted(files) {
    return files.toSorted((a, b) => {
      if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
      return name(a).localeCompare(name(b));
    });
  }

  function size(bytes) {
    return `${(bytes / 1024).toFixed(1)} KiB`;
  }

  async function loadPath(nextPath = decodeURIComponent(window.location.pathname) || '/') {
    path = nextPath;
    info = null;
    files = [];
    error = null;

    try {
      info = await API_GetFileInfo(path);
      if (info.type === 'directory') files = sorted(entries(await API_GetFileList(path)));
    } catch (caught) {
      error = caught.message;
    }
  }

  function open(event, nextPath) {
    event.preventDefault();
    history.pushState(null, '', nextPath);
    window.dispatchEvent(new Event('pathchange'));
    loadPath(nextPath);
  }

  onMount(() => {
    const reload = () => loadPath();
    const reloadIfCached = (event) => {
      if (event.persisted) loadPath();
    };

    loadPath();

    window.addEventListener('popstate', reload);
    window.addEventListener('pageshow', reloadIfCached);

    return () => {
      window.removeEventListener('popstate', reload);
      window.removeEventListener('pageshow', reloadIfCached);
    };
  });
</script>

{#if error}
  <p>{error}</p>
{:else if !info}
  <p>loading...</p>
{:else if info.type === 'directory'}
  <ul>
    {#each files as file}
      <li><a href={file.path} onclick={(event) => open(event, file.path)}>{name(file)}</a></li>
    {/each}
  </ul>
{:else if info.type === 'symlink' || info.type === 'file'}
  <p><strong>{info.name}</strong>: {size(info.size)} @ {info.modified}</p>
{:else}
  <p>returned file wasn't valid type (must be directory, symlink, or file)</p>
{/if}
