<template>
  <Transition name="sticky-up">
    <div v-if="visible" class="sticky-cta">
      <button class="sticky-btn sticky-btn--quote" @click="goQuote">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v12H5.17L4 17.17V4z"/></svg>
        <span>{{ T.sticky.quote }}</span>
      </button>
      <a class="sticky-btn sticky-btn--call" :href="'tel:' + phone" @click="track('call')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span>{{ T.sticky.call }}</span>
      </a>
      <a class="sticky-btn sticky-btn--wa" :href="'https://wa.me/' + waNumber" target="_blank" rel="noopener" @click="track('whatsapp')">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.9.9-2.8-.2-.3A8 8 0 1 1 12 20z"/></svg>
        <span>{{ T.sticky.whatsapp }}</span>
      </a>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'
import { trackEvent } from '../composables/useAnalytics.js'

defineProps({ visible: { type: Boolean, default: false } })

const { locale } = useLocale()
const T = computed(() => translations[locale.value])

const phone = '+32472196739'
const waNumber = '32472196739'

function track(channel) {
  trackEvent('sticky_cta_click', { channel })
}

function goQuote() {
  track('quote')
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.sticky-cta {
  display: none;
}

@media (max-width: 768px) {
  .sticky-cta {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 8200;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(124,58,237,0.2);
    border-top: 1px solid rgba(124,58,237,0.3);
    backdrop-filter: blur(20px);
    padding-bottom: env(safe-area-inset-bottom, 0);
  }

  .sticky-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.7rem 0.4rem;
    background: rgba(11,11,26,0.96);
    border: none;
    cursor: pointer;
    text-decoration: none;
    font-family: var(--font-display);
    font-size: 0.56rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--grey);
    transition: color 0.2s, background 0.2s;
  }
  .sticky-btn svg { width: 18px; height: 18px; }
  .sticky-btn:active { background: rgba(124,58,237,0.15); }

  .sticky-btn--quote { color: var(--purple-light); }
  .sticky-btn--call  { color: var(--white); }
  .sticky-btn--wa    { color: #25d366; }
}

.sticky-up-enter-active { transition: transform 0.35s cubic-bezier(0.34,1.4,0.64,1); }
.sticky-up-leave-active { transition: transform 0.25s ease; }
.sticky-up-enter-from, .sticky-up-leave-to { transform: translateY(100%); }
</style>
