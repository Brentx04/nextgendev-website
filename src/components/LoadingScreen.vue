<template>
  <Transition name="loader-fade">
    <div v-if="visible" class="loader">
      <div class="loader-bg"></div>

      <div class="loader-content">
        <img :src="baseUrl + 'NGC.png'" alt="Next Gen Codes" class="loader-logo" />
        <p class="loader-brand">NEXT GEN CODES</p>

        <div class="loader-bar-wrap">
          <div class="loader-bar" :style="{ width: progress + '%' }"></div>
        </div>
        <p class="loader-pct">{{ Math.floor(progress) }}%</p>
      </div>

      <div class="loader-corner loader-corner--tl"></div>
      <div class="loader-corner loader-corner--tr"></div>
      <div class="loader-corner loader-corner--bl"></div>
      <div class="loader-corner loader-corner--br"></div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const alreadyLoaded = sessionStorage.getItem('ngc-loaded')
const visible = ref(!alreadyLoaded)
const progress = ref(0)
const baseUrl = import.meta.env.BASE_URL

onMounted(() => {
  if (alreadyLoaded) return
  sessionStorage.setItem('ngc-loaded', '1')

  const duration = 2200
  const start = performance.now()

  function tick(now) {
    const elapsed = now - start
    const p = Math.min((elapsed / duration) * 100, 100)
    progress.value = p
    if (p < 100) {
      requestAnimationFrame(tick)
    } else {
      setTimeout(() => { visible.value = false }, 400)
    }
  }

  requestAnimationFrame(tick)
})
</script>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #06060f;
  overflow: hidden;
}

.loader-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%);
}

.loader-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}

.loader-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  animation: loader-pulse 1.6s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(124,58,237,0.9))
          drop-shadow(0 0 50px rgba(124,58,237,0.4));
}

@keyframes loader-pulse {
  0%, 100% { transform: scale(1);   opacity: 1; }
  50%       { transform: scale(1.06); opacity: 0.85; }
}

.loader-brand {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.35em;
  color: rgba(167,139,250,0.8);
  margin: 0;
}

.loader-bar-wrap {
  width: 220px;
  height: 2px;
  background: rgba(124,58,237,0.15);
  border-radius: 2px;
  overflow: hidden;
}

.loader-bar {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #a78bfa);
  border-radius: 2px;
  transition: width 0.05s linear;
  box-shadow: 0 0 10px rgba(124,58,237,0.8);
}

.loader-pct {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: rgba(124,58,237,0.6);
  margin: 0;
}

/* Corner accents */
.loader-corner {
  position: absolute;
  width: 24px;
  height: 24px;
  border-color: rgba(124,58,237,0.4);
  border-style: solid;
}
.loader-corner--tl { top: 24px; left: 24px;  border-width: 1px 0 0 1px; }
.loader-corner--tr { top: 24px; right: 24px; border-width: 1px 1px 0 0; }
.loader-corner--bl { bottom: 24px; left: 24px;  border-width: 0 0 1px 1px; }
.loader-corner--br { bottom: 24px; right: 24px; border-width: 0 1px 1px 0; }

/* Exit transition */
.loader-fade-leave-active { transition: opacity 0.6s ease, transform 0.6s ease; }
.loader-fade-leave-to    { opacity: 0; transform: scale(1.03); }
</style>
