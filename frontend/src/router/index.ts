import authGuard from '@/middleware/authMIddleware'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: () => import('@/views/LandingPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/mitra/products',
      name: 'product-management',
      component: () => import('@/views/mitra/ProductManagement.vue'),
      meta: { role: 'mitra' },
      beforeEnter: authGuard,
    },
    {
      path: '/mitra/add-product',
      name: 'add-product',
      component: () => import('@/views/mitra/TambahProduk.vue'),
      meta: { role: 'mitra' },
      beforeEnter: authGuard,
    },
  ],
})

export default router
