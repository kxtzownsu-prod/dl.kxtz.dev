<script>
  import { API_DownloadFile } from '../api/download.js';
  import { formatSize } from '../../scripts/size.js';

  import FileRenderer from '../file-renderer/FileRenderer.svelte';
  import PillButton from '../buttons/PillButton.svelte';

  let { fileObject = "" } = $props();
</script>

<!--
    This is a WIP and is subject to change!

    I have some ideas in mind for how this is going to look. 

    This is NOT the final version of this.
-->
<div>
  <div class="flex items-center gap-24">
    <h1><code>{fileObject.name}</code> ({formatSize(fileObject.size)})</h1>
    <div class="flex items-center gap-2">
      <PillButton
        id="download-btn"
        icon="download"
        text="Download"
        onclick={() => API_DownloadFile(fileObject.path, fileObject.size)}
      />
      
      <PillButton
        id="copyddl-btn"
        icon="clipboard"
        text="Copy Direct Download Link"
      />
    </div>
  </div>
  <hr class="m-2 border-sys_separator" />
  <FileRenderer fileObject={fileObject} />
</div>