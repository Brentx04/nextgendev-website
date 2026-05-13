<template>
  <section id="about" class="about">
    <div class="about-inner">
      <div class="about-visual">
        <div class="about-hex-grid">
          <div v-for="(active, i) in hexGrid" :key="i" class="hex" :class="{ active }"></div>
        </div>
        <div class="about-glow-orb"></div>
        <div class="about-logo-display">
          <img :src="baseUrl + 'ngd-logo.png'" alt="Next Gen Codes" class="about-logo-img" />
        </div>
      </div>

      <div class="about-content">
        <p class="section-tag">// WIE WE ZIJN</p>
        <h2 class="section-title">UW VISIE,<br /><span class="gradient-text">ONZE CODE</span></h2>
        <p class="about-body">
          Next Gen Codes is een gespecialiseerd digitaal bureau met een passie voor kwaliteit, precisie en het doorbreken van grenzen op het web. Wij bouwen geen gewone websites — wij engineeren ervaringen die indruk maken.
        </p>
        <p class="about-body">
          Van ambitieuze startups tot gevestigde bedrijven: wij werken samen met opdrachtgevers die het beste verwachten. Ons team opereert op het snijvlak van design en technologie, altijd met één doel: uw succes.
        </p>
        <div class="about-pillars">
          <div v-for="pillar in pillars" :key="pillar.title" class="pillar">
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
import { useScrollReveal } from '../composables/useScrollReveal.js'

const baseUrl = import.meta.env.BASE_URL

useScrollReveal('#about .about-inner > *')
useScrollReveal('#about .pillar')

const hexGrid = [false, false, false, false, true, false, false, false, false]

const pillars = [
  { icon: '⬡', title: 'PRECISIE',   desc: 'Elk pixel, elke regel code met aandacht en intentie gemaakt.' },
  { icon: '◈', title: 'INNOVATIE',  desc: 'Wij leven aan de voorhoede van wat technisch mogelijk is.' },
  { icon: '◉', title: 'RESULTAAT',  desc: 'Resultaatgericht denken dat het verschil maakt voor uw organisatie.' },
]
</script>
