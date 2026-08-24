<script>
  import Icon from '../icon/Icon.svelte';

  let { icon = "", text = "", children, ...rest } = $props();
</script>

<button
  class="cursor-pointer p-2 bg-primary text-on_primary rounded-full inline-flex items-center gap-1"
  {...rest}
>
  <Icon name={icon} />
  {#if children}
    {@render children()}
  {:else}
    {text}
  {/if}
</button>