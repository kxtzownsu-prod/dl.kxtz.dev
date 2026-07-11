<script>
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faFolder } from '@fortawesome/free-regular-svg-icons';
  import { faLaptop, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

  let {
    class: className = '',
    depth = 0,
    isFirstEntry = false,
    isOpen = false,
    hasSubdirs = false,
    folderName = '',
    folderPath = '/',
    folderType = '',
    selected = false,
    onNavigate = () => {},
    onToggle = () => {},
    ...rest
  } = $props();

  let paddingLeft = $derived(`${0.5 + Number(depth) * 1.5}rem`);
</script>

{#if folderName}
  <li class={`m-0 w-full ${className}`} {...rest}>
    <div
      style:padding-left={paddingLeft}
      class={`flex h-8 w-full items-center gap-1.5 rounded-full pr-3 transition-colors ${selected ? 'bg-primary text-on_primary' : 'hover:bg-hover_on_subtle'}`}
    >
      {#if hasSubdirs}
        <button
          type="button"
          aria-label={`${isOpen ? 'collapse' : 'expand'} ${folderName}`}
          onclick={onToggle}
          class="inline-flex size-3 shrink-0 cursor-pointer items-center justify-center text-[0.625rem]"
        >
          {#if isOpen}
            <FontAwesomeIcon icon={faChevronDown} />
          {:else}
            <FontAwesomeIcon icon={faChevronRight} />
          {/if}
        </button>
      {:else}
        <span class="size-3 shrink-0"></span>
      {/if}

      <a
        href={folderPath}
        onclick={(event) => {
          event.preventDefault();
          onNavigate();
        }}
        class="flex h-full min-w-0 flex-1 cursor-pointer items-center gap-1.5 text-left"
      >
        <span class="inline-flex w-4 shrink-0 items-center justify-center text-sm">
          {#if folderType == 'directory'}
            {#if isFirstEntry}
              <FontAwesomeIcon icon={faLaptop} />
            {:else}
              <FontAwesomeIcon icon={faFolder} />
            {/if}
          {/if}
        </span>

        <span class="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
          {folderName}
        </span>
      </a>
    </div>
  </li>
{/if}
