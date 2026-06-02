<template>
  <section id="pricing" class="pricing">
    <div class="section-header">
      <p class="section-tag">{{ T.pricing.tag }}</p>
      <h2 class="section-title">
        {{ T.pricing.title }}&nbsp;<span class="gradient-text">{{ T.pricing.titleHighlight }}</span>
      </h2>
      <p class="section-sub">{{ T.pricing.sub }}</p>
    </div>

    <div class="pricing-grid">
      <div
        v-for="(tier, i) in T.pricing.tiers"
        :key="tier.name"
        class="price-card"
        :class="{ 'price-card--popular': i === 1 }"
      >
        <span v-if="i === 1" class="popular-badge">{{ T.pricing.popular }}</span>
        <h3 class="price-name">{{ tier.name }}</h3>
        <div class="price-amount">
          <span class="price-from">{{ T.pricing.from }}</span>
          <span class="price-value">{{ tier.price }}</span>
        </div>
        <p class="price-desc">{{ tier.desc }}</p>
        <ul class="price-features">
          <li v-for="f in tier.features" :key="f">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            {{ f }}
          </li>
        </ul>
        <button class="price-cta" @click="goToContact(tier.name)">{{ T.pricing.ctaPrimary }}</button>
      </div>
    </div>

    <p class="price-vat">{{ T.pricing.vatNote }}</p>

    <div class="price-calc-row">
      <a href="/calculator/index.html" target="_blank" rel="noopener" class="price-calc-link" @click="trackCalc">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>
        {{ T.pricing.ctaCalc }}
      </a>
    </div>

    <!-- Guarantee / risk-reversal -->
    <div class="guarantee-block">
      <h3 class="guarantee-title">{{ T.pricing.guaranteeTitle }}</h3>
      <div class="guarantee-grid">
        <div v-for="g in T.pricing.guarantees" :key="g.title" class="guarantee-card">
          <div class="guarantee-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/><polyline points="9 12 11 14 15 10"/></svg>
          </div>
          <h4 class="guarantee-name">{{ g.title }}</h4>
          <p class="guarantee-desc">{{ g.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'
import { trackEvent } from '../composables/useAnalytics.js'

const { locale } = useLocale()
const T = computed(() => translations[locale.value])

function goToContact(tier) {
  trackEvent('pricing_cta_click', { tier })
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

function trackCalc() {
  trackEvent('calculator_open', { source: 'pricing_section' })
}
</script>

<style scoped>
.pricing {
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.section-sub {
  max-width: 560px;
  margin: 1.2rem auto 0;
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--grey);
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;
  margin-top: 3.5rem;
  align-items: stretch;
}

.price-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: linear-gradient(145deg, rgba(13,5,32,0.9), rgba(18,10,40,0.85));
  border: 1px solid rgba(124,58,237,0.18);
  border-radius: 18px;
  padding: 2.2rem 1.8rem;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
}
.price-card:hover {
  transform: translateY(-6px);
  border-color: rgba(124,58,237,0.4);
  box-shadow: 0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(124,58,237,0.1);
}

.price-card--popular {
  border-color: rgba(124,58,237,0.5);
  box-shadow: 0 0 40px rgba(124,58,237,0.15);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-display);
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: #fff;
  background: linear-gradient(135deg, var(--purple), #ec4899);
  border-radius: 20px;
  padding: 0.35rem 1rem;
  white-space: nowrap;
}

.price-name {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 900;
  letter-spacing: 0.02em;
  color: var(--white);
  margin-bottom: 0.8rem;
}

.price-amount {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.price-from {
  font-size: 0.7rem;
  color: var(--grey);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.price-value {
  font-family: var(--font-display);
  font-size: 2.1rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--purple-light), #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.price-desc {
  font-size: 0.88rem;
  color: var(--grey);
  line-height: 1.6;
  margin-bottom: 1.4rem;
  min-height: 2.8em;
}

.price-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  flex: 1;
}
.price-features li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.85rem;
  color: var(--grey);
  line-height: 1.45;
}
.price-features svg {
  width: 14px; height: 14px;
  color: var(--purple-light);
  flex-shrink: 0;
  margin-top: 2px;
}

.price-cta {
  font-family: var(--font-display);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #fff;
  background: linear-gradient(135deg, var(--purple), #ec4899);
  border: none;
  border-radius: 10px;
  padding: 0.9rem 1.2rem;
  cursor: pointer;
  transition: opacity 0.25s, box-shadow 0.25s;
}
.price-cta:hover {
  opacity: 0.9;
  box-shadow: 0 0 22px rgba(124,58,237,0.4);
}

.price-vat {
  margin-top: 1.8rem;
  text-align: center;
  font-size: 0.78rem;
  color: var(--grey);
  opacity: 0.8;
  line-height: 1.6;
}

.price-calc-row {
  display: flex;
  justify-content: center;
  margin-top: 1.2rem;
}
.price-calc-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--purple-light);
  text-decoration: none;
  border: 1px solid rgba(124,58,237,0.3);
  border-radius: 10px;
  padding: 0.8rem 1.5rem;
  transition: border-color 0.25s, color 0.25s, background 0.25s;
}
.price-calc-link:hover {
  border-color: rgba(124,58,237,0.6);
  color: var(--white);
  background: rgba(124,58,237,0.08);
}
.price-calc-link svg { width: 16px; height: 16px; }

/* Guarantee block */
.guarantee-block {
  margin-top: 4.5rem;
  padding: 2.8rem 2rem;
  background: linear-gradient(135deg, rgba(124,58,237,0.06), rgba(236,72,153,0.03));
  border: 1px solid rgba(124,58,237,0.16);
  border-radius: 20px;
}
.guarantee-title {
  text-align: center;
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 900;
  color: var(--white);
  margin-bottom: 2rem;
}
.guarantee-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;
}
.guarantee-card {
  text-align: center;
  padding: 0 0.5rem;
}
.guarantee-icon {
  width: 44px; height: 44px;
  margin: 0 auto 1rem;
  color: var(--purple-light);
}
.guarantee-icon svg { width: 100%; height: 100%; }
.guarantee-name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.6rem;
}
.guarantee-desc {
  font-size: 0.85rem;
  color: var(--grey);
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 900px) {
  .pricing-grid { grid-template-columns: 1fr; gap: 1.4rem; max-width: 420px; margin-left: auto; margin-right: auto; }
  .price-desc { min-height: 0; }
  .guarantee-grid { grid-template-columns: 1fr; gap: 2rem; }
}

@media (max-width: 480px) {
  .price-card { padding: 1.8rem 1.4rem; }
  .guarantee-block { padding: 2rem 1.2rem; border-radius: 14px; }
}
</style>
