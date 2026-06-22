import Home from './views/Home.vue'

// Static routes — vite-ssg pre-renders each one to real HTML at build time.
export const routes = [
  { path: '/', name: 'home', component: Home },
  {
    path: '/diensten/website-laten-maken-genk',
    name: 'diensten-genk',
    component: () => import('./views/diensten/WebsiteLatenMakenGenk.vue'),
    meta: { layout: 'landing' },
  },
  {
    path: '/diensten/webshop-laten-maken',
    name: 'diensten-webshop',
    component: () => import('./views/diensten/WebshopLatenMaken.vue'),
    meta: { layout: 'landing' },
  },
  {
    path: '/blog/hoeveel-kost-website-belgie',
    name: 'blog-prijzen',
    component: () => import('./views/blog/HoeveelKostWebsiteBelgie.vue'),
    meta: { layout: 'landing' },
  },
  {
    path: '/blog/professionele-website-belang',
    name: 'blog-belang',
    component: () => import('./views/blog/ProfessioneleWebsiteBelang.vue'),
    meta: { layout: 'landing' },
  },
]
