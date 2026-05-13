<template>
  <section id="team" class="team" ref="sectionRef">
    <div class="section-header reveal">
      <p class="section-tag">// ONS TEAM</p>
      <h2 class="section-title">DE <span class="gradient-text">MENSEN</span> ACHTER NGD</h2>
    </div>

    <div class="team-grid">
      <div v-for="member in team" :key="member.name" class="team-card reveal">
        <div class="team-card-top">
          <div class="member-avatar">
            <img v-if="member.photo" :src="member.photo" :alt="member.name" class="avatar-photo" />
            <span v-else>{{ member.initials }}</span>
            <div class="avatar-ring"></div>
          </div>
          <div class="member-socials">
            <a v-if="member.linkedin" :href="member.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a v-if="member.instagram" :href="member.instagram" target="_blank" rel="noopener" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>
        <h3 class="member-name">{{ member.name }}</h3>
        <p class="member-role">{{ member.role }}</p>
        <p class="member-bio">{{ member.bio }}</p>
        <div class="member-skills">
          <span v-for="skill in member.skills" :key="skill">{{ skill }}</span>
        </div>
      </div>

      <!-- Vacature kaart -->
      <div class="team-card team-card--open reveal">
        <div class="open-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        </div>
        <h3 class="member-name">Word deel van het team</h3>
        <p class="member-role">Open positie</p>
        <p class="member-bio">Wij zijn altijd op zoek naar getalenteerde developers en designers die onze passie voor digitale innovatie delen.</p>
        <a href="#contact" @click.prevent="applyForTeam" class="open-cta">Solliciteer nu →</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sectionRef = ref(null)

const team = [
  {
    name: 'Brent Daenen',
    initials: 'BD',
    photo: import.meta.env.BASE_URL + 'brent.png',
    role: 'Oprichter & Full-Stack Developer',
    bio: 'Gepassioneerd door het bouwen van snelle, moderne webapplicaties. Combineert technische expertise met een scherp oog voor design.',
    skills: ['Vue', 'JavaScript', 'C#', 'UI/UX'],
    linkedin: 'https://www.linkedin.com/in/brent-d-9a4908331/',
    instagram: 'https://www.instagram.com/brentx04/',
  },
]

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
