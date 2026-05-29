<template>
  <footer class="footer">
    <div class="footer-inner">
      <a href="#home" class="footer-logo" @click.prevent="scrollTop">
        <img :src="baseUrl + 'NGC.png'" alt="Next Gen Codes" class="footer-logo-img" />
      </a>
      <p class="footer-copy">{{ T.footer.copy }}</p>
      <nav class="footer-links">
        <a href="/blog/hoeveel-kost-website-belgie" target="_blank" rel="noopener">{{ T.footer.blog }}</a>
        <a href="#" @click.prevent="showPrivacy = true">{{ T.footer.privacy }}</a>
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
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'

const baseUrl = import.meta.env.BASE_URL
const { locale } = useLocale()
const T = computed(() => translations[locale.value])

const showPrivacy = ref(false)
const showTerms = ref(false)

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
