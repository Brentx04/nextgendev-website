<template>
  <section id="faq" class="faq">
    <div class="section-header">
      <p class="section-tag">{{ T.faq.tag }}</p>
      <h2 class="section-title">
        {{ T.faq.title }}&nbsp;<span class="gradient-text">{{ T.faq.titleHighlight }}</span>
      </h2>
    </div>

    <div class="faq-list">
      <div
        v-for="(item, i) in T.faq.list"
        :key="i"
        class="faq-item"
        :class="{ open: openIndex === i }"
        ref="itemRefs"
      >
        <button class="faq-question" @click="toggle(i)" :aria-expanded="openIndex === i">
          <span class="faq-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="faq-q-text">{{ item.q }}</span>
          <span class="faq-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </span>
        </button>
        <div class="faq-answer-wrap" :style="answerStyle(i)">
          <p class="faq-answer">{{ item.a }}</p>
        </div>
      </div>
    </div>

    <div class="faq-cta">
      <p>{{ T.faq.ctaSub }}</p>
      <button class="faq-cta-btn" @click="scrollToContact">{{ T.faq.ctaBtn }}</button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'

const { locale } = useLocale()
const T = computed(() => translations[locale.value])

const openIndex = ref(null)
const itemRefs = ref([])
const answerHeights = ref({})

function toggle(i) {
  if (openIndex.value === i) {
    openIndex.value = null
  } else {
    openIndex.value = i
    nextTick(() => {
      const el = document.querySelectorAll('.faq-answer-wrap')[i]
      if (el) answerHeights.value[i] = el.scrollHeight
    })
  }
}

function answerStyle(i) {
  if (openIndex.value !== i) return { maxHeight: '0px' }
  return { maxHeight: (answerHeights.value[i] || 200) + 'px' }
}

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.faq {
  max-width: 860px;
  margin: 0 auto;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 4rem;
  border: 1px solid rgba(124,58,237,0.15);
  border-radius: 16px;
  overflow: hidden;
}

.faq-item {
  border-bottom: 1px solid rgba(124,58,237,0.1);
  background: rgba(255,255,255,0.012);
  transition: background 0.25s;
}
.faq-item:last-child { border-bottom: none; }
.faq-item.open {
  background: rgba(124,58,237,0.04);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.1rem;
  padding: 1.4rem 1.6rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  color: var(--white);
  transition: color 0.2s;
}
.faq-question:hover { color: var(--purple-light); }
.faq-item.open .faq-question { color: var(--purple-light); }

.faq-num {
  font-family: var(--font-display);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(124,58,237,0.5);
  flex-shrink: 0;
  width: 24px;
}
.faq-item.open .faq-num { color: var(--purple-light); }

.faq-q-text {
  flex: 1;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.4;
}

.faq-icon {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid rgba(124,58,237,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(124,58,237,0.6);
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.2s, color 0.2s;
}
.faq-icon svg { width: 12px; height: 12px; }
.faq-item.open .faq-icon {
  transform: rotate(180deg);
  border-color: var(--purple-light);
  color: var(--purple-light);
}

.faq-answer-wrap {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.38s cubic-bezier(0.4,0,0.2,1);
}

.faq-answer {
  padding: 0 1.6rem 1.4rem calc(1.6rem + 24px + 1.1rem);
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--grey);
}

/* CTA below FAQ */
.faq-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 2.5rem;
  padding: 1.5rem 2rem;
  border: 1px solid rgba(124,58,237,0.18);
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(124,58,237,0.06), rgba(236,72,153,0.03));
}

.faq-cta p {
  font-size: 0.9rem;
  color: var(--grey);
  line-height: 1.5;
}

.faq-cta-btn {
  flex-shrink: 0;
  font-family: var(--font-display);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--white);
  background: linear-gradient(135deg, var(--purple), #ec4899);
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.4rem;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s, box-shadow 0.2s;
}
.faq-cta-btn:hover {
  opacity: 0.88;
  box-shadow: 0 0 20px rgba(124,58,237,0.35);
}

@media (max-width: 768px) {
  .faq-q-text { font-size: 0.9rem; }
  .faq-answer { padding: 0 1rem 1.2rem 1rem; }
  .faq-cta { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .faq-cta-btn { width: 100%; text-align: center; }
}
</style>
