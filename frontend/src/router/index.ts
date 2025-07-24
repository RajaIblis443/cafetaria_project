import Mulyanto from '@/views/Mulyanto.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Mulyanto,
    },
  ],
})

export default router
