<template>
  <section id="contact" class="contact">
    <div class="contact-inner">
      <div class="contact-left">
        <p class="section-tag">{{ T.contact.tag }}</p>
        <h2 class="section-title">{{ T.contact.titleLine1 }}<br /><span class="gradient-text">{{ T.contact.titleLine2 }}</span><br />{{ T.contact.titleLine3 }}</h2>
        <p class="contact-sub">{{ T.contact.sub }}</p>

        <div class="contact-details">
          <a href="mailto:daenenbrent@gmail.com" class="contact-item">
            <span class="ci-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </span>
            <span class="ci-body">
              <span class="ci-label">{{ T.contact.labelEmail }}</span>
              <span class="ci-value">daenenbrent@gmail.com</span>
            </span>
          </a>
          <a href="tel:+32472196739" class="contact-item">
            <span class="ci-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </span>
            <span class="ci-body">
              <span class="ci-label">{{ T.contact.labelPhone }}</span>
              <span class="ci-value">+324 72 19 67 39</span>
            </span>
          </a>
          <div class="contact-item">
            <span class="ci-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <span class="ci-body">
              <span class="ci-label">{{ T.contact.labelLocation }}</span>
              <span class="ci-value">{{ T.contact.location }}</span>
            </span>
          </div>
        </div>

        <div class="contact-badge">
          <span class="badge-dot"></span>
          {{ T.contact.available }}
        </div>

        <a
          href="https://calendly.com/d/cyvn-84w-3v7"
          target="_blank"
          rel="noopener"
          class="book-call-btn"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span class="book-call-text">
            <span class="book-call-main">{{ T.contact.bookCall }}</span>
            <span class="book-call-sub">{{ T.contact.bookCallSub }}</span>
          </span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="book-call-arrow">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
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
              {{ T.contact.fieldName }}
            </label>
            <div class="input-wrap">
              <input type="text" id="name" v-model="form.name" :placeholder="T.contact.placeholderName" autocomplete="name" />
            </div>
            <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
          </div>
          <div class="form-group" :class="{ 'has-error': errors.email }">
            <label for="email">
              <span class="field-step">02</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              {{ T.contact.fieldEmail }}
            </label>
            <div class="input-wrap">
              <input type="email" id="email" v-model="form.email" :placeholder="T.contact.placeholderEmail" autocomplete="email" />
            </div>
            <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
          </div>
        </div>

        <div class="form-group">
          <label for="subject">
            <span class="field-step">03</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            {{ T.contact.fieldProject }}
          </label>
          <div class="custom-select" :class="{ open: selectOpen }" v-click-outside="closeSelect">
            <button type="button" class="custom-select-trigger" @click="selectOpen = !selectOpen">
              <span :class="{ placeholder: !form.subject }">
                {{ form.subject ? T.contact.selectOptions.find(o => o.value === form.subject)?.label : T.contact.selectPlaceholder }}
              </span>
              <svg class="select-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <Transition name="dropdown">
              <ul v-if="selectOpen" class="custom-select-list">
                <li
                  v-for="opt in T.contact.selectOptions"
                  :key="opt.value"
                  class="custom-select-item"
                  :class="{ active: form.subject === opt.value }"
                  @click="pickOption(opt.value)"
                >
                  <svg v-if="form.subject === opt.value" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                  <span v-else class="item-dot"></span>
                  {{ opt.label }}
                </li>
              </ul>
            </Transition>
          </div>
        </div>

        <!-- Budget Calculator -->
        <div class="budget-calc">
          <button type="button" class="budget-toggle" @click="showCalc = !showCalc">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            {{ T.contact.calcToggle }}
            <svg class="chevron" :class="{ open: showCalc }" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>

          <div class="budget-panel" :class="{ open: showCalc }">
            <div class="budget-services">
              <div
                v-for="(svc, i) in calcServices"
                :key="i"
                class="budget-svc"
                :class="{ active: svc.state.enabled }"
              >
                <!-- Top row: icon + name + price + toggle -->
                <div class="bsvc-top">
                  <div class="bsvc-icon" v-html="svc.icon"></div>
                  <span class="bsvc-name">{{ svc.name }}</span>
                  <span class="bsvc-price" :class="{ enabled: svc.state.enabled }">
                    {{ svc.state.enabled ? svc.options.find(o => o.id === svc.state.selected)?.price : svc.range }}
                  </span>
                  <label class="bsvc-toggle" @click.stop>
                    <input type="checkbox" v-model="svc.state.enabled" />
                    <span class="bsvc-track"></span>
                    <span class="bsvc-thumb"></span>
                  </label>
                </div>
                <!-- Sub-options -->
                <div class="bsvc-opts" v-if="svc.state.enabled" @click.stop>
                  <button
                    v-for="opt in svc.options"
                    :key="opt.id"
                    type="button"
                    class="bsvc-opt"
                    :class="{ active: svc.state.selected === opt.id }"
                    @click.stop="svc.state.selected = opt.id"
                  >{{ opt.name }}</button>
                </div>
              </div>
            </div>

            <div class="budget-result">
              <div class="budget-result-left">
                <span class="budget-label">{{ T.contact.calcEstimate }}</span>
                <span class="budget-total">{{ calcTotal }}</span>
              </div>
              <button type="button" class="budget-apply" @click="applyCalc" v-if="calcHasSelection">
                {{ T.contact.calcApply }}
              </button>
            </div>
          </div>
        </div>

        <div class="form-group" :class="{ 'has-error': errors.message }">
          <label for="message">
            <span class="field-step">04</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            {{ T.contact.fieldMessage }}
          </label>
          <div class="input-wrap">
            <textarea id="message" v-model="form.message" rows="5" :placeholder="messagePlaceholder"></textarea>
          </div>
          <span v-if="errors.message" class="field-error">{{ errors.message }}</span>
        </div>

        <button type="submit" class="contact-submit" :disabled="sending">
          <span class="submit-bg"></span>
          <span class="submit-content">
            <svg v-if="!sending" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            {{ sending ? T.contact.submitSending : T.contact.submitButton }}
          </span>
        </button>

        <Transition name="fade">
          <div v-if="showSuccess" class="form-success">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            {{ T.contact.successMsg }}
          </div>
        </Transition>
        <Transition name="fade">
          <div v-if="showError" class="form-error-msg">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {{ T.contact.errorMsg }}
          </div>
        </Transition>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import emailjs from '@emailjs/browser'
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'

// v-click-outside directive
const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (e) => { if (!el.contains(e.target)) binding.value() }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside)
  },
}

const { locale } = useLocale()
const T = computed(() => translations[locale.value])

const EMAILJS_SERVICE  = 'service_0r0sbat'
const EMAILJS_TEMPLATE = 'template_m4tj936'
const EMAILJS_PUBLIC   = '5IV9BGZVQGxRwS3ZF'

const form = reactive({ name: '', email: '', subject: '', message: '' })
const errors = reactive({ name: '', email: '', message: '' })
const sending = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

// Custom select
const selectOpen = ref(false)
function closeSelect() { selectOpen.value = false }
function pickOption(val) { form.subject = val; selectOpen.value = false }

// ── Budget Calculator ──
const showCalc = ref(false)

const calcIcons = [
  `<svg viewBox="0 0 48 48" fill="none"><rect x="4" y="8" width="40" height="32" rx="3" stroke="currentColor" stroke-width="2"/><path d="M14 20L20 26L14 32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M22 32H34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none"><path d="M24 6L42 16V32L24 42L6 32V16L24 6Z" stroke="currentColor" stroke-width="2"/><path d="M24 6V42M6 16L42 32M42 16L6 32" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none"><path d="M24 10C16.268 10 10 16.268 10 24C10 31.732 16.268 38 24 38" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 24H38" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M30 15L38 12L35 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="20" width="12" height="18" rx="1" stroke="currentColor" stroke-width="2"/><rect x="18" y="12" width="12" height="26" rx="1" stroke="currentColor" stroke-width="2"/><rect x="28" y="6" width="12" height="32" rx="1" stroke="currentColor" stroke-width="2"/></svg>`,
]

const calcServiceDefs = computed(() => [
  {
    name: T.value.contact.calcServices[0],
    icon: calcIcons[0],
    range: '€199 – €999',
    options: [
      { id: 'basic',     name: T.value.contact.calcOpts[0][0], price: '€199 – €349' },
      { id: 'advanced',  name: T.value.contact.calcOpts[0][1], price: '€399 – €699' },
      { id: 'ecommerce', name: T.value.contact.calcOpts[0][2], price: '€599 – €999' },
    ],
  },
  {
    name: T.value.contact.calcServices[1],
    icon: calcIcons[1],
    range: '€299 – €1,500',
    options: [
      { id: 'small',      name: T.value.contact.calcOpts[1][0], price: '€299 – €599' },
      { id: 'medium',     name: T.value.contact.calcOpts[1][1], price: '€599 – €999' },
      { id: 'enterprise', name: T.value.contact.calcOpts[1][2], price: '€999 – €1,500+' },
    ],
  },
  {
    name: T.value.contact.calcServices[2],
    icon: calcIcons[2],
    range: '€49 – €249/mo',
    options: [
      { id: 'starter', name: T.value.contact.calcOpts[2][0], price: '€49 – €99/mo' },
      { id: 'pro',     name: T.value.contact.calcOpts[2][1], price: '€99 – €179/mo' },
      { id: 'growth',  name: T.value.contact.calcOpts[2][2], price: '€149 – €249/mo' },
    ],
  },
  {
    name: T.value.contact.calcServices[3],
    icon: calcIcons[3],
    range: '€199 – €899',
    options: [
      { id: 'dashboard', name: T.value.contact.calcOpts[3][0], price: '€199 – €449' },
      { id: 'aiapp',     name: T.value.contact.calcOpts[3][1], price: '€449 – €899' },
    ],
  },
])

const calcStates = reactive([
  { enabled: false, selected: 'basic' },
  { enabled: false, selected: 'small' },
  { enabled: false, selected: 'starter' },
  { enabled: false, selected: 'dashboard' },
])

const calcServices = computed(() =>
  calcServiceDefs.value.map((def, i) => ({ ...def, state: calcStates[i] }))
)

const calcHasSelection = computed(() => calcStates.some(s => s.enabled))

function parsePriceRange(str) {
  const nums = str.replace(/[€+,]/g, '').match(/[\d.]+/g) || ['0']
  return [parseFloat(nums[0]) || 0, parseFloat(nums[1] || nums[0]) || 0]
}
function fmtK(n) {
  return n >= 1000 ? `€${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `€${n}`
}

const calcTotal = computed(() => {
  if (!calcHasSelection.value) return '€0'
  let lo = 0, hi = 0
  calcServices.value.forEach(svc => {
    if (!svc.state.enabled) return
    const opt = svc.options.find(o => o.id === svc.state.selected) || svc.options[0]
    const [a, b] = parsePriceRange(opt.price)
    lo += a; hi += b
  })
  return `${fmtK(lo)} – ${fmtK(hi)}`
})

function applyCalc() {
  const lines = calcServices.value
    .map(svc => {
      if (!svc.state.enabled) return null
      const opt = svc.options.find(o => o.id === svc.state.selected) || svc.options[0]
      return `• ${svc.name} (${opt.name}): ${opt.price}`
    })
    .filter(Boolean)
  form.message = `${T.value.contact.calcApplyNote}\n${lines.join('\n')}\n${T.value.contact.calcTotal}: ${calcTotal.value}\n\n`
  showCalc.value = false
}

const messagePlaceholder = computed(() =>
  form.subject === 'apply'
    ? T.value.contact.placeholderApply
    : T.value.contact.placeholderMessage
)

onMounted(() => {
  window.addEventListener('ngc:apply', () => {
    form.subject = 'apply'
  })
})

function validate() {
  errors.name = errors.email = errors.message = ''
  let valid = true
  if (!form.name.trim())  { errors.name = T.value.contact.errName; valid = false }
  if (!form.email.trim()) { errors.email = T.value.contact.errEmail; valid = false }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { errors.email = T.value.contact.errEmailInvalid; valid = false }
  if (!form.message.trim()) { errors.message = T.value.contact.errMessage; valid = false }
  return valid
}

async function handleSubmit() {
  if (!validate() || sending.value) return
  sending.value = true
  showError.value = false

  const subjectLabel = T.value.contact.selectOptions.find(o => o.value === form.subject)?.label || form.subject || 'Geen dienst geselecteerd'

  try {
    await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
      from_name:  form.name,
      from_email: form.email,
      email:      form.email,
      to_email:   'daenenbrent@gmail.com',
      reply_to:   form.email,
      subject:    subjectLabel,
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

<style scoped>
/* ── Custom Select ── */
.custom-select {
  position: relative;
  z-index: 10;
}

.custom-select-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(124,58,237,0.22);
  border-radius: 8px;
  color: var(--white);
  font-family: var(--font-body);
  font-size: 0.95rem;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.custom-select-trigger:hover,
.custom-select.open .custom-select-trigger {
  border-color: rgba(124,58,237,0.55);
  box-shadow: 0 0 0 3px rgba(124,58,237,0.08);
}

.custom-select-trigger .placeholder { color: rgba(148,163,184,0.55); }

.select-chevron {
  flex-shrink: 0;
  color: rgba(124,58,237,0.6);
  transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
}
.custom-select.open .select-chevron { transform: rotate(180deg); }

.custom-select-list {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: #0f0f22;
  border: 1px solid rgba(124,58,237,0.3);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 30px rgba(124,58,237,0.1);
  list-style: none;
  padding: 4px;
}

.custom-select-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 0.9rem;
  font-size: 0.92rem;
  color: var(--grey);
  cursor: pointer;
  border-radius: 7px;
  transition: background 0.15s, color 0.15s;
}
.custom-select-item:hover {
  background: rgba(124,58,237,0.12);
  color: var(--white);
}
.custom-select-item.active {
  background: rgba(124,58,237,0.15);
  color: var(--purple-light);
}
.item-dot {
  width: 11px;
  height: 11px;
  flex-shrink: 0;
}

/* Dropdown animation */
.dropdown-enter-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.dropdown-leave-active { transition: opacity 0.14s ease, transform 0.14s ease; }
.dropdown-enter-from  { opacity: 0; transform: translateY(-6px); }
.dropdown-leave-to    { opacity: 0; transform: translateY(-4px); }

/* ── Book a call ── */
.book-call-btn {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-top: 1.5rem;
  padding: 1rem 1.2rem;
  background: linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.05));
  border: 1px solid rgba(124,58,237,0.28);
  border-radius: 12px;
  color: var(--white);
  text-decoration: none;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}
.book-call-btn:hover {
  border-color: rgba(124,58,237,0.55);
  box-shadow: 0 0 28px rgba(124,58,237,0.18);
  transform: translateY(-2px);
}
.book-call-btn > svg:first-child {
  flex-shrink: 0;
  color: var(--purple-light);
}
.book-call-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.book-call-main {
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--purple-light);
}
.book-call-sub {
  font-size: 0.75rem;
  color: var(--grey);
  letter-spacing: 0.02em;
}
.book-call-arrow {
  flex-shrink: 0;
  color: rgba(124,58,237,0.5);
  transition: transform 0.2s, color 0.2s;
}
.book-call-btn:hover .book-call-arrow {
  transform: translateX(3px);
  color: var(--purple-light);
}

/* ── Budget Calculator ── */
.budget-calc { margin-bottom: 1.2rem; }

.budget-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(124,58,237,0.07);
  border: 1px solid rgba(124,58,237,0.28);
  border-radius: 8px;
  color: var(--purple-light);
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.budget-toggle:hover {
  background: rgba(124,58,237,0.14);
  border-color: var(--purple-light);
  box-shadow: 0 0 16px rgba(124,58,237,0.15);
}
.budget-toggle .chevron { transition: transform 0.25s ease; }
.budget-toggle .chevron.open { transform: rotate(180deg); }

/* Panel */
.budget-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1);
}
.budget-panel.open { max-height: 700px; }

.budget-services {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 12px;
}

/* Service row */
.budget-svc {
  border: 1px solid rgba(124,58,237,0.14);
  border-radius: 10px;
  background: rgba(255,255,255,0.018);
  overflow: hidden;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
}
.budget-svc.active {
  border-color: rgba(124,58,237,0.38);
  background: rgba(124,58,237,0.05);
  box-shadow: 0 0 20px rgba(124,58,237,0.06);
}

.bsvc-top {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  cursor: pointer;
}

/* Icon */
.bsvc-icon {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(124,58,237,0.25), rgba(192,132,252,0.1));
  border: 1px solid rgba(124,58,237,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--purple-light);
  padding: 6px;
}
.bsvc-icon svg { width: 100%; height: 100%; }
.budget-svc.active .bsvc-icon {
  background: linear-gradient(135deg, rgba(124,58,237,0.4), rgba(236,72,153,0.2));
  border-color: rgba(124,58,237,0.4);
}

/* Name */
.bsvc-name {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--grey-mid);
  flex: 1;
  letter-spacing: 0.02em;
}
.budget-svc.active .bsvc-name { color: var(--white); }

/* Price badge */
.bsvc-price {
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--grey-dim);
  white-space: nowrap;
  transition: color 0.2s;
}
.bsvc-price.enabled {
  background: linear-gradient(90deg, var(--purple-light), #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Mini toggle */
.bsvc-toggle {
  position: relative;
  width: 34px;
  height: 20px;
  flex-shrink: 0;
  cursor: pointer;
}
.bsvc-toggle input { display: none; }
.bsvc-track {
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(124,58,237,0.25);
  border-radius: 10px;
  transition: background 0.2s, border-color 0.2s;
}
.bsvc-toggle input:checked + .bsvc-track {
  background: linear-gradient(135deg, var(--purple), #ec4899);
  border-color: transparent;
}
.bsvc-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.22s cubic-bezier(.34,1.56,.64,1);
  pointer-events: none;
}
.bsvc-toggle input:checked ~ .bsvc-thumb { transform: translateX(14px); }

/* Sub-options */
.bsvc-opts {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 0 12px 10px;
}

.bsvc-opt {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(124,58,237,0.18);
  border-radius: 6px;
  color: var(--grey-dim);
  font-family: var(--font-display);
  font-size: 0.54rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  padding: 0.28rem 0.7rem;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.bsvc-opt:hover {
  border-color: rgba(124,58,237,0.45);
  color: var(--grey-light);
  background: rgba(124,58,237,0.08);
}
.bsvc-opt.active {
  background: linear-gradient(135deg, rgba(124,58,237,0.25), rgba(236,72,153,0.12));
  border-color: var(--purple-light);
  color: var(--purple-light);
}

/* Result bar */
.budget-result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.05));
  border: 1px solid rgba(124,58,237,0.25);
  border-radius: 10px;
}

.budget-result-left {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.budget-label {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--grey-dim);
}

.budget-total {
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, var(--purple-light), #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.budget-apply {
  background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.2));
  border: 1px solid rgba(124,58,237,0.4);
  border-radius: 6px;
  color: var(--purple-light);
  font-family: var(--font-display);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  padding: 0.4rem 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.budget-apply:hover {
  background: linear-gradient(135deg, rgba(124,58,237,0.45), rgba(236,72,153,0.3));
  border-color: var(--purple-light);
  color: #fff;
  box-shadow: 0 0 14px rgba(124,58,237,0.25);
}
</style>
