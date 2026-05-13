<template>
  <div>
    <LoadingScreen />
    <ScrollProgress :progress="scrollProgress" />
    <CircuitCanvas />
    <CustomCursor />
    <NavBar :activeSection="activeSection" :menuOpen="menuOpen" @update:menuOpen="menuOpen = $event" />
    <main>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <MarqueeSection />
      <PortfolioSection />
      <TestimonialsSection />
      <TeamSection />
      <ContactSection />
    </main>
    <FooterSection />
    <BackToTop :visible="scrollY > 400" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LoadingScreen from './components/LoadingScreen.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import CircuitCanvas from './components/CircuitCanvas.vue'
import CustomCursor from './components/CustomCursor.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import AboutSection from './components/AboutSection.vue'
import MarqueeSection from './components/MarqueeSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import TeamSection from './components/TeamSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
import BackToTop from './components/BackToTop.vue'

const activeSection = ref('home')
const menuOpen = ref(false)
const scrollY = ref(0)
const scrollProgress = ref(0)

const sectionIds = ['home', 'services', 'about', 'portfolio', 'testimonials', 'team', 'contact']

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

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
