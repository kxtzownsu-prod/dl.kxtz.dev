<script>
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faFolder } from '@fortawesome/free-regular-svg-icons';
  import { faLaptop, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

  let {
    children,
    class: className = '',
    isFirstEntry = 'false',
    isOpen = 'false',
    hasSubdirs = false,
    folderName = '',
    folderType = '',
    ...rest
  } = $props();
</script>

<ul class={`m-0 list-none p-0 ${className}`} {...rest}>
  {#if folderName}
    <li class="m-0">
      <div class="grid min-h-7 grid-cols-[0.75rem_1rem_minmax(0,1fr)] items-center gap-1.5 rounded">
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
      </div>

      {#if hasSubdirs == 'true'}
        <div class="pl-6.5">
          {@render children?.()}
        </div>
      {/if}
    </li>
  {/if}
</ul>
