<script>
  import { directoryHref, pathSegments } from "../../scripts/path.js";
  import Icon from "../icon/Icon.svelte";

  let {
    path = '/',
    onNavigate = () => {}
  } = $props();

  let segments = $derived(pathSegments(path));
  let crumbs = $derived([
    { name: 'My files', path: '/' },
    ...segments.map((segment, index) => ({
      name: segment,
      path: `/${segments.slice(0, index + 1).join('/')}`
    }))
  ]);
</script>

<div class="flex items-center py-2 font-title_1_font">
  {#each crumbs as crumb, index (crumb.path)}
    {#if index > 0}
      <Icon name="caret-right" class="mx-1 text-sys_on_surface_variant" />
    {/if}
    {#if index === crumbs.length - 1}
      <p class="text-sys_on_surface">{crumb.name}</p>
    {:else}
      <a
        href={directoryHref(crumb.path)}
        class="text-sys_on_surface_variant hover:text-sys_on_surface"
        onclick={(event) => {
          event.preventDefault();
          onNavigate(event, crumb.path);
        }}
      >
        {crumb.name}
      </a>
    {/if}
  {/each}
</div>
