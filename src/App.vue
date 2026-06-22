<template>
  <div>
    <LoadingScreen />
    <CookieBanner />
    <ScrollProgress :progress="scrollProgress" />
    <CircuitCanvas />
    <CustomCursor />
    <NavBar :activeSection="activeSection" :menuOpen="menuOpen" @update:menuOpen="menuOpen = $event" />
    <main>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <AboutSection />
      <MarqueeSection />
      <PortfolioSection />
      <TestimonialsSection />
      <TeamSection />
      <FAQSection />
      <BlogSection />
      <WebsiteAuditSection />
      <ContactSection />
    </main>
    <FooterSection />
    <BackToTop :visible="scrollY > 400" />
    <WhatsAppButton />
    <StickyMobileCta :visible="scrollY > 600" />
    <ExitIntentPopup />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
// Above-the-fold: load eagerly so the first paint is instant.
import LoadingScreen from './components/LoadingScreen.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import CircuitCanvas from './components/CircuitCanvas.vue'
import CustomCursor from './components/CustomCursor.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
// Small chrome widgets — tiny, used immediately, keep eager.
import BackToTop from './components/BackToTop.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
import CookieBanner from './components/CookieBanner.vue'
// Below-the-fold: split into separate chunks, fetched on demand.
const ProcessSection = defineAsyncComponent(() => import('./components/ProcessSection.vue'))
const PricingSection = defineAsyncComponent(() => import('./components/PricingSection.vue'))
const AboutSection = defineAsyncComponent(() => import('./components/AboutSection.vue'))
const MarqueeSection = defineAsyncComponent(() => import('./components/MarqueeSection.vue'))
const PortfolioSection = defineAsyncComponent(() => import('./components/PortfolioSection.vue'))
const TestimonialsSection = defineAsyncComponent(() => import('./components/TestimonialsSection.vue'))
const TeamSection = defineAsyncComponent(() => import('./components/TeamSection.vue'))
const FAQSection = defineAsyncComponent(() => import('./components/FAQSection.vue'))
const BlogSection = defineAsyncComponent(() => import('./components/BlogSection.vue'))
const WebsiteAuditSection = defineAsyncComponent(() => import('./components/WebsiteAuditSection.vue'))
const ContactSection = defineAsyncComponent(() => import('./components/ContactSection.vue'))
const FooterSection = defineAsyncComponent(() => import('./components/FooterSection.vue'))
const StickyMobileCta = defineAsyncComponent(() => import('./components/StickyMobileCta.vue'))
const ExitIntentPopup = defineAsyncComponent(() => import('./components/ExitIntentPopup.vue'))
import { applyStoredConsent } from './composables/useConsent.js'

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
