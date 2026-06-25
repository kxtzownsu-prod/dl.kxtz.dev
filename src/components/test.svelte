<script>
  import { onMount } from 'svelte'

  let data = $state([])
  let error = $state(null)

  onMount(async () => {
    try {
      const response = await fetch("https://api.sampleapis.com/coffee/iced");
      if (!response.ok) throw new Error(`error status: ${response.status}`);
      data = await response.json();
    } catch (err) {
      error = err.message;
    }
  })
</script>

{#if error}
  <p>{error}</p>
{:else if data.length === 0}
  <p>loading...</p>
{:else}
  {#each data as item}
    <div>{item.title}</div>
  {/each}
{/if}