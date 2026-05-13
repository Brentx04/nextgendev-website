<template>
  <section id="home" class="hero">
    <div class="hero-scan-line"></div>
    <div class="hero-grid-overlay"></div>

    <div class="hero-content">
      <div class="hero-badge" ref="badgeRef">
        <span class="badge-dot"></span>SYSTEEM ACTIEF — OPGERICHT 2025
      </div>
      <h1 class="hero-title">
        <span class="line-wrap"><span class="hero-line" ref="line0">UW VISIE</span></span>
        <span class="line-wrap"><span class="hero-line gradient-text" ref="line1">VERTAALD</span></span>
        <span class="line-wrap"><span class="hero-line" ref="line2">NAAR CODE</span></span>
      </h1>
      <p class="hero-sub" ref="subRef">
        High-performance webapplicaties, moderne interfaces &amp;<br />
        digitale oplossingen die uw bedrijf naar het volgende niveau tillen.<span class="caret">|</span>
      </p>
      <div class="hero-actions" ref="actionsRef">
        <a href="#services" class="btn-primary" @click.prevent="scrollTo('services')">
          <span class="btn-bg"></span>
          <span class="btn-text">ONTDEK ONZE DIENSTEN</span>
        </a>
        <a href="#portfolio" class="btn-ghost" @click.prevent="scrollTo('portfolio')">BEKIJK PROJECTEN <span>→</span></a>
      </div>
    </div>

    <div class="hero-logo-display">
      <img :src="baseUrl + 'ngd-logo.png'" alt="Next Gen Codes" class="hero-logo-img" />
    </div>

    <div class="hero-stat-bar" ref="statBarRef">
      <template v-for="(s, i) in stats" :key="s.label">
        <div class="stat-divider" v-if="i > 0"></div>
        <div class="stat">
          <span class="stat-num">{{ s.current }}</span><span>{{ s.suffix }}</span>
          <p>{{ s.label }}</p>
        </div>
      </template>
    </div>

    <div class="scroll-indicator">
      <span>SCROLL</span>
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const baseUrl = import.meta.env.BASE_URL

const badgeRef  = ref(null)
const subRef    = ref(null)
const actionsRef = ref(null)
const statBarRef = ref(null)
const line0 = ref(null)
const line1 = ref(null)
const line2 = ref(null)

const stats = reactive([
  { target: 5,   current: 0, suffix: '+', label: 'Opgeleverde projecten' },
  { target: 100, current: 0, suffix: '%', label: 'Klanttevredenheid' },
  { target: 3,   current: 0, suffix: '+', label: 'Jaar ervaring' },
  { target: 24,  current: 0, suffix: 'u', label: 'Reactietijd support' },
])

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function animateCounter(stat) {
  const duration = 1800
  const start = performance.now()
  function update(now) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    stat.current = Math.floor(eased * stat.target)
    if (progress < 1) requestAnimationFrame(update)
    else stat.current = stat.target
  }
  requestAnimationFrame(update)
}

onMounted(() => {
  // Hero title lines stagger
  ;[line0, line1, line2].forEach((r, i) => {
    if (!r.value) return
    r.value.style.opacity = '0'
    r.value.style.transform = 'translateY(60%)'
    r.value.style.transition = `opacity 0.8s ease ${0.1 + i * 0.15}s, transform 0.8s ease ${0.1 + i * 0.15}s`
    requestAnimationFrame(() => requestAnimationFrame(() => {
      r.value.style.opacity = '1'
      r.value.style.transform = 'translateY(0)'
    }))
  })

  // Subtitle + actions stagger
  ;[badgeRef, subRef, actionsRef].forEach((r, i) => {
    if (!r.value) return
    r.value.style.opacity = '0'
    r.value.style.transform = 'translateY(20px)'
    r.value.style.transition = `opacity 0.8s ease ${0.55 + i * 0.15}s, transform 0.8s ease ${0.55 + i * 0.15}s`
    requestAnimationFrame(() => requestAnimationFrame(() => {
      r.value.style.opacity = '1'
      r.value.style.transform = 'translateY(0)'
    }))
  })

  // Animated counters on scroll-into-view
  if (statBarRef.value) {
    let fired = false
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !fired) {
        fired = true
        stats.forEach(s => animateCounter(s))
      }
    }, { threshold: 0.5 })
    obs.observe(statBarRef.value)
  }
})
</script>

<style scoped>
.caret {
  color: var(--purple-light);
  animation: blink 1s step-end infinite;
  margin-left: 2px;
  font-weight: 300;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
</style>
