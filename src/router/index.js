/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHashHistory  } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import newtip from '@/pages/newtip.vue';
import map from '@/pages/map.vue';
import request from '@/pages/request.vue';
import members from '@/pages/members.vue';
import browse from '@/pages/browse.vue';
import recent from '@/pages/recent.vue';
import index from '@/pages/index.vue';

const createRoutes = () => {
//  const r = setupLayouts(routes)
  const r = []
  
  r.push({ path: '/',name: 'intro', component: index })
  r.push({ path: '/newtip',name: 'newtip', component: newtip })
  r.push({ path: '/map',name: 'map', component: map })
  r.push({ path: '/request',name: 'request', component: request })
  r.push({ path: '/members',name: 'members', component: members })
  r.push({ path: '/browse',name: 'browse', component: browse })
  r.push({ path: '/recent',name: 'recent', component: recent })
  return r
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: createRoutes(),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
