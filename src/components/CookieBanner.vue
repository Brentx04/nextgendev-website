<template>
  <Transition name="cookie-slide">
    <div v-if="visible" class="cookie-banner">
      <div class="cookie-inner">
        <div class="cookie-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
            <circle cx="12" cy="12" r="1" fill="currentColor"/>
            <circle cx="8" cy="9" r="1" fill="currentColor"/>
            <circle cx="15" cy="8" r="1" fill="currentColor"/>
            <circle cx="9" cy="15" r="1" fill="currentColor"/>
            <circle cx="15" cy="15" r="1" fill="currentColor"/>
          </svg>
        </div>
        <p class="cookie-text">
          {{ T.cookie.message }}
          <a href="#" class="cookie-policy" @click.prevent="showPrivacy">{{ T.cookie.policy }}</a>
        </p>
        <div class="cookie-actions">
          <button class="cookie-decline" @click="decline">{{ T.cookie.decline }}</button>
          <button class="cookie-accept" @click="accept">{{ T.cookie.accept }}</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'

const { locale } = useLocale()
const T = computed(() => translations[locale.value])
const visible = ref(false)

onMounted(() => {
  if (!localStorage.getItem('ngc-cookie-consent')) {
    setTimeout(() => { visible.value = true }, 2500)
  }
})

function accept() {
  localStorage.setItem('ngc-cookie-consent', 'accepted')
  visible.value = false
}

function decline() {
  localStorage.setItem('ngc-cookie-consent', 'declined')
  visible.value = false
}

function showPrivacy() {
  document.querySelector('[data-privacy]')?.click()
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 8500;
  width: min(680px, calc(100vw - 32px));
}

.cookie-inner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  background: rgba(11, 11, 26, 0.95);
  border: 1px solid rgba(124,58,237,0.3);
  border-radius: 14px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 30px rgba(124,58,237,0.1);
}

.cookie-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  color: var(--purple-light);
}
.cookie-icon svg { width: 100%; height: 100%; }

.cookie-text {
  flex: 1;
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--grey);
}

.cookie-policy {
  color: var(--purple-light);
  text-decoration: underline;
  text-underline-offset: 2px;
  margin-left: 4px;
  transition: opacity 0.2s;
}
.cookie-policy:hover { opacity: 0.75; }

.cookie-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.cookie-decline {
  font-family: var(--font-display);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--grey);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 0.5rem 0.9rem;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.2s, color 0.2s;
}
.cookie-decline:hover {
  border-color: rgba(255,255,255,0.25);
  color: var(--white);
}

.cookie-accept {
  font-family: var(--font-display);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #fff;
  background: linear-gradient(135deg, var(--purple), #ec4899);
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.1rem;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s, box-shadow 0.2s;
}
.cookie-accept:hover {
  opacity: 0.88;
  box-shadow: 0 0 18px rgba(124,58,237,0.4);
}

/* Slide up animation */
.cookie-slide-enter-active { transition: transform 0.4s cubic-bezier(0.34,1.56,.64,1), opacity 0.3s; }
.cookie-slide-leave-active { transition: transform 0.25s ease, opacity 0.25s; }
.cookie-slide-enter-from  { transform: translateX(-50%) translateY(100px); opacity: 0; }
.cookie-slide-leave-to    { transform: translateX(-50%) translateY(100px); opacity: 0; }

@media (max-width: 600px) {
  .cookie-inner { flex-direction: column; align-items: flex-start; }
  .cookie-actions { width: 100%; }
  .cookie-decline, .cookie-accept { flex: 1; text-align: center; }
}
</style>
