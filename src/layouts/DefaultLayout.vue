<template>
  <div>
    <LoadingScreen />
    <CookieBanner />
    <ScrollProgress :progress="scrollProgress" />
    <CircuitCanvas />
    <CustomCursor />
    <NavBar :activeSection="activeSection" :menuOpen="menuOpen" @update:menuOpen="menuOpen = $event" />
    <slot />
    <FooterSection />
    <BackToTop :visible="scrollY > 400" />
    <WhatsAppButton />
    <StickyMobileCta :visible="scrollY > 600" />
    <ExitIntentPopup />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LoadingScreen from '../components/LoadingScreen.vue'
import ScrollProgress from '../components/ScrollProgress.vue'
import CircuitCanvas from '../components/CircuitCanvas.vue'
import CustomCursor from '../components/CustomCursor.vue'
import NavBar from '../components/NavBar.vue'
import CookieBanner from '../components/CookieBanner.vue'
import FooterSection from '../components/FooterSection.vue'
import BackToTop from '../components/BackToTop.vue'
import WhatsAppButton from '../components/WhatsAppButton.vue'
import StickyMobileCta from '../components/StickyMobileCta.vue'
import ExitIntentPopup from '../components/ExitIntentPopup.vue'
import { applyStoredConsent } from '../composables/useConsent.js'

const activeSection = ref('home')
const menuOpen = ref(false)
const scrollY = ref(0)
const scrollProgress = ref(0)

const sectionIds = ['home', 'services', 'pricing', 'about', 'portfolio', 'testimonials', 'team', 'contact']

function onScroll() {
  scrollY.value = window.scrollY
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0

  let current = 'home'
  sectionIds.forEach(id => {
    const el = document.getElementById(id)
    if (el && window.scrollY >= el.offsetTop - 150) current = id
  })
  activeSection.value = current
}

onMounted(() => {
  applyStoredConsent()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
