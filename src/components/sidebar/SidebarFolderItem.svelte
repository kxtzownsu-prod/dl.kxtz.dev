<script>
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faFolder } from '@fortawesome/free-regular-svg-icons';
  import { faLaptop, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

  let {
    children,
    class: className = '',
    depth = 0,
    isFirstEntry = 'false',
    isOpen = 'false',
    hasSubdirs = false,
    folderName = '',
    folderType = '',
    selected = false,
    onSelect = () => {},
    ...rest
  } = $props();

  function depthClass(depth) {
    return [
      'pl-2',
      'pl-8',
      'pl-14',
      'pl-20',
      'pl-26',
    ][Number(depth)] ?? 'pl-26';
  }
</script>

{#if folderName}
  <li class={`m-0 w-full ${className}`} {...rest}>
    <button
      type="button"
      onclick={onSelect}
      class={`grid h-8 w-full grid-cols-[0.75rem_1rem_minmax(0,1fr)] items-center gap-1.5 rounded-full pr-3 text-left transition-colors ${depthClass(depth)} ${selected ? 'bg-primary text-on_primary' : 'hover:bg-hover_on_subtle'}`}
    >
      <span class="inline-flex min-w-0 items-center justify-center text-[0.625rem]">
        {#if hasSubdirs == 'true'}
          {#if isOpen == 'true'}
            <FontAwesomeIcon icon={faChevronDown} />
          {:else}
            <FontAwesomeIcon icon={faChevronRight} />
          {/if}
        {/if}
      </span>

      <span class="inline-flex min-w-0 items-center justify-center text-sm">
        {#if folderType == 'directory'}
          {#if isFirstEntry == 'true'}
            <FontAwesomeIcon icon={faLaptop} />
          {:else}
            <FontAwesomeIcon icon={faFolder} />
          {/if}
        {/if}
      </span>

      <span class="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
        {folderName}
      </span>
    </button>

    {#if hasSubdirs == 'true'}
      <div class="mt-2">
        {@render children?.()}
      </div>
    {/if}
  </li>
{/if}
