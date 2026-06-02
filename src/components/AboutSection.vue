<template>
  <section id="about" class="about">
    <div class="about-inner">
      <div class="about-visual">
        <div class="about-hex-grid">
          <div v-for="(active, i) in hexGrid" :key="i" class="hex" :class="{ active }"></div>
        </div>
        <div class="about-glow-orb"></div>
        <div class="about-logo-display">
          <img :src="baseUrl + 'NGC.png'" alt="Peter" class="about-logo-img" />
        </div>
      </div>

      <div class="about-content">
        <p class="section-tag">{{ T.about.tag }}</p>
        <h2 class="section-title">{{ T.about.title1 }}<br /><span class="gradient-text">{{ T.about.title2 }}</span></h2>
        <p class="about-body">{{ T.about.body1 }}</p>
        <p class="about-body">{{ T.about.body2 }}</p>
        <div class="about-pillars">
          <div v-for="pillar in T.about.pillars" :key="pillar.title" class="pillar">
            <div class="pillar-icon">{{ pillar.icon }}</div>
            <h4>{{ pillar.title }}</h4>
            <p>{{ pillar.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'

const baseUrl = import.meta.env.BASE_URL
const { locale } = useLocale()
const T = computed(() => translations[locale.value])

useScrollReveal('#about .about-inner > *')
useScrollReveal('#about .pillar')

const hexGrid = [false, false, false, false, true, false, false, false, false]
</script>
