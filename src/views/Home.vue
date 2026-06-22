<template>
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
</template>

<script setup>
// Static imports so every section is pre-rendered into the static HTML (SEO).
import { useHead } from '@unhead/vue'
import HeroSection from '../components/HeroSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import ProcessSection from '../components/ProcessSection.vue'
import PricingSection from '../components/PricingSection.vue'
import AboutSection from '../components/AboutSection.vue'
import MarqueeSection from '../components/MarqueeSection.vue'
import PortfolioSection from '../components/PortfolioSection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import TeamSection from '../components/TeamSection.vue'
import FAQSection from '../components/FAQSection.vue'
import BlogSection from '../components/BlogSection.vue'
import WebsiteAuditSection from '../components/WebsiteAuditSection.vue'
import ContactSection from '../components/ContactSection.vue'

useHead({
  title: 'Next Gen Codes | Professionele Webapplicaties & Digitale Oplossingen — Genk, België',
  link: [{ rel: 'canonical', href: 'https://ngcodes.com/' }],
  meta: [
    { name: 'description', content: 'Next Gen Codes bouwt high-performance webapplicaties, moderne websites en maatwerk software. Gevestigd in Genk, België. Vraag gratis een offerte aan.' },
  ],
})
</script>
