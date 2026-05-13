<template>
  <nav id="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-inner">
      <a href="#home" class="logo" @click.prevent="scrollTo('home')">
        <img :src="baseUrl + 'ngd-logo.png'" alt="Next Gen Codes logo" class="logo-img" />
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

      <button class="btn-nav-cta" @click="scrollTo('contact')">
        <span>OFFERTE AANVRAGEN</span> <span class="btn-arrow">›</span>
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
        <a href="#contact" class="mobile-cta" @click.prevent="handleMobileNav('contact')">OFFERTE AANVRAGEN</a>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const baseUrl = import.meta.env.BASE_URL

const props = defineProps({
  activeSection: { type: String, default: 'home' },
  menuOpen: { type: Boolean, default: false },
})
const emit = defineEmits(['update:menuOpen'])

const isScrolled = ref(false)

const navItems = [
  { id: 'home',         label: 'HOME' },
  { id: 'services',     label: 'DIENSTEN' },
  { id: 'about',        label: 'OVER ONS' },
  { id: 'portfolio',    label: 'PROJECTEN' },
  { id: 'testimonials', label: 'REVIEWS' },
  { id: 'team',         label: 'ONS TEAM' },
  { id: 'contact',      label: 'CONTACT' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function handleMobileNav(id) {
  emit('update:menuOpen', false)
  document.body.classList.remove('menu-open')
  setTimeout(() => scrollTo(id), 50)
}

function onScroll() { isScrolled.value = window.scrollY > 40 }

function onResize() {
  if (window.innerWidth > 768 && props.menuOpen) {
    emit('update:menuOpen', false)
    document.body.classList.remove('menu-open')
  }
}

function onKeyDown(e) {
  if (e.key === 'Escape' && props.menuOpen) {
    emit('update:menuOpen', false)
    document.body.classList.remove('menu-open')
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
