<template>
  <section id="testimonials" class="testimonials">
    <div class="section-header">
      <p class="section-tag">{{ T.testimonials.tag }}</p>
      <h2 class="section-title">{{ T.testimonials.title }}<span class="gradient-text">{{ T.testimonials.titleHighlight }}</span></h2>
    </div>
    <div class="testimonials-grid">
      <div v-for="t in T.testimonials.list" :key="t.author" class="testimonial-card">
        <div class="testimonial-stars">
          <span v-for="i in 5" :key="i">★</span>
        </div>
        <div class="testimonial-quote">"</div>
        <p class="testimonial-text">{{ t.text }}</p>
        <div class="testimonial-author">
          <div class="author-avatar">{{ t.initials }}</div>
          <div class="author-info">
            <span class="author-name">{{ t.author }}</span>
            <span class="author-role">{{ t.role }}</span>
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

useScrollReveal('#testimonials .testimonial-card')

const { locale } = useLocale()
const T = computed(() => translations[locale.value])
</script>

<style scoped>
.testimonials {
  padding: 7rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 4rem;
}

.testimonial-card {
  position: relative;
  padding: 2rem;
  background: rgba(255,255,255,0.018);
  border: 1px solid rgba(124,58,237,0.18);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
  overflow: hidden;
}
.testimonial-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(124,58,237,0.06) 0%, transparent 60%);
  pointer-events: none;
}
.testimonial-card:hover {
  border-color: rgba(124,58,237,0.4);
  box-shadow: 0 8px 40px rgba(124,58,237,0.12);
  transform: translateY(-4px);
}

.testimonial-stars {
  display: flex;
  gap: 3px;
  color: #f59e0b;
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.testimonial-quote {
  font-size: 3.5rem;
  line-height: 1;
  color: rgba(124,58,237,0.3);
  font-family: Georgia, serif;
  margin-top: -0.5rem;
}

.testimonial-text {
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--grey);
  flex: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(124,58,237,0.1);
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--purple), #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 0.6rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
  letter-spacing: 0.05em;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--white);
  letter-spacing: 0.02em;
}

.author-role {
  font-size: 0.7rem;
  color: rgba(167,139,250,0.65);
  letter-spacing: 0.04em;
}

@media (max-width: 900px) {
  .testimonials-grid { grid-template-columns: 1fr; gap: 1rem; }
}
</style>
