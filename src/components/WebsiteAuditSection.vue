<template>
  <section id="audit" class="audit">
    <div class="audit-card">
      <div class="audit-glow"></div>

      <!-- Left: pitch -->
      <div class="audit-info">
        <p class="section-tag">{{ T.audit.tag }}</p>
        <h2 class="audit-title">
          {{ T.audit.title }}&nbsp;<span class="gradient-text">{{ T.audit.titleHighlight }}</span>
        </h2>
        <p class="audit-sub">{{ T.audit.sub }}</p>
        <ul class="audit-points">
          <li v-for="p in T.audit.points" :key="p">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            {{ p }}
          </li>
        </ul>
      </div>

      <!-- Right: form -->
      <form class="audit-form" @submit.prevent="handleSubmit" novalidate>
        <div class="field">
          <label for="audit-name">{{ T.audit.fieldName }}</label>
          <input
            id="audit-name"
            v-model="form.name"
            type="text"
            :placeholder="T.audit.placeholderName"
            :aria-invalid="!!errors.name"
            :class="{ 'has-error': errors.name }"
          />
          <span v-if="errors.name" class="field-err">{{ errors.name }}</span>
        </div>

        <div class="field">
          <label for="audit-email">{{ T.audit.fieldEmail }}</label>
          <input
            id="audit-email"
            v-model="form.email"
            type="email"
            :placeholder="T.audit.placeholderEmail"
            :aria-invalid="!!errors.email"
            :class="{ 'has-error': errors.email }"
          />
          <span v-if="errors.email" class="field-err">{{ errors.email }}</span>
        </div>

        <div class="field">
          <label for="audit-url">{{ T.audit.fieldUrl }}</label>
          <input
            id="audit-url"
            v-model="form.url"
            type="text"
            :placeholder="T.audit.placeholderUrl"
            :aria-invalid="!!errors.url"
            :class="{ 'has-error': errors.url }"
          />
          <span v-if="errors.url" class="field-err">{{ errors.url }}</span>
        </div>

        <button type="submit" class="audit-submit" :disabled="sending">
          {{ sending ? T.audit.sending : T.audit.submit }}
        </button>

        <p class="audit-reassure">{{ T.audit.reassure }}</p>

        <Transition name="fade">
          <p v-if="showSuccess" class="audit-success" role="status">{{ T.audit.success }}</p>
        </Transition>
        <Transition name="fade">
          <p v-if="showError" class="audit-error" role="alert">{{ T.audit.error }}</p>
        </Transition>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import emailjs from '@emailjs/browser'
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'
import { trackEvent } from '../composables/useAnalytics.js'

const { locale } = useLocale()
const T = computed(() => translations[locale.value])

const EMAILJS_SERVICE  = 'service_0r0sbat'
const EMAILJS_TEMPLATE = 'template_m4tj936'
const EMAILJS_PUBLIC   = '5IV9BGZVQGxRwS3ZF'

const form = reactive({ name: '', email: '', url: '' })
const errors = reactive({ name: '', email: '', url: '' })
const sending = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

function validate() {
  errors.name = errors.email = errors.url = ''
  let valid = true
  if (!form.name.trim()) { errors.name = T.value.audit.errName; valid = false }
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { errors.email = T.value.audit.errEmail; valid = false }
  if (!form.url.trim()) { errors.url = T.value.audit.errUrl; valid = false }
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
      subject:    'Gratis website-analyse aanvraag',
      message:    `Website-audit aanvraag voor: ${form.url}`,
    }, EMAILJS_PUBLIC)

    trackEvent('audit_request', {})
    form.name = form.email = form.url = ''
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

<style scoped>
.audit {
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.audit-card {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: center;
  background: linear-gradient(135deg, rgba(124,58,237,0.08), rgba(236,72,153,0.04));
  border: 1px solid rgba(124,58,237,0.2);
  border-radius: 22px;
  padding: 3.2rem;
  overflow: hidden;
}
.audit-glow {
  position: absolute;
  top: -80px; right: -80px;
  width: 260px; height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%);
  pointer-events: none;
}

/* Left */
.audit-info { position: relative; z-index: 1; }
.audit-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  font-weight: 900;
  letter-spacing: -0.01em;
  color: var(--white);
  line-height: 1.15;
  margin: 0.8rem 0 1.1rem;
}
.audit-sub {
  font-size: 0.92rem;
  color: var(--grey);
  line-height: 1.7;
  margin-bottom: 1.6rem;
}
.audit-points {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.audit-points li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  color: var(--grey);
}
.audit-points svg {
  width: 15px; height: 15px;
  color: var(--purple-light);
  flex-shrink: 0;
}

/* Right form */
.audit-form {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}
.field { display: flex; flex-direction: column; gap: 0.4rem; }
.field label {
  font-family: var(--font-display);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--grey);
  text-transform: uppercase;
}
.field input {
  font-family: var(--font-body, inherit);
  font-size: 0.9rem;
  color: var(--white);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  padding: 0.8rem 1rem;
  transition: border-color 0.2s, background 0.2s;
}
.field input::placeholder { color: rgba(255,255,255,0.3); }
.field input:focus {
  outline: none;
  border-color: rgba(124,58,237,0.6);
  background: rgba(124,58,237,0.06);
}
.field input.has-error { border-color: #ef4444; }
.field-err { font-size: 0.72rem; color: #f87171; }

.audit-submit {
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #fff;
  background: linear-gradient(135deg, var(--purple), #ec4899);
  border: none;
  border-radius: 10px;
  padding: 0.95rem 1.4rem;
  cursor: pointer;
  margin-top: 0.4rem;
  transition: opacity 0.25s, box-shadow 0.25s;
}
.audit-submit:hover:not(:disabled) {
  opacity: 0.9;
  box-shadow: 0 0 22px rgba(124,58,237,0.4);
}
.audit-submit:disabled { opacity: 0.6; cursor: default; }

.audit-reassure {
  font-size: 0.74rem;
  color: var(--grey);
  opacity: 0.8;
  text-align: center;
}
.audit-success, .audit-error {
  font-size: 0.84rem;
  text-align: center;
  padding: 0.7rem 1rem;
  border-radius: 10px;
}
.audit-success {
  color: #4ade80;
  background: rgba(74,222,128,0.1);
  border: 1px solid rgba(74,222,128,0.3);
}
.audit-error {
  color: #f87171;
  background: rgba(248,113,113,0.1);
  border: 1px solid rgba(248,113,113,0.3);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 900px) {
  .audit-card { grid-template-columns: 1fr; gap: 2.2rem; padding: 2.2rem; }
}
@media (max-width: 480px) {
  .audit-card { padding: 1.6rem; border-radius: 16px; }
}
</style>
