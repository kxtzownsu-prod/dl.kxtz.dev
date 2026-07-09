<script>
  let { children, class: className = '', ...rest } = $props();
</script>

<ul class={className} {...rest}>
  {@render children?.()}
</ul>