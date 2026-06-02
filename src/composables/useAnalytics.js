// Lightweight GA4 event helper. Events are only delivered once the visitor
// has granted analytics consent (see useConsent.js / Google Consent Mode).
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

export function useAnalytics() {
  return { trackEvent }
}
