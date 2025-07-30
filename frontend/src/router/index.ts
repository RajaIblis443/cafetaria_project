import LandingPage from '@/views/LandingPage.vue'
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
      path: '/login-mitra',
      name: 'login-mitra',
      component: () => import('@/views/mitra/LoginMitraPage.vue'),
    },
    {
      path: '/mitra/products',
      name: 'product-management',
      component: () => import('@/views/mitra/ProductManagement.vue'),
    },
    {
      path: '/mitra/add-product',
      name: 'add-product',
      component: () => import('@/views/mitra/TambahProduk.vue'),
    },
    {
      path: '/tambah-produk',
      name: 'tambah-produk',
      component: () => import('@/views/mitra/TambahProduk.vue'),
    },
  ],
})

export default router
