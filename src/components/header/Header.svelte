<script>
  import './header.css'

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
