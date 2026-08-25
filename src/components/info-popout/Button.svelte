<script>
  import Icon from "../icon/Icon.svelte";

  let { onClick = "", ...rest} = $props();
</script>

<button
  class="hover:bg-hover_on_subtle cursor-pointer rounded-full p-2 absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
  onclick={onClick}
  {...rest}
>
  <Icon name="info" />
</button>
