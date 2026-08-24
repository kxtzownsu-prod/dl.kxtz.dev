<script>
  import ImageRenderer from './renderers/ImageRenderer.svelte';
  import AudioRenderer from './renderers/AudioRenderer.svelte';
  import VideoRenderer from './renderers/VideoRenderer.svelte';
  import MarkdownRenderer from './renderers/MarkdownRenderer.svelte';
  import HTMLRenderer from './renderers/HTMLRenderer.svelte';

  import { detectFileType } from './FileRenderer.js';

  let { fileObject = "" } = $props();
  let fileType = $derived(detectFileType(fileObject.name, fileObject.mime));

  const renderers = {
    image: ImageRenderer,
    audio: AudioRenderer,
    video: VideoRenderer,
    markdown: MarkdownRenderer,
    html: HTMLRenderer
  };

  const RendererComponent = $derived(renderers[fileType] ?? null);
</script>

{#if fileObject}
  {#if RendererComponent}
    <RendererComponent fileObject={fileObject} />
  {:else}
    <p>No renderer found for this file.</p>
  {/if}
{/if}
