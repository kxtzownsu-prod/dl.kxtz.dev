<script>
  import Icon from '../icon/Icon.svelte';

  let { icon = "", text = "", children, ...rest } = $props();
</script>

<button
  class="cursor-pointer p-2 bg-sys_primary text-sys_on_primary rounded-full inline-flex items-center gap-1 font-button_2_font"
  {...rest}
>
  <Icon name={icon} />
  {#if children}
    {@render children()}
  {:else}
    {text}
  {/if}
</button>