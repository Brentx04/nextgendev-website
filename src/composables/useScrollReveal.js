import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(selector, options = {}) {
  const { threshold = 0.12, rootMargin = '0px 0px -60px 0px', delay = 80 } = options
  let observer = null

  onMounted(() => {
    const targets = document.querySelectorAll(selector)
    if (!targets.length) return

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }, i * delay)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold, rootMargin })

    targets.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
      observer.observe(el)
    })
  })

  onUnmounted(() => observer?.disconnect())
}
