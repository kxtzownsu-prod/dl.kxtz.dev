<script>
  import PopoutOptionLabel from "./PopoutOptionLabel.svelte";

  let { label, children } = $props();
</script>

<PopoutOptionLabel>{label}</PopoutOptionLabel>
<div class="flex items-center gap-2 w-full min-w-0 *:last:flex-1">
  {@render children()}
</div>