import { ViteSSG } from 'vite-ssg'
import './style.css'
import App from './App.vue'
import { routes } from './router'
import { trackEvent } from './composables/useAnalytics.js'

// vite-ssg entry: pre-renders every static route to HTML, then hydrates on the client.
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL, scrollBehavior: () => ({ top: 0 }) },
  ({ router, isClient }) => {
    if (isClient) {
      // SPA route changes don't fire a GA pageview automatically — send one.
      router.afterEach((to) => {
        trackEvent('page_view', { page_path: to.fullPath })
      })
    }
  },
)
