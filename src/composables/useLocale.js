import { ref } from 'vue'

// Guard localStorage so this module is safe to import during SSR/pre-render.
const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('ngc-locale') : null
const locale = ref(stored || 'nl')

export function useLocale() {
  function setLocale(lang) {
    locale.value = lang
    if (typeof localStorage !== 'undefined') localStorage.setItem('ngc-locale', lang)
  }
  return { locale, setLocale }
}
