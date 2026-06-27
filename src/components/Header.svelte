<script>
  const leftAvatar = {
    "name": "kxtzownsu",
    "link": "https://github.com/kxtzownsu",
    "src": "https://github.com/kxtzownsu.png"
  }
  const name = "kxtz' download server";
  const id = `${__BUILD_TIME__}-${__GIT_HASH_SHORT__}`;
</script>

<!--
  Don't delete this! It's needed so that the header
  isn't stuck to the top of the page.  
-->
<div style="padding-top: 1.5rem; padding-bottom: 1.5rem;">
  <header class="header">
    <a href={leftAvatar.link}><img src={leftAvatar.src} alt={leftAvatar.name} class="avatar" /></a>

    <div class="title">
      <div class="name">{name}</div>
      <div class="id">{id}</div>
    </div>

    <!--
      This is just to test the layout, eventually
      I'll add another person or organization here
      instead of just another link to my stuff.
    -->
    <a href={leftAvatar.link}><img src={leftAvatar.src} alt={leftAvatar.name} class="avatar" /></a>
  </header>
</div>
<style>
  .header {
    align-items: center;
    background: var(--surface-0);
    border-radius: 9999px;
    color: var(--mauve);
    display: flex;
    gap: 1rem;
    height: 5.5rem;
    justify-content: center;
    margin: 1.5rem auto 0;
    max-width: 95%;
    outline: 6px solid var(--mauve);
    width: 100%;
  }

  .avatar {
    border-radius: 9999px;
    box-shadow: 0 0 22px rgba(201, 156, 255, 0.9);
    height: 5rem;
    width: 5rem;
  }

  .title {
    line-height: 1;
    text-align: center;
  }

  .name {
    filter: drop-shadow(0 0 8px rgba(216, 169, 255, 0.8));
    font-size: 1.7rem;
    font-weight: 700;
    letter-spacing: 0.025em;
  }

  .id {
    font-size: 1.2rem;
    margin-top: 0.25rem;
  }
</style>
