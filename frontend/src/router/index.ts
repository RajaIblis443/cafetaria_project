import LandingPage from '@/views/LandingPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: import('@/views/LandingPage.vue'),
    },
    {
      path: '/login-mitra',
      name: 'login-mitra',
      component: () => import('@/views/mitra/LoginMitraPage.vue'),
    },
  ],
})

export default router
