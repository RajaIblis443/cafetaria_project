<template>
  <div class="font-montserrat bg-gray-100 text-[#222]">
    <!-- Header with improved mobile navigation -->
    <header class="bg-[#174c3c] border-b border-gray-400/50 py-2 md:py-3">
      <div class="flex items-center justify-between w-full mx-auto px-4 md:px-24">
        <!-- Logo -->
        <span class="text-white font-bold text-lg md:text-xl">CafeTaria</span>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex gap-6 lg:gap-8 flex-1 justify-center">
          <a href="#beranda"
            class="text-[#cbcbcb] hover:text-white no-underline text-sm lg:text-base font-medium transition-colors">Beranda</a>
          <a href="#menu"
            class="text-[#cbcbcb] hover:text-white no-underline text-sm lg:text-base font-medium transition-colors">Menu</a>
          <a href="#"
            class="text-[#cbcbcb] hover:text-white no-underline text-sm lg:text-base font-medium transition-colors">Contact</a>
        </nav>

        <!-- Mobile menu button -->
        <button @click="toggleMobileMenu" class="md:hidden text-white p-2" aria-label="Toggle menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <!-- Desktop Login Button -->
        <router-link to="/login"
          class="hidden md:block bg-white text-[#174c3c] rounded-full px-6 lg:px-12 py-2 font-semibold text-sm lg:text-lg hover:bg-gray-100 transition-colors">
          Login
        </router-link>
      </div>

      <!-- Mobile Navigation Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-[#174c3c] border-t border-gray-400/30 py-4">
        <nav class="flex flex-col gap-4 px-4">
          <a href="#beranda" @click="closeMobileMenu"
            class="text-[#cbcbcb] hover:text-white no-underline text-base font-medium py-2">Beranda</a>
          <a href="#menu" @click="closeMobileMenu"
            class="text-[#cbcbcb] hover:text-white no-underline text-base font-medium py-2">Menu</a>
          <a href="#" @click="closeMobileMenu"
            class="text-[#cbcbcb] hover:text-white no-underline text-base font-medium py-2">Contact</a>
          <router-link to="/login"
            class="bg-white text-[#174c3c] rounded-full px-8 py-2 font-semibold text-base mt-4 self-start">
            Login
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Hero Section with better mobile layout -->
    <section class="bg-[#174c3c] text-white text-center py-12 md:py-16 lg:py-20 px-4 md:px-8 min-h-screen" id="beranda">
      <button
        class="bg-[#174c3c] border border-white text-white rounded-full px-8 md:px-19 py-1 md:py-3 text-sm md:text-base mb-4 md:mb-5">
        Cafetaria
      </button>
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-[100px] font-bold my-4 md:my-5 leading-tight">
        MAKANAN YANG BISA<br />DINIKMATI SEMUA
      </h1>
      <div class="max-w-2xl mx-auto">
        <p class="text-base md:text-lg mb-2">
          Makanan yang dibuat oleh siswa, untuk memberikan pilihan terbaik bagi
        </p>
        <p class="text-base md:text-lg">teman-temannya.</p>
      </div>
      <button
        class="bg-white text-[#174c3c] rounded-full px-8 md:px-16 py-3 md:py-4 font-semibold text-base md:text-lg inline-flex items-center gap-2 mt-8 md:mt-12 hover:bg-gray-100 transition-colors"
        @click="scrollToMenu">
        Lihat Menu
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"
          class="size-4 font-bold text-2xl">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </button>
    </section>

    <!-- Marquee with FIXED animation -->
    <div
      class="bg-[#f7c948] text-white py-3 md:py-4 px-4 md:px-8 text-xl md:text-2xl lg:text-3xl font-semibold overflow-hidden relative">
      <div class="flex animate-marquee">
        <!-- Set pertama konten -->
        <div class="flex gap-6 md:gap-10 shrink-0 py-2">
          <div v-for="product in allProducts" :key="'first-' + product['id']">
            <span class="whitespace-nowrap">{{ capitalize(product['name']) }}</span>
          </div>
        </div>
        <!-- Set kedua untuk seamless loop -->
        <div class="flex gap-6 md:gap-10 shrink-0 ml-6 md:ml-10 py-2">
          <div v-for="product in allProducts" :key="'second-' + product['id']">
            <span class="whitespace-nowrap">{{ capitalize(product['name']) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Menu Section with infinite scroll -->
    <section class="bg-[#ebebeb] pt-8 md:pt-10 pb-10 md:pb-12 text-center">
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 font-poppins px-4">
        Menu Hari Ini
      </h2>
      <div class="max-w-2xl mx-auto px-4">
        <p class="text-sm md:text-base text-gray-600 mb-1">
          Makanan yang dibuat oleh siswa, untuk memberikan pilihan terbaik bagi
        </p>
        <p class="text-sm md:text-base text-gray-600">teman-temannya.</p>
      </div>

      <div id="menu"
        class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 px-4 md:px-8 lg:px-12 mt-6 md:mt-8 max-w-7xl mx-auto">
        <div v-for="product in displayedProducts" :key="product['id']"
          class="bg-gray-100 rounded border-2 border-white px-3 md:px-4 py-8 md:py-10 min-h-[140px] md:min-h-[150px] flex flex-col items-center relative mt-20 md:mt-24 lg:mt-32 mb-0 overflow-visible transition-transform hover:scale-105 hover:shadow-md">
          <img :src="product['image']" :alt="product['name']"
            class="w-[100px] h-[100px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] object-cover rounded-full absolute -top-12 md:-top-16 lg:-top-20 left-1/2 -translate-x-1/2 bg-white z-20" />
          <div class="text-center mt-8 md:mt-10 lg:mt-12">
            <h3 class="text-sm md:text-base font-semibold mb-1 font-poppins">
              {{ product['name'] }}
            </h3>
            <p class="text-sm md:text-base text-gray-600">Rp {{ product['price'] }}</p>
          </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="loading" class="col-span-full text-center py-8">
          <div class="inline-flex items-center gap-2 text-gray-600">
            <div class="w-6 h-6 border-2 border-[#174c3c] border-t-transparent rounded-full animate-spin"></div>
            <span>Memuat menu lainnya...</span>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="!displayedProducts.length && !loading" class="col-span-full text-gray-400 py-12">
          Belum ada menu tersedia.
        </div>

        <!-- End of data indicator -->
        <div v-if="hasReachedEnd && displayedProducts.length > 0" class="col-span-full text-center py-8">
          <p class="text-gray-500">Semua menu telah ditampilkan</p>
        </div>
      </div>

      <!-- Scroll observer element -->
      <div ref="scrollObserver" class="h-1"></div>
    </section>

    <!-- Footer with responsive layout -->
    <footer class="bg-[#174c3c] text-white text-center pt-12 md:pt-16 lg:pt-20 pb-4 px-4 md:px-8">
      <div class="max-w-4xl mx-auto">
        <span class="font-bold text-xl md:text-2xl">Cafetaria</span>
        <p class="text-sm md:text-base mt-2">Hidangan karya siswa, rasa istimewa.</p>
        <p class="text-xs md:text-sm text-gray-400 mt-1">
          Makanan dari proses belajar, bukan sekedar sajian.
        </p>
        <div class="w-full max-w-[800px] h-0.5 bg-gray-300 my-12 md:my-16 lg:my-20 mx-auto rounded"></div>
        <span class="text-xs md:text-sm text-gray-300">Copyright &copy; 2025. Cafetaria</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ProductServices from '@/services/productServices'

// Mobile menu state
const mobileMenuOpen = ref(false)

// Infinite scroll state
const allProducts = ref<any[]>([])
const displayedProducts = ref<any[]>([])
const loading = ref(false)
const hasReachedEnd = ref(false)
const scrollObserver = ref(null)
const currentIndex = ref(0)
const itemsPerLoad = 8
let observer: IntersectionObserver | null = null

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function scrollToMenu() {
  const menuSection = document.getElementById('menu')
  if (menuSection) {
    menuSection.scrollIntoView({ behavior: 'smooth' })
  }
  closeMobileMenu()
}

async function loadMoreProducts() {
  if (loading.value || hasReachedEnd.value) return

  loading.value = true

  try {
    // Jika belum ada data, ambil semua dari ProductServices
    if (allProducts.value.length === 0) {
      console.log('Loading all products from ProductServices...')
      const data = await ProductServices.getProducts()
      allProducts.value = Array.isArray(data) ? data : []
      console.log('Total products loaded:', allProducts.value.length)
    }

    // Ambil batch berikutnya dari data yang sudah dimuat
    const nextBatch = allProducts.value.slice(currentIndex.value, currentIndex.value + itemsPerLoad)

    if (nextBatch.length === 0) {
      hasReachedEnd.value = true
    } else {
      displayedProducts.value.push(...nextBatch)
      currentIndex.value += itemsPerLoad
    }
  } catch (error) {
    console.error('Error loading products:', error)
    hasReachedEnd.value = true
  } finally {
    loading.value = false
  }
}

// Setup intersection observer untuk infinite scroll
function setupInfiniteScroll() {
  if (!scrollObserver.value) return

  observer = new IntersectionObserver(
    (entries) => {
      const [target] = entries
      if (target.isIntersecting && !loading.value && !hasReachedEnd.value) {
        loadMoreProducts()
      }
    },
    {
      rootMargin: '100px', // Mulai loading 100px sebelum mencapai observer
    },
  )

  observer.observe(scrollObserver.value)
}

onMounted(async () => {
  console.log('Initializing infinite scroll...')

  // Load initial products
  await loadMoreProducts()

  // Setup infinite scroll observer
  setupInfiniteScroll()

  console.log('Infinite scroll initialized:', displayedProducts.value.length, 'products loaded')
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap');

.font-montserrat {
  font-family: 'Montserrat', Arial, sans-serif;
}

.font-poppins {
  font-family: 'Poppins', Arial, sans-serif;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  animation: marquee 28s linear infinite;
}

/* Untuk memastikan animasi berjalan mulus */
.marquee-container {
  overflow: hidden;
  white-space: nowrap;
}

.marquee-content {
  display: inline-block;
  padding-left: 100%;
  animation: marquee 28s linear infinite;
}

/* Custom breakpoint for extra small screens */
@media (min-width: 475px) {
  .xs\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
