<script>
  import './app.css';

  import Sidebar from './components/sidebar/Sidebar.svelte';
  import FileExplorer from './components/file-explorer/FileExplorer.svelte';
</script>

<main class="bg-app_base_shaded text-primary font-button-2 h-screen w-screen overflow-hidden flex">
  <!-- sidebar -->
  <aside class="w-54 shrink-0 h-full overflow-y-auto p-8 pr-2">
    <Sidebar />
  </aside>

  <!-- files area -->
  <section class="flex-1 min-w-0 h-full overflow-y-auto p-8 pl-4">
    <FileExplorer />
  </section>
</main>