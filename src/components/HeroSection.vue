<template>
  <section id="home" class="hero">
    <div class="hero-scan-line"></div>
    <div class="hero-grid-overlay"></div>

    <div class="hero-content">
      <div class="hero-badge" ref="badgeRef">
        <span class="badge-dot"></span>{{ T.hero.badge }}
      </div>
      <h1 class="hero-title">
        <span class="line-wrap"><span class="hero-line" ref="line0">{{ T.hero.line0 }}</span></span>
        <span class="line-wrap"><span class="hero-line gradient-text" ref="line1">{{ T.hero.line1 }}</span></span>
        <span class="line-wrap"><span class="hero-line" ref="line2">{{ T.hero.line2 }}</span></span>
      </h1>
      <p class="hero-sub" ref="subRef">
        {{ T.hero.sub1 }}<br />
        {{ T.hero.sub2 }}<span class="caret">|</span>
      </p>
      <div class="hero-actions" ref="actionsRef">
        <a href="#services" class="btn-primary" @click.prevent="scrollTo('services')">
          <span class="btn-bg"></span>
          <span class="btn-text">{{ T.hero.ctaPrimary }}</span>
        </a>
        <a href="#portfolio" class="btn-ghost" @click.prevent="scrollTo('portfolio')">{{ T.hero.ctaSecondary }} <span>→</span></a>
      </div>
    </div>

    <div class="hero-logo-display">
      <img :src="baseUrl + 'NGC.png'" alt="Next Gen Codes" class="hero-logo-img" />
    </div>

    <div class="hero-stat-bar" ref="statBarRef">
      <template v-for="(s, i) in stats" :key="i">
        <div class="stat-divider" v-if="i > 0"></div>
        <div class="stat">
          <span class="stat-num">{{ s.current }}</span><span>{{ s.suffix }}</span>
          <p>{{ s.label }}</p>
        </div>
      </template>
    </div>

    <div class="scroll-indicator">
      <span>{{ T.hero.scroll }}</span>
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'

const baseUrl = import.meta.env.BASE_URL
const { locale } = useLocale()
const T = computed(() => translations[locale.value])

const badgeRef  = ref(null)
const subRef    = ref(null)
const actionsRef = ref(null)
const statBarRef = ref(null)
const line0 = ref(null)
const line1 = ref(null)
const line2 = ref(null)

const statTargets = [5, 100, 3, 24]
const statCurrents = reactive([0, 0, 0, 0])

const stats = computed(() =>
  T.value.hero.statsLabels.map((label, i) => ({
    target: statTargets[i],
    current: statCurrents[i],
    suffix: T.value.hero.statsSuffixes[i],
    label,
  }))
)

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function animateCounter(index) {
  const duration = 1800
  const start = performance.now()
  function update(now) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    statCurrents[index] = Math.floor(eased * statTargets[index])
    if (progress < 1) requestAnimationFrame(update)
    else statCurrents[index] = statTargets[index]
  }
  requestAnimationFrame(update)
}

onMounted(() => {
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

  if (statBarRef.value) {
    let fired = false
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !fired) {
        fired = true
        statTargets.forEach((_, i) => animateCounter(i))
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
