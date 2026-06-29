<script>
  import { onMount } from 'svelte';

  let text = '';

  function breadcrumbs(path) {
    const parts = path.split('/').filter(Boolean);
    return ['Home', ...parts].join(' / ');
  }

  onMount(() => {
    const update = () => {
      text = breadcrumbs(decodeURIComponent(window.location.pathname) || '/');
    };

    update();

    window.addEventListener('pathchange', update);
    window.addEventListener('popstate', update);

    return () => {
      window.removeEventListener('pathchange', update);
      window.removeEventListener('popstate', update);
    };
  });
</script>

<p>{text}</p>
