<template>
  <template v-if="!isTouch">
    <div class="cursor-dot" ref="dotRef"></div>
    <div class="cursor-ring" ref="ringRef"></div>
  </template>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isTouch = ref('ontouchstart' in window || navigator.maxTouchPoints > 0)
const dotRef = ref(null)
const ringRef = ref(null)

let mx = 0, my = 0, rx = 0, ry = 0
let rafId = null
let mouseMoveHandler = null
let hoverTargets = []

function animateCursor() {
  rx += (mx - rx) * 0.12
  ry += (my - ry) * 0.12
  if (dotRef.value) {
    dotRef.value.style.left = mx + 'px'
    dotRef.value.style.top  = my + 'px'
  }
  if (ringRef.value) {
    ringRef.value.style.left = rx + 'px'
    ringRef.value.style.top  = ry + 'px'
  }
  rafId = requestAnimationFrame(animateCursor)
}

onMounted(() => {
  if (isTouch.value) return

  mouseMoveHandler = e => { mx = e.clientX; my = e.clientY }
  document.addEventListener('mousemove', mouseMoveHandler)
  animateCursor()

  const selectors = 'a, button, .service-card, .project-card, .pillar, .testimonial-card'
  hoverTargets = Array.from(document.querySelectorAll(selectors))
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'))
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'))
  })
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  document.removeEventListener('mousemove', mouseMoveHandler)
})
</script>
