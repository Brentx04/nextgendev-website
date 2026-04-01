<template>
  <Transition name="slide-up">
    <button v-if="visible" class="back-to-top" @click="scrollTop" aria-label="Terug naar boven">
      ↑
    </button>
  </Transition>
</template>

<script setup>
defineProps({ visible: { type: Boolean, default: false } })

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
