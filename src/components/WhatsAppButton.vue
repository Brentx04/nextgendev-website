<template>
  <Transition name="wa-pop">
    <a
      v-if="visible"
      href="https://wa.me/32472196739"
      target="_blank"
      rel="noopener"
      class="wa-float"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" class="wa-icon">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span class="wa-pulse"></span>
    </a>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(false)

onMounted(() => {
  // Delay appearance so it doesn't clash with page load
  setTimeout(() => { visible.value = true }, 1800)
})
</script>

<style scoped>
.wa-float {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 8000;
  width: 54px;
  height: 54px;
  background: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 4px 20px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.3);
  transition: transform 0.22s cubic-bezier(0.34,1.56,.64,1), box-shadow 0.22s;
}
.wa-float:hover {
  transform: scale(1.12);
  box-shadow: 0 6px 30px rgba(37,211,102,0.6), 0 2px 12px rgba(0,0,0,0.3);
}

.wa-icon {
  width: 28px;
  height: 28px;
  position: relative;
  z-index: 1;
}

/* Pulse ring */
.wa-pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid rgba(37,211,102,0.5);
  animation: wa-ring 2.5s ease-out infinite;
}

@keyframes wa-ring {
  0%   { transform: scale(1);   opacity: 0.7; }
  70%  { transform: scale(1.5); opacity: 0; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* Entry animation */
.wa-pop-enter-active { transition: transform 0.4s cubic-bezier(0.34,1.56,.64,1), opacity 0.3s; }
.wa-pop-leave-active { transition: transform 0.25s ease, opacity 0.25s; }
.wa-pop-enter-from  { transform: scale(0); opacity: 0; }
.wa-pop-leave-to    { transform: scale(0); opacity: 0; }
</style>
