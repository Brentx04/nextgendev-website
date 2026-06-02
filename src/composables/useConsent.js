// Google Consent Mode v2 gating for GA4.
// GA is loaded in index.html with analytics_storage denied by default; we only
// flip it to "granted" once the visitor accepts cookies. This keeps the privacy
// promise (no analytics until consent) and makes the cookie banner real.
const STORAGE_KEY = 'ngc-cookie-consent'

function updateGtagConsent(granted) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

export function grantConsent() {
  localStorage.setItem(STORAGE_KEY, 'accepted')
  updateGtagConsent(true)
}

export function denyConsent() {
  localStorage.setItem(STORAGE_KEY, 'declined')
  updateGtagConsent(false)
}

// Re-apply the stored choice on every page load (Consent Mode defaults to denied).
export function applyStoredConsent() {
  if (typeof window === 'undefined') return
  updateGtagConsent(localStorage.getItem(STORAGE_KEY) === 'accepted')
}

export function getConsent() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEY)
}
