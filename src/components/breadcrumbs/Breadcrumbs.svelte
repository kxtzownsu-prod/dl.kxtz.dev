<script>
  import { pathSegments } from "../../scripts/path.js";
  import Icon from "../icon/Icon.svelte";

  let crumbs = $derived(['My files', ...pathSegments(window.location.pathname)]);
</script>

<div class="flex items-center py-2 text-md">
  {#each crumbs as crumb, index}
    {#if index > 0}
      <Icon name="caret-right" class="mx-1 text-secondary" />
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