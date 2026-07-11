<script>
  let { children, class: className = '', ...rest } = $props();
</script>

<ul class={`m-0 flex list-none flex-col gap-2 p-0 ${className}`} {...rest}>
  {@render children?.()}
</ul>
