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
