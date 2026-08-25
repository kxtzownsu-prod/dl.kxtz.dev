<script>
  import { API_GetURL, API_PathParams } from '../../api/backend.js';
  import { API_RAW_FILE_PATH } from '../../api/download.js';

  const RENDERER_NAME = "ImageRenderer";

  let { fileObject = "" } = $props();

  let finalPath = $state("");

  $effect(() => {
    if (!fileObject?.path) return;

    let stale = false;
    API_GetURL(API_RAW_FILE_PATH, API_PathParams(fileObject.path)).then((url) => {
      if (!stale) finalPath = url;
    });

    return () => { stale = true; };
  });
</script>

{#if fileObject}
  <audio controls src={finalPath}>Your browser doesn't support audio playback.</audio>
{:else}
  {console.error("no fileObject passed to " + RENDERER_NAME)}
{/if}