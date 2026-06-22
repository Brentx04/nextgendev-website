<template>
  <div class="landing-root">
    <nav class="site-nav">
      <RouterLink to="/" class="nav-logo">
        <img src="/NGC.png" alt="Next Gen Codes" style="height:36px;width:auto;display:block;" />
      </RouterLink>
      <a href="/#contact" class="nav-cta">OFFERTE AANVRAGEN</a>
    </nav>

    <slot />

    <footer class="blog-footer">
      <p>© 2025 Next Gen Codes — Genk, België ·
        <RouterLink to="/">Terug naar de website</RouterLink> ·
        <a href="mailto:daenenbrent@gmail.com">daenenbrent@gmail.com</a>
      </p>
    </footer>
  </div>
</template>

<script setup>
import '../styles/landing.css'
</script>
