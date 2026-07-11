<script>
  import { pathSegments } from '../../path.js';

  let { path = '/' } = $props();

  let crumbs = $derived(['/', ...pathSegments(path)]);
</script>

<div class="flex py-2 text-md">
  {#each crumbs as crumb, index}
    {#if index > 1}
      <p>/</p>
    {/if}
    {#if index === 0}
      <p>{crumb}</p>
    {:else}
      <p class="text-secondary text-md">
        {crumb}
      </p>
    {/if}
  {/each}
</div>
