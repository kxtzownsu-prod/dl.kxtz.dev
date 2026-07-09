<script>
  let { children, class: className = '', ...rest } = $props();
</script>

<ul class={`m-0 list-none p-0 ${className}`} {...rest}>
  {@render children?.()}
</ul>
