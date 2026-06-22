// Google Consent Mode v2 gating for GA4.
// GA is loaded in index.html with analytics_storage denied by default; we only
// flip it to "granted" once the visitor accepts cookies. This keeps the privacy
// promise (no analytics until consent) and makes the cookie banner real.
const STORAGE_KEY = 'ngc-cookie-consent'

// Microsoft Clarity (heatmaps / session replay). Paste your project ID here to
// activate it — find it in clarity.microsoft.com → Settings → Overview.
// While empty, Clarity stays disabled. It only loads AFTER cookie consent.
const CLARITY_PROJECT_ID = ''
let clarityLoaded = false

function loadClarity() {
  if (clarityLoaded || !CLARITY_PROJECT_ID) return
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  clarityLoaded = true
  ;(function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }
    t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y)
  })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID)
}

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
  loadClarity()
}

export function denyConsent() {
  localStorage.setItem(STORAGE_KEY, 'declined')
  updateGtagConsent(false)
}

// Re-apply the stored choice on every page load (Consent Mode defaults to denied).
export function applyStoredConsent() {
  if (typeof window === 'undefined') return
  const accepted = localStorage.getItem(STORAGE_KEY) === 'accepted'
  updateGtagConsent(accepted)
  if (accepted) loadClarity()
}

export function getConsent() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEY)
}
