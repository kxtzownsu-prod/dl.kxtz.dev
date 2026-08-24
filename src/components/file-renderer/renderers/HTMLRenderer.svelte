<script>
  const RENDERER_NAME = "HTMLRenderer";

  let { fileObject = "" } = $props();
</script>

{#if fileObject}
  <p>TODO: implement {RENDERER_NAME}</p>
{:else}
  {console.error("no fileObject passed to " + RENDERER_NAME)}
{/if}