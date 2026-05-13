<template>
  <section id="contact" class="contact">
    <div class="contact-inner">
      <div class="contact-left">
        <p class="section-tag">// NEEM CONTACT OP</p>
        <h2 class="section-title">LATEN WE SAMEN<br /><span class="gradient-text">IETS BOUWEN</span><br />DAT OPVALT</h2>
        <p class="contact-sub">Klaar om uw digitale aanwezigheid te transformeren? Vertel ons over uw project en wij zorgen voor de rest.</p>

        <div class="contact-details">
          <a href="mailto:daenenbrent@gmail.com" class="contact-item">
            <span class="ci-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </span>
            <span class="ci-body">
              <span class="ci-label">E-MAIL</span>
              <span class="ci-value">daenenbrent@gmail.com</span>
            </span>
          </a>
          <a href="tel:+32472196739" class="contact-item">
            <span class="ci-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </span>
            <span class="ci-body">
              <span class="ci-label">TELEFOON</span>
              <span class="ci-value">+324 72 19 67 39</span>
            </span>
          </a>
          <div class="contact-item">
            <span class="ci-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <span class="ci-body">
              <span class="ci-label">LOCATIE</span>
              <span class="ci-value">Genk, België</span>
            </span>
          </div>
        </div>

        <div class="contact-badge">
          <span class="badge-dot"></span>
          BESCHIKBAAR VOOR NIEUWE PROJECTEN
        </div>
      </div>

      <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
        <div class="form-scan-line"></div>
        <div class="form-corner form-corner--tl"></div>
        <div class="form-corner form-corner--br"></div>

        <div class="form-row">
          <div class="form-group" :class="{ 'has-error': errors.name }">
            <label for="name">
              <span class="field-step">01</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              UW NAAM
            </label>
            <div class="input-wrap">
              <input type="text" id="name" v-model="form.name" placeholder="Jan Janssen" autocomplete="name" />
            </div>
            <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
          </div>
          <div class="form-group" :class="{ 'has-error': errors.email }">
            <label for="email">
              <span class="field-step">02</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              E-MAILADRES
            </label>
            <div class="input-wrap">
              <input type="email" id="email" v-model="form.email" placeholder="jan@bedrijf.be" autocomplete="email" />
            </div>
            <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
          </div>
        </div>

        <div class="form-group">
          <label for="subject">
            <span class="field-step">03</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            SOORT PROJECT
          </label>
          <div class="input-wrap select-wrap">
            <select id="subject" v-model="form.subject">
              <option value="">Selecteer een dienst...</option>
              <option>Webontwikkeling</option>
              <option>UI/UX Design</option>
              <option>Digitale Strategie</option>
              <option>Maatwerk Applicatie</option>
              <option>SEO &amp; Groei</option>
              <option>Analytics &amp; AI</option>
            </select>
            <svg class="select-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>

        <div class="form-group" :class="{ 'has-error': errors.message }">
          <label for="message">
            <span class="field-step">04</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            UW BERICHT
          </label>
          <div class="input-wrap">
            <textarea id="message" v-model="form.message" rows="5" placeholder="Vertel ons over uw project, uw doelen en budget..."></textarea>
          </div>
          <span v-if="errors.message" class="field-error">{{ errors.message }}</span>
        </div>

        <button type="submit" class="contact-submit" :disabled="sending">
          <span class="submit-bg"></span>
          <span class="submit-content">
            <svg v-if="!sending" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            {{ sending ? 'VERSTUREN…' : 'BERICHT VERSTUREN' }}
          </span>
        </button>

        <Transition name="fade">
          <div v-if="showSuccess" class="form-success">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Bericht ontvangen — we nemen binnen 24u contact op!
          </div>
        </Transition>
        <Transition name="fade">
          <div v-if="showError" class="form-error-msg">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Versturen mislukt. Probeer opnieuw of mail ons direct.
          </div>
        </Transition>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import emailjs from '@emailjs/browser'

// ── EmailJS config ──────────────────────────────
// 1. Ga naar https://www.emailjs.com en maak een gratis account
// 2. Voeg een Gmail service toe → kopieer de Service ID
// 3. Maak een template met variabelen: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Kopieer de Template ID en Public Key
const EMAILJS_SERVICE  = 'service_0r0sbat'
const EMAILJS_TEMPLATE = 'template_m4tj936'
const EMAILJS_PUBLIC   = '5IV9BGZVQGxRwS3ZF'
// ───────────────────────────────────────────────

const form = reactive({ name: '', email: '', subject: '', message: '' })
const errors = reactive({ name: '', email: '', message: '' })
const sending = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

function validate() {
  errors.name = errors.email = errors.message = ''
  let valid = true
  if (!form.name.trim())  { errors.name = 'Naam is verplicht.'; valid = false }
  if (!form.email.trim()) { errors.email = 'E-mailadres is verplicht.'; valid = false }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { errors.email = 'Ongeldig e-mailadres.'; valid = false }
  if (!form.message.trim()) { errors.message = 'Bericht is verplicht.'; valid = false }
  return valid
}

async function handleSubmit() {
  if (!validate() || sending.value) return
  sending.value = true
  showError.value = false

  try {
    await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
      from_name:  form.name,
      from_email: form.email,
      email:      form.email,
      to_email:   'daenenbrent@gmail.com',
      reply_to:   form.email,
      subject:    form.subject || 'Geen dienst geselecteerd',
      message:    form.message,
    }, EMAILJS_PUBLIC)

    form.name = form.email = form.subject = form.message = ''
    showSuccess.value = true
    setTimeout(() => { showSuccess.value = false }, 6000)
  } catch (err) {
    console.error('EmailJS error:', err)
    showError.value = true
    setTimeout(() => { showError.value = false }, 6000)
  } finally {
    sending.value = false
  }
}
</script>
