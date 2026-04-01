<template>
  <section id="services" class="services">
    <div class="section-header">
      <p class="section-tag">// WAT WIJ DOEN</p>
      <h2 class="section-title">ONZE <span class="gradient-text">DIENSTEN</span></h2>
    </div>
    <div class="services-grid">
      <div
        v-for="service in services"
        :key="service.num"
        class="service-card"
        :class="{ featured: service.featured }"
        @mousemove="onCardMouseMove($event, service.num)"
      >
        <div class="service-card-glow" :ref="el => glowRefs[service.num] = el"></div>
        <div class="service-icon" v-html="service.icon"></div>
        <span class="card-num">{{ service.num }}</span>
        <h3>{{ service.title }}</h3>
        <p>{{ service.desc }}</p>
        <a href="#contact" class="card-link" @click.prevent="scrollTo('contact')">Meer info <span>→</span></a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'

useScrollReveal('#services .service-card')

const glowRefs = reactive({})

const services = [
  {
    num: '01', featured: false,
    title: 'Webontwikkeling',
    desc: 'Snelle, schaalbare webapplicaties gebouwd met Vue, Node.js, JavaScript, HTML & CSS — van eenvoudige sites tot complexe platformen.',
    icon: `<svg viewBox="0 0 48 48" fill="none"><rect x="4" y="8" width="40" height="32" rx="3" stroke="currentColor" stroke-width="2"/><path d="M14 20L20 26L14 32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M22 32H34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    num: '02', featured: true,
    title: 'UI/UX Design',
    desc: 'Interfaces die niet alleen mooi ogen, maar ook converteren. Pixel-perfect design voor maximale gebruikerservaring.',
    icon: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="10" stroke="currentColor" stroke-width="2"/><path d="M24 4V8M24 40V44M44 24H40M8 24H4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    num: '03', featured: false,
    title: 'Digitale Strategie',
    desc: 'Van merkpositionering tot go-to-market — wij bouwen de strategie die u als eerste aan de finish brengt.',
    icon: `<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="14" width="16" height="20" rx="2" stroke="currentColor" stroke-width="2"/><rect x="26" y="8" width="16" height="14" rx="2" stroke="currentColor" stroke-width="2"/><rect x="26" y="26" width="16" height="14" rx="2" stroke="currentColor" stroke-width="2"/></svg>`,
  },
  {
    num: '04', featured: false,
    title: 'Maatwerk Applicaties',
    desc: 'Op maat gemaakte software in C#, Python of Node.js die perfect aansluit op uw bedrijfsprocessen — inclusief MySQL & Oracle databasekoppelingen.',
    icon: `<svg viewBox="0 0 48 48" fill="none"><path d="M24 6L42 16V32L24 42L6 32V16L24 6Z" stroke="currentColor" stroke-width="2"/><path d="M24 6V42M6 16L42 32M42 16L6 32" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/></svg>`,
  },
  {
    num: '05', featured: false,
    title: 'SEO & Groei',
    desc: 'Datagestuurde SEO, performantie-optimalisatie en groeistrategieën die uw digitale aanwezigheid versterken.',
    icon: `<svg viewBox="0 0 48 48" fill="none"><path d="M24 10C16.268 10 10 16.268 10 24C10 31.732 16.268 38 24 38" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 24H38" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M30 15L38 12L35 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    num: '06', featured: false,
    title: 'Analytics & AI',
    desc: 'Intelligente dashboards, voorspellende analyses en AI-integraties die van uw data bruikbare inzichten maken.',
    icon: `<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="20" width="12" height="18" rx="1" stroke="currentColor" stroke-width="2"/><rect x="18" y="12" width="12" height="26" rx="1" stroke="currentColor" stroke-width="2"/><rect x="28" y="6" width="12" height="32" rx="1" stroke="currentColor" stroke-width="2"/></svg>`,
  },
]

function onCardMouseMove(e, num) {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const glow = glowRefs[num]
  if (glow) {
    glow.style.left = (x - 60) + 'px'
    glow.style.top  = (y - 60) + 'px'
  }
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>
