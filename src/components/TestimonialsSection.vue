<template>
  <section id="testimonials" class="testimonials">
    <div class="section-header">
      <p class="section-tag">// WAT KLANTEN ZEGGEN</p>
      <h2 class="section-title">KLANT<span class="gradient-text">ERVARINGEN</span></h2>
    </div>
    <div class="testimonials-grid">
      <div v-for="t in testimonials" :key="t.author" class="testimonial-card">
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
import { useScrollReveal } from '../composables/useScrollReveal.js'

useScrollReveal('#testimonials .testimonial-card')

const testimonials = [
  {
    text: 'Dankzij de expertise van Next Gen Codes is ons platform van de grond af aan opgebouwd en ons volledige bedrijfsproces gedigitaliseerd. Het team werkt uiterst professioneel en levert kwaliteit die onze verwachtingen overtreft. Een absolute aanrader voor wie digitale transformatie serieus neemt..',
    author: 'Navid',
    role: 'CEO — M+S tyre experts B.V.',
    initials: 'N',
  },
  {
    text: 'Eindelijk een bureau dat begrijpt wat wij nodig hebben. Van design tot lancering verliep alles vlekkeloos. Onze klanten zijn onder de indruk van het eindresultaat — en wij ook.',
    author: 'Lena Martens',
    role: 'Marketing Director — Fintrack NV',
    initials: 'LM',
  },
  {
    text: 'Het maatwerk dashboard dat NGD bouwde geeft ons inzichten die we nooit eerder hadden. De integratie met onze bestaande systemen was naadloos. Absolute aanrader.',
    author: 'Kevin De Smedt',
    role: 'CTO — LogiCore Solutions',
    initials: 'KD',
  },
]
</script>
