<script>
  const RENDERER_NAME = "AudioRenderer";

  let { fileObject = "" } = $props();
</script>

{#if fileObject}
  <audio controls src={fileObject.path}>Your browser doesn't support audio playback.</audio>
{:else}
  {console.error("no fileObject passed to " + RENDERER_NAME)}
{/if}