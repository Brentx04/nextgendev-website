<template>
  <Teleport to="body">
    <Transition name="popup">
      <div v-if="visible" class="exit-overlay" @click.self="close">
        <div class="exit-popup" role="dialog" aria-modal="true" aria-label="Exit intent popup">
          <!-- Close -->
          <button class="exit-close" @click="close" aria-label="Sluiten">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <!-- Top bar gradient -->
          <div class="popup-bar"></div>

          <!-- Icon -->
          <div class="popup-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
          </div>

          <!-- Text content -->
          <p class="popup-tag">{{ T.exitIntent.tag }}</p>
          <h2 class="popup-title">{{ T.exitIntent.title }}<br /><span class="gradient-text">{{ T.exitIntent.titleHighlight }}</span></h2>
          <p class="popup-sub">{{ T.exitIntent.sub }}</p>

          <!-- Urgency -->
          <div class="popup-urgency">
            <span class="urgency-dot"></span>
            {{ T.exitIntent.urgency }}
          </div>

          <!-- Buttons -->
          <div class="popup-actions">
            <a :href="T.exitIntent.ctaLink" target="_blank" rel="noopener" class="popup-cta-primary" @click="close">
              {{ T.exitIntent.ctaPrimary }}
            </a>
            <button class="popup-cta-secondary" @click="scrollToContact">
              {{ T.exitIntent.ctaSecondary }}
            </button>
          </div>

          <!-- Dismiss -->
          <button class="popup-dismiss" @click="dismiss">{{ T.exitIntent.dismiss }}</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'

const { locale } = useLocale()
const T = computed(() => translations[locale.value])

const visible = ref(false)
const dismissed = ref(false)
const STORAGE_KEY = 'ngc-exit-dismissed'

function close() {
  visible.value = false
}

function dismiss() {
  visible.value = false
  dismissed.value = true
  sessionStorage.setItem(STORAGE_KEY, '1')
}

function scrollToContact() {
  close()
  setTimeout(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }, 300)
}

function handleMouseLeave(e) {
  // Only trigger when mouse exits from the top of the window
  if (e.clientY > 10) return
  if (dismissed.value) return
  if (sessionStorage.getItem(STORAGE_KEY)) return
  visible.value = true
}

// Mobile: show after 40s if not dismissed
let mobileTimer = null

onMounted(() => {
  // Check if already dismissed this session
  if (sessionStorage.getItem(STORAGE_KEY)) return

  // Desktop: exit intent on mouse leaving top
  document.addEventListener('mouseleave', handleMouseLeave)

  // Mobile fallback: show after 40 seconds of being on page
  const isMobile = window.innerWidth < 768
  if (isMobile) {
    mobileTimer = setTimeout(() => {
      if (!dismissed.value && !sessionStorage.getItem(STORAGE_KEY)) {
        visible.value = true
      }
    }, 40000)
  }
})

onUnmounted(() => {
  document.removeEventListener('mouseleave', handleMouseLeave)
  if (mobileTimer) clearTimeout(mobileTimer)
})
</script>

<style scoped>
.exit-overlay {
  position: fixed;
  inset: 0;
  background: rgba(6, 6, 15, 0.82);
  backdrop-filter: blur(6px);
  z-index: 99000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.exit-popup {
  position: relative;
  background: linear-gradient(145deg, #0d0d1f, #0a0518);
  border: 1px solid rgba(124, 58, 237, 0.28);
  border-radius: 20px;
  padding: 2.8rem 2.4rem 2rem;
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 60px rgba(124, 58, 237, 0.18), 0 20px 60px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.popup-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #7c3aed, #a78bfa, #ec4899);
}

.exit-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(124, 58, 237, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--grey, #94a3b8);
  transition: background 0.2s, color 0.2s;
}
.exit-close:hover { background: rgba(124, 58, 237, 0.2); color: var(--white, #f5f3ff); }
.exit-close svg { width: 14px; height: 14px; }

.popup-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(236, 72, 153, 0.1));
  border: 1px solid rgba(124, 58, 237, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.2rem;
  color: #a78bfa;
}
.popup-icon svg { width: 26px; height: 26px; }

.popup-tag {
  font-family: var(--font-display, monospace);
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #a78bfa;
  margin-bottom: 0.8rem;
}

.popup-title {
  font-family: var(--font-display, monospace);
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #f5f3ff;
  line-height: 1.2;
  margin-bottom: 0.9rem;
}

.gradient-text {
  background: linear-gradient(135deg, #a78bfa, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.popup-sub {
  font-size: 0.92rem;
  color: #94a3b8;
  line-height: 1.65;
  margin-bottom: 1.2rem;
}

.popup-urgency {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 20px;
  padding: 0.3rem 0.9rem;
  margin-bottom: 1.6rem;
}
.urgency-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f59e0b;
  animation: pulse-amber 1.5s infinite;
  flex-shrink: 0;
}
@keyframes pulse-amber {
  0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
  50% { box-shadow: 0 0 0 5px rgba(245, 158, 11, 0); }
}

.popup-actions {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 1rem;
}

.popup-cta-primary {
  display: block;
  font-family: var(--font-display, monospace);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #f5f3ff;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  border: none;
  border-radius: 10px;
  padding: 0.9rem 1.5rem;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s, box-shadow 0.2s;
}
.popup-cta-primary:hover {
  opacity: 0.88;
  box-shadow: 0 0 28px rgba(124, 58, 237, 0.45);
}

.popup-cta-secondary {
  font-family: var(--font-display, monospace);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #a78bfa;
  background: none;
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 10px;
  padding: 0.9rem 1.5rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.popup-cta-secondary:hover {
  border-color: #a78bfa;
  color: #f5f3ff;
}

.popup-dismiss {
  font-size: 0.78rem;
  color: rgba(148, 163, 184, 0.5);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  transition: color 0.2s;
}
.popup-dismiss:hover { color: #94a3b8; }

/* Transition */
.popup-enter-active { transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.popup-leave-active { transition: opacity 0.22s ease, transform 0.22s ease; }
.popup-enter-from { opacity: 0; transform: scale(0.88) translateY(20px); }
.popup-leave-to { opacity: 0; transform: scale(0.95) translateY(10px); }

@media (max-width: 500px) {
  .exit-popup { padding: 2.2rem 1.4rem 1.6rem; border-radius: 16px; }
  .popup-title { font-size: 1.3rem; }
}
</style>
