<template>
  <section id="portfolio" class="portfolio">
    <div class="section-header">
      <p class="section-tag">// ONS WERK</p>
      <h2 class="section-title">GESELECTEERDE <span class="gradient-text">PROJECTEN</span></h2>
    </div>
    <div class="portfolio-grid">
      <article
        v-for="project in projects"
        :key="project.title"
        class="project-card"
        :class="project.size"
        @mousemove="onTilt($event)"
        @mouseleave="resetTilt($event)"
      >
        <div class="project-img" :style="{ background: project.bg }">
          <div class="project-pattern"></div>
          <iframe
            v-if="project.preview"
            :src="project.preview"
            class="project-preview-iframe"
            scrolling="no"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            tabindex="-1"
          ></iframe>
          <div v-if="project.preview" class="project-preview-overlay"></div>
          <span class="project-cat">{{ project.cat }}</span>
          <a
            v-if="project.url"
            :href="project.url"
            target="_blank"
            rel="noopener"
            class="project-visit"
          >Bezoek site ↗</a>
        </div>
        <div class="project-info">
          <h3>{{ project.title }}</h3>
          <p>{{ project.desc }}</p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { useScrollReveal } from '../composables/useScrollReveal.js'

useScrollReveal('#portfolio .project-card')

const projects = [
  {
    size: 'large',
    bg: 'linear-gradient(135deg, #0d0520 0%, #3b0764 50%, #1a0a2e 100%)',
    cat: 'WEBSITE',
    title: 'MS Tyre Experts',
    desc: 'Professionele bedrijfswebsite voor een toonaangevende bandenvakspecialist. Moderne UI, volledige mobiele optimalisatie en snelle laadtijden.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Vue'],
    url: 'https://mstyreexperts.com',
    preview: 'https://mstyreexperts.com',
  },
  {
    size: '',
    bg: 'linear-gradient(135deg, #0a0a1e 0%, #1a0a3e 100%)',
    cat: 'BINNENKORT',
    title: 'Project in Ontwikkeling',
    desc: 'Een nieuw project is momenteel in ontwikkeling. Neem contact op voor meer informatie.',
    tags: ['C#', 'MySQL'],
    url: null,
  },
  {
    size: '',
    bg: 'linear-gradient(135deg, #100520 0%, #2d1060 100%)',
    cat: 'BINNENKORT',
    title: 'Project in Ontwikkeling',
    desc: 'Een nieuw project is momenteel in ontwikkeling. Neem contact op voor meer informatie.',
    tags: ['Python', 'Node.js'],
    url: null,
  },
  {
    size: 'large right',
    bg: 'linear-gradient(135deg, #060616 0%, #1e0a4a 100%)',
    cat: 'BINNENKORT',
    title: 'Project in Ontwikkeling',
    desc: 'Een nieuw project is momenteel in ontwikkeling. Neem contact op voor meer informatie.',
    tags: ['Vue', 'JavaScript', 'Figma'],
    url: null,
  },
]

function onTilt(e) {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = (e.clientX - cx) / (rect.width / 2)
  const dy = (e.clientY - cy) / (rect.height / 2)
  card.style.transform = `perspective(800px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg) translateY(-4px)`
}

function resetTilt(e) {
  e.currentTarget.style.transform = ''
}
</script>
