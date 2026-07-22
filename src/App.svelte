<script>
  import { onMount } from 'svelte';

  import './app.css';

  import { directoryHref, normalizePath } from './path.js';
  import Sidebar from './components/sidebar/Sidebar.svelte';
  import FileExplorer from './components/file-explorer/FileExplorer.svelte';

  let currentPath = $state(normalizePath(window.location.pathname));

  function navigate(event, path) {
    event.preventDefault();

    const normalized = normalizePath(path);

    if (normalized == currentPath) {
      return;
    }

    window.history.pushState({}, '', directoryHref(normalized));
    currentPath = normalized;
  }

  onMount(() => {
    const handlePopState = () => {
      currentPath = normalizePath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  });
</script>

<main class="bg-app_base_shaded text-primary font-button-2 h-screen w-screen overflow-hidden flex">
  <!-- sidebar -->
  <aside class="w-64 shrink-0 h-full overflow-y-auto py-8 pl-4 pr-2">
    <Sidebar currentPath={currentPath} onNavigate={navigate} />
  </aside>

  <!-- files area -->
  <section class="bg-app_base mt-6 mr-4 rounded-4xl h-[105vh] flex-1 min-w-0 overflow-y-auto p-8 pl-4">
    <FileExplorer path={currentPath} onNavigate={navigate} />
  </section>
</main>
