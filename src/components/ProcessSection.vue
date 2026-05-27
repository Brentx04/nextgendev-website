<template>
  <section id="process" class="process">
    <div class="section-header">
      <p class="section-tag">{{ T.process.tag }}</p>
      <h2 class="section-title">
        {{ T.process.title }}&nbsp;<span class="gradient-text">{{ T.process.titleHighlight }}</span>
      </h2>
    </div>

    <div class="process-track">
      <div class="process-line"></div>

      <div
        v-for="(step, i) in T.process.steps"
        :key="i"
        class="process-step"
        ref="stepRefs"
      >
        <div class="step-node">
          <span class="step-num">{{ step.num }}</span>
          <div class="step-icon">
            <svg v-if="i === 0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <svg v-else-if="i === 1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14 2z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/>
            </svg>
            <svg v-else-if="i === 2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L8 6H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-3L12 2z"/><path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
        </div>

        <div class="step-body">
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-desc">{{ step.desc }}</p>
        </div>

        <div class="step-connector" v-if="i < T.process.steps.length - 1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="process-cta">
      <button class="process-cta-btn" @click="scrollToContact">
        <span class="btn-bg"></span>
        <span class="btn-text">{{ T.process.cta }}</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'

const { locale } = useLocale()
const T = computed(() => translations[locale.value])
const stepRefs = ref([])

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        obs.unobserve(entry.target)
      }
    })
  }, { threshold: 0.2 })

  document.querySelectorAll('.process-step').forEach(el => obs.observe(el))
})
</script>

<style scoped>
.process {
  padding: 7rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.process-track {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: 5rem;
}

/* Horizontal connector line */
.process-line {
  position: absolute;
  top: 40px;
  left: calc(12.5% + 20px);
  right: calc(12.5% + 20px);
  height: 1px;
  background: linear-gradient(90deg, rgba(124,58,237,0.5), rgba(236,72,153,0.5));
}

.process-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 1rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.process-step:nth-child(2) { transition-delay: 0.1s; }
.process-step:nth-child(3) { transition-delay: 0.2s; }
.process-step:nth-child(4) { transition-delay: 0.3s; }
.process-step:nth-child(5) { transition-delay: 0.4s; }
.process-step.visible { opacity: 1; transform: translateY(0); }

.step-node {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.1));
  border: 1px solid rgba(124,58,237,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  z-index: 1;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
}
.step-node:hover {
  border-color: var(--purple-light);
  box-shadow: 0 0 30px rgba(124,58,237,0.3);
  transform: scale(1.05);
}

.step-num {
  position: absolute;
  top: -8px;
  right: -4px;
  font-family: var(--font-display);
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--purple-light);
  background: var(--dark);
  padding: 2px 5px;
  border: 1px solid rgba(124,58,237,0.3);
  border-radius: 4px;
}

.step-icon {
  width: 32px;
  height: 32px;
  color: var(--purple-light);
}
.step-icon svg { width: 100%; height: 100%; }

.step-body {
  flex: 1;
}

.step-title {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--white);
  margin-bottom: 0.6rem;
}

.step-desc {
  font-size: 0.85rem;
  line-height: 1.65;
  color: var(--grey);
}

.step-connector {
  display: none;
}

/* CTA */
.process-cta {
  display: flex;
  justify-content: center;
  margin-top: 4rem;
}

.process-cta-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2.2rem;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--white);
  overflow: hidden;
  clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
}
.process-cta-btn .btn-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--purple), #ec4899);
  transition: opacity 0.25s;
}
.process-cta-btn:hover .btn-bg { opacity: 0.85; }
.process-cta-btn .btn-text { position: relative; z-index: 1; }

@media (max-width: 900px) {
  .process-track {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .process-line { display: none; }
  .process-step {
    flex-direction: row;
    text-align: left;
    align-items: flex-start;
    gap: 1.2rem;
  }
  .step-node { flex-shrink: 0; margin-bottom: 0; width: 60px; height: 60px; }
  .step-icon { width: 24px; height: 24px; }
}
</style>
