<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-gray-50">
    <SideBar />

    <!-- Main Content -->
    <main class="flex-1 p-4 md:p-8 mt-0 md:mt-0">
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <button class="hidden sm:block mr-4 p-2 border-2 border-gray-300 rounded-lg hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 12h14m-7-7l-7 7l7 7" />
          </svg>
        </button>
        <h1 class="text-xl md:text-2xl font-bold flex-1">Daftar Produk (Admin)</h1>
        <button @click="refreshProducts"
          class="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
      <hr class="mb-6" />

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span class="ml-3 text-gray-600">Memuat data produk...</span>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <strong>Error:</strong> {{ error }}
      </div>

      <!-- Empty state -->
      <div v-else-if="products.length === 0" class="text-center py-8">
        <div class="text-gray-500 text-lg">Tidak ada produk yang ditemukan</div>
      </div>

      <!-- Products table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-lg shadow-sm">
          <thead class="bg-gray-100">
            <tr class="border-y-2 border-gray-300">
              <th class="py-4 px-6 text-left text-gray-600">Produk</th>
              <th class="py-4 px-6 text-left text-gray-600">Mitra</th>
              <th class="py-4 px-6 text-left text-gray-600">Tanggal</th>
              <th class="py-4 px-6 text-left text-gray-600">Status</th>
              <th class="py-4 px-6 text-right text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id" class="border-b-2 border-gray-300 hover:bg-gray-50">
              <td class="py-4 px-6">
                <div class="flex items-center gap-4">
                  <img :src="product.image" :alt="product.name" class="w-16 h-16 rounded-lg object-cover"
                    @error="handleImageError" />
                  <div>
                    <h3 class="text-lg font-semibold">{{ product.name }}</h3>
                    <p class="text-gray-600">{{ formatCurrency(product.price) }}</p>
                    <p class="text-sm text-gray-500 line-clamp-2">{{ product.description }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="text-sm">
                  <div class="font-medium">{{ product.mitra?.name || 'Unknown' }}</div>
                  <div class="text-gray-500">{{ product.mitra?.email || '' }}</div>
                </div>
              </td>
              <td class="py-4 px-6 text-gray-600">{{ formatDate(product.created_at) }}</td>
              <td class="py-4 px-6">
                <div class="flex flex-col gap-1">
                  <span :class="getApprovalStatusClass(product.is_approve)">
                    {{ product.is_approve ? 'Disetujui' : 'Menunggu Persetujuan' }}
                  </span>
                  <span :class="getAvailabilityStatusClass(product.is_available)">
                    {{ product.is_available ? 'Tersedia' : 'Tidak Tersedia' }}
                  </span>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="flex gap-2 justify-end">
                  <!-- Approve button (only show if not approved) -->
                  <button v-if="!product.is_approve" @click="approveProduct(product.id)"
                    :disabled="loadingActions[product.id]"
                    class="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Setujui Produk">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>

                  <!-- Delete button -->
                  <button @click="deleteProduct(product.id)" :disabled="loadingActions[product.id]"
                    class="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Hapus Produk">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ProductServices from '@/services/productServices'
import SideBar from '../component/SideBar.vue'
import { ref, onMounted } from 'vue'

// Define product interface based on your response
interface Product {
  id: string
  created_at: string
  mitra_id: string
  name: string
  price: number
  image: string
  description: string
  is_available: boolean
  is_approve: boolean
  mitra?: {
    id: string
    name: string
    email: string
  }
}

// Reactive data
const products = ref<Product[]>([])
const loading = ref(false)
const error = ref('')
const loadingActions = ref<Record<string, boolean>>({})

// Fetch products on component mount
const fetchProducts = async () => {
  try {
    loading.value = true
    error.value = ''
    const data = await ProductServices.getProducts()
    products.value = data
  } catch (err) {
    console.error('Error fetching products:', err)
    error.value = 'Gagal memuat data produk. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

const refreshProducts = () => {
  fetchProducts()
}

onMounted(fetchProducts)

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Status styling functions
const getApprovalStatusClass = (isApproved: boolean) => {
  return isApproved
    ? 'px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium'
    : 'px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium'
}

const getAvailabilityStatusClass = (isAvailable: boolean) => {
  return isAvailable
    ? 'px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium'
    : 'px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium'
}

// Handle image loading error
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/img/placeholder.png' // Fallback image
}

// Approve product function
const approveProduct = async (productId: string) => {
  if (!confirm('Apakah Anda yakin ingin menyetujui produk ini?')) {
    return
  }

  try {
    loadingActions.value[productId] = true
    await ProductServices.approveProduct(productId)

    // Update local state
    const productIndex = products.value.findIndex(p => p.id === productId)
    if (productIndex !== -1) {
      products.value[productIndex].is_approve = true
    }

    alert('Produk berhasil disetujui!')
  } catch (err) {
    console.error('Error approving product:', err)
    alert('Gagal menyetujui produk. Silakan coba lagi.')
  } finally {
    loadingActions.value[productId] = false
  }
}

// Delete product function
const deleteProduct = async (productId: string) => {
  if (!confirm('Apakah Anda yakin ingin menghapus produk ini? Aksi ini tidak dapat dibatalkan.')) {
    return
  }

  try {
    loadingActions.value[productId] = true
    await ProductServices.deleteProduct(productId)

    // Remove from local state
    products.value = products.value.filter(p => p.id !== productId)

    alert('Produk berhasil dihapus!')
  } catch (err) {
    console.error('Error deleting product:', err)
    alert('Gagal menghapus produk. Silakan coba lagi.')
  } finally {
    loadingActions.value[productId] = false
  }
}
</script>

<style scoped>
/* No custom CSS, all handled by Tailwind */
</style>
