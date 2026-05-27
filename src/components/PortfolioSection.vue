<template>
  <section id="portfolio" class="portfolio">
    <div class="section-header">
      <p class="section-tag">{{ T.portfolio.tag }}</p>
      <h2 class="section-title">{{ T.portfolio.title }} <span class="gradient-text">{{ T.portfolio.titleHighlight }}</span></h2>
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
          >{{ T.portfolio.visitSite }}</a>
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
import { computed } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'

useScrollReveal('#portfolio .project-card')

const { locale } = useLocale()
const T = computed(() => translations[locale.value])

const projectsMeta = [
  {
    size: 'large',
    bg: 'linear-gradient(135deg, #0d0520 0%, #3b0764 50%, #1a0a2e 100%)',
    tags: ['HTML', 'CSS', 'JavaScript', 'Vue'],
    url: 'https://mstyreexperts.com',
    preview: 'https://mstyreexperts.com',
  },
  {
    size: '',
    bg: 'linear-gradient(135deg, #0a0a1e 0%, #1a0a3e 100%)',
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'AI'],
    url: 'https://brentx04.github.io/Humanizer/',
    preview: 'https://brentx04.github.io/Humanizer/',
  },
  {
    size: '',
    bg: 'linear-gradient(135deg, #0d0520 0%, #2d0a5a 50%, #100520 100%)',
    tags: ['Vue 3', 'JavaScript', 'CSS'],
    url: '/calculator/index.html',
    preview: '/calculator/index.html',
  },
  {
    size: 'large right',
    bg: 'linear-gradient(135deg, #060616 0%, #1e0a4a 100%)',
    tags: ['Vue', 'JavaScript', 'Figma'],
    url: null,
  },
]

const projects = computed(() =>
  T.value.portfolio.projects.map((p, i) => ({ ...projectsMeta[i], ...p }))
)

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
