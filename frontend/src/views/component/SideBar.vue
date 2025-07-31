<template>
  <div>
    <!-- Mobile Header -->
    <div class="md:hidden bg-white border-b border-gray-300 p-4">
      <div class="flex items-center justify-between">
        <div class="text-xl font-bold">CafeTaria</div>
        <button @click="toggleSidebar" class="p-2 hover:bg-gray-100 rounded-lg">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Overlay for mobile -->
    <div v-if="isSidebarOpen" @click="toggleSidebar"
      class="fixed inset-0 bg-opacity-25 md:hidden z-30">
    </div>

    <!-- Sidebar -->
    <aside :class="[
      'bg-white border-r border-gray-300 flex flex-col justify-between',
      'fixed md:relative w-[280px] md:w-64 min-h-screen transition-transform duration-300 ease-in-out z-40',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]">

      <div>
        <div class="px-8 py-6 text-2xl font-bold hidden md:block">CafeTaria</div>
        <nav class="mt-4">
          <ul class="space-y-2">
            <li>
              <router-link to="/mitra/products" :class="[
                'flex items-center px-8 py-2 rounded-r-full',
                currentRoute === '/mitra/products' ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-700 hover:bg-green-50'
              ]">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 12h18M3 17h18" />
                </svg>
                Daftar Produk
              </router-link>
            </li>
            <li>
              <router-link to="/mitra/add-product" :class="[
                'flex items-center px-8 py-2 rounded-r-full',
                currentRoute === '/mitra/add-product' ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-700 hover:bg-green-50'
              ]">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Tambah Produk
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="px-8 py-6 flex items-center gap-3">
        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="profile"
          class="w-10 h-10 rounded-full object-cover" />
        <div>
          <div class="font-semibold text-sm">Cilla</div>
          <div class="text-xs text-gray-400">08214058756</div>
        </div>
        <button class="ml-auto text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRoute = computed(() => route.path)
const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<style scoped>
/* No custom CSS, all handled by Tailwind */
</style>
