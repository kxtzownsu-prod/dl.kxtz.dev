<script>
  import Icon from '../icon/Icon.svelte';

  let {
    class: className = '',
    depth = 0,
    isFirstEntry = false,
    isOpen = false,
    hasSubdirs = false,
    folderName = '',
    folderPath = '/',
    selected = false,
    onNavigate = () => {},
    onToggle = () => {},
    ...rest
  } = $props();

  let paddingLeft = $derived(`${0.5 + Number(depth) * 1.5}rem`);
</script>

{#if folderName}
  <li class={`m-0 w-full text-xs font-button-2 ${className}`} {...rest}>
    <a
      href={folderPath}
      onclick={(e) => {
        e.preventDefault();
        onNavigate(e);
      }}
      ondblclick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (hasSubdirs) {
          onToggle();
        }
      }}
      class="flex h-full min-w-0 flex-1 cursor-pointer items-center gap-1.5 text-left"
    >
      <div
        style:padding-left={paddingLeft}
        class={`py-5 flex h-8 w-full items-center gap-1.5 rounded-full pr-3 transition-colors ${
          selected ? 'bg-primary text-on_primary' : 'hover:bg-hover_on_subtle'
        }`}
      >
        {#if hasSubdirs}
          <button
            type="button"
            aria-label={`${isOpen ? 'collapse' : 'expand'} ${folderName}`}
            onclick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onToggle();
            }}
            class="inline-flex size-3 shrink-0 cursor-pointer items-center justify-center"
          >
            {#if isOpen}
              <Icon name="chevron-down" />
            {:else}
              <Icon name="chevron-right" />
            {/if}
          </button>
        {:else}
          <span class="size-3 shrink-0"></span>
        {/if}

        <span class="inline-flex w-4 mr-1 shrink-0 items-center justify-center">
          {#if isFirstEntry}
            <Icon name="laptop" />
          {:else}
            <Icon name="folder" />
          {/if}
        </span>

        <span class="min-w-0 overflow-hidden whitespace-nowrap">
          {folderName}
        </span>
      </div>
    </a>
  </li>
{/if}