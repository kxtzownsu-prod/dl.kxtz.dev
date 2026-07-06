<script>
  import './app.css';
  
  import Breadcrumbs from './components/breadcrumbs/Breadcrumbs.svelte';
  import FileExplorer from './components/file-explorer/FileExplorer.svelte'
</script>

<main class="bg-background text-primary font-normal min-w-screen min-h-screen max-w-screen p-8">
  <div class="py-2">
    <h1 class="text-sm text-secondary">dl.kxtz.dev_{__BUILD_TIME__}-{__GIT_HASH_SHORT__}</h1>
  </div>
  
  <div class="font-terminal py-2">
    <Breadcrumbs />
    <FileExplorer />
  </div>
</main>
