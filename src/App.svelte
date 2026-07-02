<script>
  import './app.css';

  import FileExplorer from './components/file-explorer/FileExplorer.svelte'
</script>

<main class="bg-background text-primary font-normal min-w-screen min-h-screen max-w-screen max-h-screen p-8">
  <div class="py-2">
    <h1 class="text-sm text-secondary">dl.kxtz.dev_{__BUILD_TIME__}-{__GIT_HASH_SHORT__}</h1>
  </div>
  
  <div class="font-terminal py-2">
    <!--
      This will eventually become breadcrumbs, so just wait
      until then I guess.
    -->
    <div class="flex py-2 text-md">
      <p class="file-list-entry">/</p>
      <p class="file-list-entry">Foobar</p>
      <p class="file-list-separator">/</p>
      <p class="file-list-entry">Barfoo</p>
    </div>
    <FileExplorer />
  </div>
</main>