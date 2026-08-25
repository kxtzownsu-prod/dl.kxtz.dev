<script>
  import Popout from "./Popout.svelte";
  import Button from "./Button.svelte";

  import { localStorageState } from "../../scripts/storage.svelte.js";

  const popoutOpen = localStorageState("popoutOpen", false, {
    serialize: String,
    deserialize: (v) => v === "true"
  });

  function togglePopout() {
    popoutOpen.value = !popoutOpen.value;
  }

  function closePopout() {
    popoutOpen.value = false;
  }
</script>

<div>
  {#if popoutOpen.value}
    <Popout onClose={closePopout} />
  {/if}
  
  <Button onClick={togglePopout} />
</div>