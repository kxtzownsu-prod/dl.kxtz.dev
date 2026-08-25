<script>
  import Icon from "../../icon/Icon.svelte";
  import { clickOutside } from "../../../scripts/interactions.js";

  let { options = [], value = $bindable(""), placeholder = "Select..." } = $props();

  let open = $state(false);

  function toggle() {
    open = !open;
  }

  function select(opt) {
    value = opt;
    open = false;
  }
</script>

<div class="relative min-w-0" use:clickOutside={() => open = false}>
  <button
    type="button"
    class="w-full flex cursor-pointer items-center justify-between rounded-lg border border-secondary bg-app_base_shaded px-2 py-1"
    onclick={toggle}
  >
    <span class="truncate">{value || placeholder}</span>
    <span class="flex items-center shrink-0 scale-150 origin-center pointer-events-none">
      {#if open}
        <Icon name="chevron-up" />
      {:else}
        <Icon name="chevron-down" />
      {/if}
    </span>
  </button>

  {#if open}
    <div class="absolute bottom-full mb-1 w-full rounded-lg border border-secondary bg-app_base_shaded shadow-lg overflow-hidden">
      {#each options as opt}
        <button
          type="button"
          class="w-full text-left px-2 py-1 hover:bg-primary/20 {opt == value ? 'bg-primary/30' : ''}"
          onclick={() => select(opt)}
        >
          {opt}
        </button>
      {/each}
    </div>
  {/if}
</div>