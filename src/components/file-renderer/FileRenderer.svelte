<script>
  import { renderFile } from './FileRenderer.js';

  let { fileObject = "" } = $props();

  let htmlContent = $derived(renderFile(fileObject));
</script>

{#if fileObject}
  {#if htmlContent}
    <div>{@html htmlContent}</div>
  {:else}
    <p>renderFile didn't return anything!</p>
  {/if}
{:else}
  <p>Error! No file passed!</p>
{/if}