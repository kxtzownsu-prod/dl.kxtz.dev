<script>
  import { getIcon } from './icons.js';

  let { name = "" } = $props();

  let icon = $derived(getIcon(name));
</script>

{#if icon}
  <span
    class="inline-block size-5 shrink-0 bg-current [mask-position:center] [mask-repeat:no-repeat]"
    style={`mask-image:url(${icon.svg}); -webkit-mask-image:url(${icon.svg}); transform:rotate(${icon.rotation}deg);`}
  ></span>
{/if}