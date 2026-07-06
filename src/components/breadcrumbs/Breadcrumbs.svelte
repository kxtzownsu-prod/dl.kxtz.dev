<script>
  import { onMount } from 'svelte';

  let crumbs = [];

  function breadcrumbs(path) {
    const parts = path.split('/').filter(Boolean);
    return [
      {name: "/", href: "/"},
      ...parts.map((part, index) => ({
        name: part,
        /* href: `/${parts.slice(0, index + 1).join('/')}`, */
        index: index + 1
      }))
    ]
  }

  onMount(() => {
    crumbs = breadcrumbs(decodeURIComponent(window.location.pathname) || '/');
  })
</script>

<div class="flex py-2 text-md">
  {#each crumbs as crumb, index}
    {#if index > 1}
      <p>/</p>
    {/if}
    {#if index === 0}
      <p>{crumb.name}</p>
    {:else}
      <p class="text-secondary text-md">
        {crumb.name}
      </p>
    {/if}
  {/each}
</div>
