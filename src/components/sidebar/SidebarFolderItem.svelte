<script>
  let {
    children,
    class: className = '',
    isFirstEntry = '',
    hasSubdirs = false,
    folderName = '',
    folderType = '',
    ...rest
  } = $props();
</script>

<ul class={className} {...rest}>
  {#if folderName}
    <li>
      {#if folderType == 'directory'}
        <p>dir</p>
      {/if}

      {folderName}

      {#if hasSubdirs}
        {@render children?.()}
      {/if}
    </li>
  {/if}

</ul>