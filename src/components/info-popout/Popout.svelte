<script>
  import Icon from "../icon/Icon.svelte";

  import PopoutOptionRow from "./Popout/PopoutOptionRow.svelte";
  import PopoutDropdown from "./Popout/PopoutDropdown.svelte";

  import {
    API_CACHE_KEY,
    API_KEY_KEY,
    CACHE_TIMEOUT_AMOUNT_KEY,
    CACHE_TIMEOUT_UNIT_KEY
  } from '../api/backend.js';
  import { localStorageState } from '../../scripts/storage.svelte.js';
    import Button from "./Button.svelte";

  let { onClose = () => {} } = $props();

  const apiKey = localStorageState(API_KEY_KEY, "");
  const cacheTimeoutTimeAmount = localStorageState(CACHE_TIMEOUT_AMOUNT_KEY, "5");
  const cacheTimeoutTimeUnit = localStorageState(CACHE_TIMEOUT_UNIT_KEY, "Minute(s)");
  const logLevel = localStorageState("logLevel", "Errors Only");

  function resetCache(){
    if (confirm("Are you sure you want to reset the cache? Press OK to confirm.")) {
      localStorage.removeItem(API_CACHE_KEY);
      window.location.reload();
    }
  }
</script>

<div class="absolute bottom-full left-1/2 -ml-6 mb-6 w-60 rounded-2xl border border-primary bg-app_base p-4 shadow-lg">
  <button
    class="cursor-pointer absolute top-4 right-4 flex items-center justify-center rounded-full p-2 hover:bg-hover_on_subtle"
    onclick={onClose}
    aria-label="Close"
  >
    <Icon name="x" />
  </button>
  
  <button
    class="hover:bg-hover_on_subtle cursor-pointer p-2 rounded-full flex items-center justify-center"
    onclick={window.open("https://github.com/kxtzownsu-prod/dl.kxtz.dev")}
  >
    <Icon name="github" />
  </button>
  
  <div class="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 gap-y-2 mt-2">
    <PopoutOptionRow label="API Key">
      <input bind:value={apiKey.value} class="w-full rounded-lg border border-secondary bg-app_base_shaded px-2 py-1" type="password" placeholder="ks_ddl.NTQ0NBz394..." />
    </PopoutOptionRow>

    <PopoutOptionRow label="Reset Cache?">
      <button class="w-full cursor-pointer py-1 px-2 rounded-xl border border-red-400 text-red-400" onclick={resetCache}>
        Reset
      </button>
    </PopoutOptionRow>

    <PopoutOptionRow label="Cache Timeout">
      <div class="flex items-center w-full">
        <input bind:value={cacheTimeoutTimeAmount.value} class="w-8" type="number" min="1" />
        <PopoutDropdown bind:value={cacheTimeoutTimeUnit.value} options={["Minute(s)", "Hour(s)", "Day(s)", "Week(s)"]} placeholder="Minute(s)" />
      </div>
    </PopoutOptionRow>

    <PopoutOptionRow label="Log Level">
      <PopoutDropdown bind:value={logLevel.value} options={["None", "Errors Only", "Verbose"]} placeholder="Log Level" />
    </PopoutOptionRow>
  </div>
</div>