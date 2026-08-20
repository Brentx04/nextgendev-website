<template>
  <section id="team" class="team" ref="sectionRef">
    <div class="section-header reveal">
      <p class="section-tag">{{ T.team.tag }}</p>
      <h2 class="section-title">{{ T.team.title }} <span class="gradient-text">{{ T.team.titleHighlight }}</span> {{ T.team.titleSuffix }}</h2>
    </div>

    <div class="team-grid">
      <div class="team-card reveal">
        <div class="team-card-top">
          <div class="member-avatar">
            <img :src="memberPhoto" alt="Brent Daenen" class="avatar-photo" />
            <div class="avatar-ring"></div>
          </div>
          <div class="member-socials">
            <a href="https://www.linkedin.com/in/brent-d-9a4908331/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://www.instagram.com/brentx04/" target="_blank" rel="noopener" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>
        <h3 class="member-name">Brent Daenen</h3>
        <p class="member-role">{{ T.team.memberRole }}</p>
        <p class="member-bio">{{ T.team.memberBio }}</p>
        <div class="member-skills">
          <span v-for="skill in memberSkills" :key="skill">{{ skill }}</span>
        </div>
      </div>

      <div class="team-card team-card--open reveal">
        <div class="open-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        </div>
        <h3 class="member-name">{{ T.team.openTitle }}</h3>
        <p class="member-role">{{ T.team.openRole }}</p>
        <p class="member-bio">{{ T.team.openBio }}</p>
        <a href="#contact" @click.prevent="applyForTeam" class="open-cta">{{ T.team.openCta }}</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'

const { locale } = useLocale()
const T = computed(() => translations[locale.value])

const sectionRef = ref(null)
const memberPhoto = import.meta.env.BASE_URL + 'brent.jpg'
const memberSkills = ['Vue', 'JavaScript', 'C#', 'UI/UX']

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function applyForTeam() {
  scrollTo('contact')
  setTimeout(() => window.dispatchEvent(new Event('ngc:apply')), 600)
}

onMounted(() => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('revealed')
    })
  }, { threshold: 0.15 })
  sectionRef.value?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
})
</script>
