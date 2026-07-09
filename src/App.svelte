<script>
  import './app.css';

  import Sidebar from './components/sidebar/Sidebar.svelte';
  import FileExplorer from './components/file-explorer/FileExplorer.svelte';
</script>

<main class="bg-app_base_shaded text-primary font-button-2 h-screen w-screen overflow-hidden flex">
  <!-- sidebar -->
  <aside class="w-64 shrink-0 h-full overflow-y-auto py-8 pl-4 pr-2">
    <Sidebar />
  </aside>

  <!-- files area -->
  <section class="bg-app_base mt-6 mr-4 rounded-4xl h-[calc(100vh-1rem)] flex-1 min-w-0 overflow-y-auto p-8 pl-4">
    <FileExplorer />
  </section>
</main>
