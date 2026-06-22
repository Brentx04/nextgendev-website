import { ref } from 'vue'

// Lightweight bot protection for the EmailJS forms (no backend available):
//  1. Honeypot — a hidden field real users never see/fill. If it has a value,
//     it's almost certainly a bot.
//  2. Time-trap — humans take a few seconds to fill a form. A submit within
//     MIN_FILL_MS of mount is treated as a bot.
const MIN_FILL_MS = 2500

export function useSpamGuard() {
  const honeypot = ref('')
  const mountedAt = Date.now()

  function isBot() {
    if (honeypot.value.trim() !== '') return true
    if (Date.now() - mountedAt < MIN_FILL_MS) return true
    return false
  }

  return { honeypot, isBot }
}
