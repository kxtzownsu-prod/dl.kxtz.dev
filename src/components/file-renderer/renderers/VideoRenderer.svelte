<script>
  const RENDERER_NAME = "VideoRenderer";

  let { fileObject = "" } = $props();
</script>

{#if fileObject}
  <!-- svelte-ignore a11y_media_has_caption -->
  <video controls src={fileObject.path}>Your browser doesn't support video playback.</video>
{:else}
  {console.error("no fileObject passed to " + RENDERER_NAME)}
{/if}