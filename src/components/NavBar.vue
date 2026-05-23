<template>
  <nav id="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-inner">
      <a href="#home" class="logo" @click.prevent="scrollTo('home')">
        <img :src="baseUrl + 'NGC.png'" alt="Next Gen Codes logo" class="logo-img" />
        <span class="logo-line"></span>
        <span class="logo-sub">NEXT GEN CODES</span>
      </a>

      <ul class="nav-links">
        <li v-for="item in navItems" :key="item.id">
          <a
            :href="'#' + item.id"
            class="nav-link"
            :class="{ active: activeSection === item.id }"
            @click.prevent="scrollTo(item.id)"
          >{{ item.label }}</a>
        </li>
      </ul>

      <div class="lang-switcher">
        <button
          v-for="lang in langs"
          :key="lang"
          class="lang-btn"
          :class="{ active: locale === lang }"
          @click="setLocale(lang)"
        >{{ lang.toUpperCase() }}</button>
      </div>

      <button class="btn-nav-cta" @click="scrollTo('contact')">
        <span>{{ T.nav.cta }}</span> <span class="btn-arrow">›</span>
      </button>

      <button
        class="hamburger"
        :class="{ active: menuOpen }"
        @click="$emit('update:menuOpen', !menuOpen)"
        aria-label="Menu openen"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <Transition name="mobile-menu">
      <div v-if="menuOpen" class="mobile-menu">
        <ul>
          <li v-for="item in navItems" :key="item.id">
            <a :href="'#' + item.id" @click.prevent="handleMobileNav(item.id)">{{ item.label }}</a>
          </li>
        </ul>
        <div class="mobile-lang-switcher">
          <button
            v-for="lang in langs"
            :key="lang"
            class="lang-btn"
            :class="{ active: locale === lang }"
            @click="setLocale(lang)"
          >{{ lang.toUpperCase() }}</button>
        </div>
        <a href="#contact" class="mobile-cta" @click.prevent="handleMobileNav('contact')">{{ T.nav.cta }}</a>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { translations } from '../i18n/translations.js'

const baseUrl = import.meta.env.BASE_URL

const props = defineProps({
  activeSection: { type: String, default: 'home' },
  menuOpen: { type: Boolean, default: false },
})
const emit = defineEmits(['update:menuOpen'])

const { locale, setLocale } = useLocale()
const langs = ['nl', 'en', 'fr']

const T = computed(() => translations[locale.value])

const navItems = computed(() => [
  { id: 'home',         label: T.value.nav.home },
  { id: 'services',     label: T.value.nav.services },
  { id: 'about',        label: T.value.nav.about },
  { id: 'portfolio',    label: T.value.nav.portfolio },
  { id: 'testimonials', label: T.value.nav.testimonials },
  { id: 'team',         label: T.value.nav.team },
  { id: 'contact',      label: T.value.nav.contact },
])

const isScrolled = ref(false)
let savedScrollY = 0

watch(() => props.menuOpen, (open) => {
  if (open) {
    savedScrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${savedScrollY}px`
    document.body.style.width = '100%'
  } else {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    window.scrollTo(0, savedScrollY)
  }
})

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function handleMobileNav(id) {
  emit('update:menuOpen', false)
  setTimeout(() => scrollTo(id), 50)
}

function onScroll() { isScrolled.value = window.scrollY > 40 }

function onResize() {
  if (window.innerWidth > 768 && props.menuOpen) {
    emit('update:menuOpen', false)
  }
}

function onKeyDown(e) {
  if (e.key === 'Escape' && props.menuOpen) {
    emit('update:menuOpen', false)
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  document.addEventListener('keydown', onKeyDown)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
.lang-switcher {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-right: 0.5rem;
}

.lang-btn {
  background: none;
  border: none;
  color: var(--grey-dim);
  font-family: var(--font-display);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  padding: 0.3rem 0.45rem;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
}

.lang-btn:hover {
  color: var(--white);
}

.lang-btn.active {
  color: var(--purple-light);
  background: rgba(124, 58, 237, 0.12);
}

.mobile-lang-switcher {
  display: flex;
  justify-content: center;
  gap: 4px;
  padding: 0.5rem 0 1rem;
}

.mobile-lang-switcher .lang-btn {
  font-size: 0.7rem;
  padding: 0.4rem 0.7rem;
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: 4px;
}

.mobile-lang-switcher .lang-btn.active {
  border-color: var(--purple-light);
}

@media (max-width: 768px) {
  .lang-switcher {
    display: none;
  }
}
</style>
