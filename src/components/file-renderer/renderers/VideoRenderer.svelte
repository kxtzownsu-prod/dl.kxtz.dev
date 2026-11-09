<script>
  import { API_GetRawFileBlob } from '../../api/download.js';

  const RENDERER_NAME = "ImageRenderer";

  let { fileObject = "" } = $props();

  let finalPath = $state("");

  $effect(() => {
    if (!fileObject?.path) return;

    let stale = false;
    let objectURL = '';

    finalPath = '';

    API_GetRawFileBlob(fileObject.path).then((blob) => {
      if (stale) return;

      objectURL = URL.createObjectURL(blob);
      finalPath = objectURL;
    }).catch((error) => {
      if (!stale) console.error(error);
    });

    return () => {
      stale = true;
      if (objectURL) URL.revokeObjectURL(objectURL);
    };
  });
</script>

{#if fileObject}
  <!-- svelte-ignore a11y_media_has_caption -->
  <video controls src={finalPath}>Your browser doesn't support video playback.</video>
{:else}
  {console.error("no fileObject passed to " + RENDERER_NAME)}
{/if}