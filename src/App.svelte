<script>
  import FileExplorer from './components/file-explorer/FileExplorer.svelte'
</script>

<main class="bg-background text-text font-normal min-w-screen min-h-screen max-w-screen max-h-screen">
  <h1 class="text-xs">dl.kxtz.dev_{__BUILD_TIME__}-{__GIT_HASH_SHORT__}</h1>
  <div class="font-terminal">
    <!--
      This will eventually become breadcrumbs, so just wait
      until then I guess.
    -->
    <div style="display: flex; font-size:1rem;">
      <p class="file-list-entry">/</p>
      <p class="file-list-entry">Foobar</p>
      <p class="file-list-separator">/</p>
      <p class="file-list-entry">Barfoo</p>
    </div>
    <FileExplorer />
  </div>
</main>