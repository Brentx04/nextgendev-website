<template>
  <section id="services" class="services">
    <div class="section-header">
      <p class="section-tag">{{ T.services.tag }}</p>
      <h2 class="section-title">{{ T.services.title }} <span class="gradient-text">{{ T.services.titleHighlight }}</span></h2>
    </div>
    <div class="services-grid">
      <div
        v-for="(service, index) in services"
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
        <a href="#" class="card-link" @click.prevent="openModal(index)">{{ T.services.moreInfo }} <span>→</span></a>
      </div>
    </div>
  </section>

  <Teleport to="body">
  <Transition name="fade">
    <div v-if="activeService" class="svc-backdrop" @click.self="closeModal">
      <div class="svc-modal">
        <div class="svc-modal-header">
          <div class="svc-modal-icon" v-html="activeService.icon"></div>
          <div>
            <p class="section-tag" style="margin:0">{{ activeService.num }}</p>
            <h3 class="svc-modal-title">{{ activeService.title }}</h3>
          </div>
          <button class="svc-close" @click="closeModal" aria-label="Sluiten">✕</button>
        </div>
        <div class="svc-modal-body">
          <p class="svc-modal-desc">{{ activeService.detail }}</p>
          <ul class="svc-list">
            <li v-for="item in activeService.points" :key="item">
              <span class="svc-bullet">◈</span> {{ item }}
            </li>
          </ul>
          <button class="svc-cta" @click="goToContact">
            {{ T.services.requestQuote }} <span>→</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
  </Teleport>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'

useScrollReveal('#services .service-card')

const { locale } = useLocale()
const T = computed(() => translations[locale.value])

const glowRefs = reactive({})
const activeServiceIndex = ref(null)

const serviceIcons = [
  `<svg viewBox="0 0 48 48" fill="none"><rect x="4" y="8" width="40" height="32" rx="3" stroke="currentColor" stroke-width="2"/><path d="M14 20L20 26L14 32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M22 32H34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="10" stroke="currentColor" stroke-width="2"/><path d="M24 4V8M24 40V44M44 24H40M8 24H4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="14" width="16" height="20" rx="2" stroke="currentColor" stroke-width="2"/><rect x="26" y="8" width="16" height="14" rx="2" stroke="currentColor" stroke-width="2"/><rect x="26" y="26" width="16" height="14" rx="2" stroke="currentColor" stroke-width="2"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none"><path d="M24 6L42 16V32L24 42L6 32V16L24 6Z" stroke="currentColor" stroke-width="2"/><path d="M24 6V42M6 16L42 32M42 16L6 32" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none"><path d="M24 10C16.268 10 10 16.268 10 24C10 31.732 16.268 38 24 38" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 24H38" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M30 15L38 12L35 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="20" width="12" height="18" rx="1" stroke="currentColor" stroke-width="2"/><rect x="18" y="12" width="12" height="26" rx="1" stroke="currentColor" stroke-width="2"/><rect x="28" y="6" width="12" height="32" rx="1" stroke="currentColor" stroke-width="2"/></svg>`,
]

const nums = ['01', '02', '03', '04', '05', '06']
const featuredIndex = 1

const services = computed(() =>
  T.value.services.list.map((svc, i) => ({
    ...svc,
    num: nums[i],
    featured: i === featuredIndex,
    icon: serviceIcons[i],
  }))
)

const activeService = computed(() =>
  activeServiceIndex.value !== null ? services.value[activeServiceIndex.value] : null
)

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

function openModal(index) {
  activeServiceIndex.value = index
  document.body.classList.add('menu-open')
}

function closeModal() {
  activeServiceIndex.value = null
  document.body.classList.remove('menu-open')
}

function goToContact() {
  closeModal()
  setTimeout(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }, 200)
}

function onKeyDown(e) {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => document.addEventListener('keydown', onKeyDown))
onUnmounted(() => document.removeEventListener('keydown', onKeyDown))
</script>

<style scoped>
.svc-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(6,6,16,0.85);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.svc-modal {
  background: #0f0f1e;
  border: 1px solid rgba(124,58,237,0.3);
  border-radius: 16px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 60px rgba(124,58,237,0.2);
}

.svc-modal-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.8rem 1.8rem 1.2rem;
  border-bottom: 1px solid rgba(124,58,237,0.15);
}

.svc-modal-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  color: var(--purple-light);
}
.svc-modal-icon svg { width: 100%; height: 100%; }

.svc-modal-title {
  margin: 0.2rem 0 0;
  font-family: var(--font-display);
  font-size: 1.1rem;
  letter-spacing: 0.08em;
  color: var(--white);
}

.svc-close {
  margin-left: auto;
  background: none;
  border: none;
  color: var(--grey-dim);
  font-size: 1rem;
  cursor: pointer;
  padding: 0.4rem;
  transition: color 0.2s;
  flex-shrink: 0;
}
.svc-close:hover { color: var(--white); }

.svc-modal-body { padding: 1.6rem 1.8rem 2rem; }

.svc-modal-desc {
  color: var(--grey-mid);
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0 0 1.4rem;
}

.svc-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.svc-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--grey-light);
  font-size: 0.9rem;
}

.svc-bullet {
  color: var(--purple-light);
  font-size: 0.75rem;
  flex-shrink: 0;
}

.svc-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--purple), var(--violet));
  color: var(--white-pure);
  border: none;
  border-radius: 6px;
  padding: 0.85rem 1.8rem;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
}
.svc-cta:hover { opacity: 0.9; transform: translateY(-1px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
