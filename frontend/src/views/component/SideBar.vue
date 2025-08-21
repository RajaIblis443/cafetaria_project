<template>
  <div>
    <!-- Mobile Header -->
    <div class="md:hidden bg-white border-b border-gray-300 p-4 fixed top-0 left-0 right-0 z-50">
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
    <div v-if="isSidebarOpen" @click="toggleSidebar" class="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"></div>

    <!-- Sidebar -->
    <aside :class="[
      'bg-white border-r border-gray-300 flex flex-col justify-between',
      'fixed md:relative w-[280px] md:w-64 h-screen md:min-h-screen transition-transform duration-300 ease-in-out z-40',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]">
      <div class="flex flex-col h-full">
        <!-- Desktop Header -->
        <div class="px-6 md:px-8 py-6 text-2xl font-bold hidden md:block border-b border-gray-100">
          CafeTaria
        </div>

        <!-- Mobile Close Button -->
        <div class="md:hidden flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <div class="text-xl font-bold">Menu</div>
          <button @click="toggleSidebar" class="p-2 hover:bg-gray-100 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 mt-4">
          <ul class="space-y-2 px-4">
            <li>
              <router-link to="/mitra/products" @click="closeSidebarOnMobile" :class="[
                'flex items-center px-4 py-3 rounded-r-full transition-all duration-200',
                currentRoute === '/mitra/products'
                  ? 'bg-green-100 text-green-800 font-medium'
                  : 'text-gray-700 hover:bg-green-50'
              ]">
                <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 12h18M3 17h18" />
                </svg>
                <span class="truncate">Daftar Produk</span>
              </router-link>
            </li>
            <li>
              <router-link to="/mitra/add-product" @click="closeSidebarOnMobile" :class="[
                'flex items-center px-4 py-3 rounded-r-full transition-all duration-200',
                currentRoute === '/mitra/add-product'
                  ? 'bg-green-100 text-green-800 font-medium'
                  : 'text-gray-700 hover:bg-green-50'
              ]">
                <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span class="truncate">Tambah Produk</span>
              </router-link>
            </li>
            <!-- Logout Button -->
            <li class="mt-4">
              <button @click="handleLogout"
                class="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-r-full transition-all duration-200">
                <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span class="truncate">Logout</span>
              </button>
            </li>
          </ul>
        </nav>

        <!-- Profile Section -->
        <div class="px-6 md:px-8 py-6 border-t border-gray-100 mt-auto">
          <div class="flex items-center gap-3">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="profile"
              class="w-10 h-10 rounded-full object-cover flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-sm truncate">Cilla</div>
              <div class="text-xs text-gray-400 truncate">08214058756</div>
            </div>
            <button class="text-gray-400 hover:text-gray-600 flex-shrink-0 p-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthServices from '@/services/authServices'

const route = useRoute()
const router = useRouter()
const currentRoute = computed(() => route.path)
const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebarOnMobile = () => {
  // Close sidebar on mobile when clicking navigation links
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false
  }
}

const handleLogout = async () => {
  if (confirm('Apakah Anda yakin ingin logout?')) {
    try {
      await AuthServices.logout()
      // Redirect to login page
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      // Even if API fails, still redirect to login since localStorage is cleared
      router.push('/login')
    }
  }
}

// Close sidebar when clicking outside on mobile
const handleResize = () => {
  if (window.innerWidth >= 768) {
    isSidebarOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Custom scrollbar for the sidebar */
aside {
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}

aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background-color: #d1d5db;
}
</style>
