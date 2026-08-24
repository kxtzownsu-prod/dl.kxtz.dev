<script>
  const RENDERER_NAME = "ImageRenderer";

  let { fileObject = "" } = $props();
</script>

{#if fileObject}
  <img alt={fileObject.name} src={fileObject.path} />
{:else}
  {console.error("no fileObject passed to " + RENDERER_NAME)}
{/if}