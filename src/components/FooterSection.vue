<template>
  <footer class="footer">
    <div class="footer-inner">
      <a href="#home" class="footer-logo" @click.prevent="scrollTop">
        <img :src="baseUrl + 'NGC.png'" alt="Next Gen Codes" class="footer-logo-img" />
      </a>
      <p class="footer-copy">{{ T.footer.copy }}</p>

      <form class="footer-newsletter" @submit.prevent="subscribe" novalidate>
        <p class="nl-title">{{ T.newsletter.title }}</p>
        <p class="nl-sub">{{ T.newsletter.sub }}</p>
        <div class="nl-row">
          <input
            v-model="nlEmail"
            type="email"
            :placeholder="T.newsletter.placeholder"
            :aria-label="T.newsletter.placeholder"
            class="nl-input"
            :class="{ 'has-error': nlError }"
          />
          <button type="submit" class="nl-submit" :disabled="nlSending">{{ T.newsletter.submit }}</button>
        </div>
        <input type="text" v-model="honeypot" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <Transition name="fade">
          <p v-if="nlMsg" class="nl-msg" :class="nlMsgType" role="status">{{ nlMsg }}</p>
        </Transition>
      </form>

      <nav class="footer-links">
        <a href="/diensten/website-laten-maken-genk" rel="noopener">{{ T.footer.linkGenk }}</a>
        <a href="/diensten/webshop-laten-maken" rel="noopener">{{ T.footer.linkWebshop }}</a>
        <a href="/blog/hoeveel-kost-website-belgie" target="_blank" rel="noopener">{{ T.footer.blog }}</a>
        <a href="#" data-privacy @click.prevent="showPrivacy = true">{{ T.footer.privacy }}</a>
        <a href="#" @click.prevent="showTerms = true">{{ T.footer.terms }}</a>
        <a href="https://www.linkedin.com/in/brent-d-9a4908331/" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://www.instagram.com/brentx04/" target="_blank" rel="noopener">Instagram</a>
      </nav>
    </div>
    <div class="footer-line"></div>
  </footer>

  <Transition name="fade">
    <div v-if="showPrivacy" class="terms-backdrop" @click.self="showPrivacy = false">
      <div class="terms-modal terms-modal--tall">
        <div class="terms-header">
          <p class="section-tag" style="margin:0">{{ T.footer.privacyTag }}</p>
          <button class="terms-close" @click="showPrivacy = false" aria-label="Sluiten">✕</button>
        </div>
        <div class="terms-body terms-scroll">
          <p class="terms-date">{{ T.footer.privacyDate }}</p>

          <template v-for="(section, i) in T.footer.privacySections" :key="i">
            <h3>{{ section.title }}</h3>
            <p v-if="section.text" v-html="section.text"></p>
            <template v-if="section.intro">
              <p>{{ section.intro }}</p>
              <ul>
                <li v-for="item in section.items" :key="item">{{ item }}</li>
              </ul>
            </template>
          </template>

          <p class="terms-note" v-html="T.footer.privacyNote"></p>
        </div>
      </div>
    </div>
  </Transition>

  <Transition name="fade">
    <div v-if="showTerms" class="terms-backdrop" @click.self="showTerms = false">
      <div class="terms-modal">
        <div class="terms-header">
          <p class="section-tag" style="margin:0">{{ T.footer.termsTag }}</p>
          <button class="terms-close" @click="showTerms = false" aria-label="Sluiten">✕</button>
        </div>
        <div class="terms-body">
          <h3>{{ T.footer.termsTitle }}</h3>
          <p v-html="T.footer.termsP1"></p>
          <p v-html="T.footer.termsP2"></p>
          <p v-html="T.footer.termsP3"></p>
          <p class="terms-note" v-html="T.footer.termsNote"></p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import emailjs from '@emailjs/browser'
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'
import { trackEvent } from '../composables/useAnalytics.js'
import { useSpamGuard } from '../composables/useSpamGuard.js'

const baseUrl = import.meta.env.BASE_URL
const { locale } = useLocale()
const T = computed(() => translations[locale.value])
const { honeypot, isBot } = useSpamGuard()

const showPrivacy = ref(false)
const showTerms = ref(false)

const EMAILJS_SERVICE  = 'service_0r0sbat'
const EMAILJS_TEMPLATE = 'template_m4tj936'
const EMAILJS_PUBLIC   = '5IV9BGZVQGxRwS3ZF'

const nlEmail = ref('')
const nlSending = ref(false)
const nlError = ref(false)
const nlMsg = ref('')
const nlMsgType = ref('nl-msg--ok')

async function subscribe() {
  if (nlSending.value) return
  if (isBot()) { nlEmail.value = ''; nlMsg.value = T.value.newsletter.success; nlMsgType.value = 'nl-msg--ok'; setTimeout(() => { nlMsg.value = '' }, 6000); return }
  const email = nlEmail.value.trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    nlError.value = true
    nlMsg.value = T.value.newsletter.invalid
    nlMsgType.value = 'nl-msg--err'
    return
  }
  nlError.value = false
  nlSending.value = true
  try {
    await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
      from_name:  'Newsletter signup',
      from_email: email,
      email,
      to_email:   'daenenbrent@gmail.com',
      reply_to:   email,
      subject:    'Nieuwsbrief inschrijving',
      message:    `Nieuwe nieuwsbrief inschrijving: ${email}`,
    }, EMAILJS_PUBLIC)
    trackEvent('newsletter_signup', {})
    nlEmail.value = ''
    nlMsg.value = T.value.newsletter.success
    nlMsgType.value = 'nl-msg--ok'
  } catch (err) {
    console.error('EmailJS error:', err)
    nlMsg.value = T.value.newsletter.error
    nlMsgType.value = 'nl-msg--err'
  } finally {
    nlSending.value = false
    setTimeout(() => { nlMsg.value = '' }, 6000)
  }
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.footer-newsletter {
  width: 100%;
  max-width: 440px;
  margin: 2rem auto 1.8rem;
  text-align: center;
}
.nl-title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.3rem;
}
.nl-sub {
  font-size: 0.8rem;
  color: var(--grey);
  line-height: 1.5;
  margin-bottom: 1rem;
}
.nl-row {
  display: flex;
  gap: 0.5rem;
}
.nl-input {
  flex: 1;
  min-width: 0;
  font-size: 0.88rem;
  color: var(--white);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  padding: 0.7rem 0.9rem;
  transition: border-color 0.2s;
}
.nl-input::placeholder { color: rgba(255,255,255,0.3); }
.nl-input:focus { outline: none; border-color: rgba(124,58,237,0.6); }
.nl-input.has-error { border-color: #ef4444; }
.nl-submit {
  font-family: var(--font-display);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #fff;
  background: linear-gradient(135deg, var(--purple), #ec4899);
  border: none;
  border-radius: 10px;
  padding: 0.7rem 1.2rem;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s, box-shadow 0.2s;
}
.nl-submit:hover:not(:disabled) { opacity: 0.9; box-shadow: 0 0 18px rgba(124,58,237,0.4); }
.nl-submit:disabled { opacity: 0.6; cursor: default; }
.nl-msg {
  font-size: 0.78rem;
  margin-top: 0.7rem;
}
.nl-msg--ok { color: #4ade80; }
.nl-msg--err { color: #f87171; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 480px) {
  .nl-row { flex-direction: column; }
  .nl-submit { padding: 0.75rem; }
}
</style>
