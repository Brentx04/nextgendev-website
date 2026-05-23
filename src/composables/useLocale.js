import { ref } from 'vue'

const locale = ref(localStorage.getItem('ngc-locale') || 'nl')

export function useLocale() {
  function setLocale(lang) {
    locale.value = lang
    localStorage.setItem('ngc-locale', lang)
  }
  return { locale, setLocale }
}
