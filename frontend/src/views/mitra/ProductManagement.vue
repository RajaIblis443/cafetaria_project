<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-gray-50">
    <SideBar />

    <!-- Main Content -->
    <main class="flex-1 pt-16 md:pt-10 p-4 md:p-8 ">
      <!-- Header Section -->
      <div class="flex fle// Get status text based on product data (for mitra view)
const getStatusText = (product: Product) => {
  return product.is_available ? 'Tersedia' : 'Tidak Tersedia'
}

// Get status class based on product data (for mitra view)
const getStatusClass = (product: Product) => {
  return product.is_available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
}ex-row items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <button
          class="hidden sm:block mr-4 p-2 border-2 border-gray-300 rounded-lg hover:bg-gray-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 12h14m-7-7l-7 7l7 7" />
          </svg>
        </button>
        <h1 class="text-xl md:text-2xl font-bold flex-1">Daftar Produk</h1>
        <router-link to="/mitra/add-product"
          class="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span class="whitespace-nowrap">Tambah Produk</span>
        </router-link>
      </div>

      <hr class="mb-6 md:mb-8" />

      <!-- Table Container with improved responsive handling -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-100">
              <tr class="border-b border-gray-300">
                <th class="py-3 md:py-4 px-3 md:px-6 text-left text-gray-600 font-medium text-sm md:text-base">
                  Produk
                </th>
                <th
                  class="py-3 md:py-4 px-3 md:px-6 text-left text-gray-600 font-medium text-sm md:text-base hidden sm:table-cell">
                  Tanggal
                </th>
                <th class="py-3 md:py-4 px-3 md:px-6 text-left text-gray-600 font-medium text-sm md:text-base">
                  Status
                </th>
                <th class="py-3 md:py-4 px-3 md:px-6 text-right text-gray-600 font-medium text-sm md:text-base">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Loading State -->
              <tr v-if="loading">
                <td colspan="4" class="py-12 text-center">
                  <div class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                      fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                    </svg>
                    <span class="text-gray-500">Memuat data produk...</span>
                  </div>
                </td>
              </tr>

              <!-- Error State -->
              <tr v-else-if="error">
                <td colspan="4" class="py-12 text-center">
                  <div class="text-red-500">
                    <svg class="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <p class="text-lg font-medium">{{ error }}</p>
                    <button @click="fetchProducts"
                      class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                      Coba Lagi
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-else-if="products.length === 0">
                <td colspan="4" class="py-12 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 class="mt-2 text-sm font-medium text-gray-900">Belum ada produk</h3>
                  <p class="mt-1 text-sm text-gray-500">Mulai menambahkan produk pertama Anda.</p>
                  <div class="mt-6">
                    <router-link to="/mitra/add-product"
                      class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors">
                      <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Tambah Produk
                    </router-link>
                  </div>
                </td>
              </tr>

              <!-- Products Data -->
              <tr v-else v-for="product in products" :key="product.id"
                class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td class="py-3 md:py-4 px-3 md:px-6">
                  <div class="flex items-center gap-3 md:gap-4">
                    <img :src="product.image || '/img/makanan.png'" :alt="product.name"
                      class="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0" />
                    <div class="min-w-0 flex-1">
                      <h3 class="text-sm md:text-lg font-semibold truncate">{{ product.name }}</h3>
                      <p class="text-gray-600 text-sm md:text-base">{{ formatCurrency(product.price) }}</p>
                      <!-- Show date on mobile -->
                      <p class="text-gray-500 text-xs sm:hidden mt-1">{{ formatDate(product.created_at) }}</p>
                    </div>
                  </div>
                </td>
                <td class="py-3 md:py-4 px-3 md:px-6 text-gray-600 text-sm md:text-base hidden sm:table-cell">
                  {{ formatDate(product.created_at) }}
                </td>
                <td class="py-3 md:py-4 px-3 md:px-6">
                  <span :class="[
                    'inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium',
                    getStatusClass(product)
                  ]">
                    {{ getStatusText(product) }}
                  </span>
                </td>
                <td class="py-3 md:py-4 px-3 md:px-6">
                  <div class="flex gap-1 md:gap-2 justify-end">
                    <!-- Toggle Availability Button -->
                    <button @click="toggleAvailability(product)" :class="[
                      'p-1.5 md:p-2 text-white rounded-lg transition-colors',
                      product.is_available
                        ? 'bg-orange-500 hover:bg-orange-600'
                        : 'bg-green-500 hover:bg-green-600'
                    ]" :title="product.is_available ? 'Sembunyikan Produk' : 'Tampilkan Produk'">
                      <svg v-if="product.is_available" class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.5 8.5m1.378 1.378l-.018.018M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <svg v-else class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <!-- Edit Button -->
                    <button @click="handleEdit(product.id)"
                      class="p-1.5 md:p-2 bg-[#60a5fa] hover:bg-[#3b82f6] text-white rounded-lg transition-colors"
                      title="Edit">
                      <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <!-- Delete Button -->
                    <button @click="handleDelete(product.id)"
                      class="p-1.5 md:p-2 bg-[#f87171] hover:bg-[#ef4444] text-white rounded-lg transition-colors"
                      title="Delete">
                      <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </div>
    </main>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">Edit Produk</h2>
          <button @click="closeEditModal" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="submitEditProduct" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
            <input v-model="editForm.name" type="text"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required placeholder="Masukkan nama produk" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Harga</label>
            <input v-model.number="editForm.price" type="number"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required min="0" placeholder="Masukkan harga produk" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea v-model="editForm.description"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows="3" required placeholder="Masukkan deskripsi produk"></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Ganti Gambar (opsional)</label>
            <input type="file" accept="image/*" @change="handleEditImageChange"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            <p class="text-xs text-gray-500 mt-1">Kosongkan jika tidak ingin mengganti gambar</p>
          </div>

          <div class="flex gap-3 justify-end pt-4">
            <button type="button" @click="closeEditModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              :disabled="editLoading">
              Batal
            </button>
            <button type="submit"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="editLoading">
              <span v-if="editLoading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                Menyimpan...
              </span>
              <span v-else>Simpan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductServices from '@/services/productServices'
import SideBar from '../component/SideBar.vue'
import { ref, onMounted, reactive } from 'vue'

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
}

// Reactive data
const products = ref<Product[]>([])
const loading = ref(false)
const error = ref('')

// Edit modal state
const showEditModal = ref(false)
const editLoading = ref(false)
const editProductId = ref<string | null>(null)
const editForm = reactive({
  name: '',
  price: 0,
  description: '',
  image: null as File | null,
})

// Fetch products on component mount
const fetchProducts = async () => {
  try {
    loading.value = true
    error.value = ''
    const data = await ProductServices.getProductByMitra()
    products.value = data
  } catch (err) {
    console.error('Error fetching products:', err)
    error.value = 'Gagal memuat data produk'
  } finally {
    loading.value = false
  }
}

onMounted(fetchProducts)

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

// Get status text based on product data
const getStatusText = (product: Product) => {
  if (!product.is_approve) return 'Menunggu Persetujuan'
  return product.is_available ? 'Tersedia' : 'Tidak Tersedia'
}

// Get status class based on product data
const getStatusClass = (product: Product) => {
  if (!product.is_approve) return 'bg-yellow-100 text-yellow-800'
  return product.is_available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
}

// Handle actions
const handleEdit = (productId: string) => {
  const product = products.value.find(p => p.id === productId)
  if (!product) return

  // Set data untuk edit
  editProductId.value = productId
  editForm.name = product.name
  editForm.price = product.price
  editForm.description = product.description
  editForm.image = null // Reset file input

  // Buka modal
  showEditModal.value = true
}

const handleEditImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    editForm.image = target.files[0]
  }
}

const submitEditProduct = async () => {
  if (!editProductId.value) return

  try {
    editLoading.value = true

    const formData = new FormData()
    formData.append('name', editForm.name)
    formData.append('price', String(editForm.price))
    formData.append('description', editForm.description)

    // Hanya append gambar jika ada yang dipilih
    if (editForm.image) {
      formData.append('image', editForm.image)
    }

    await ProductServices.updateProduct(editProductId.value, formData)

    // Refresh data produk
    await fetchProducts()

    // Tutup modal
    showEditModal.value = false
    editProductId.value = null

    // Reset form
    editForm.name = ''
    editForm.price = 0
    editForm.description = ''
    editForm.image = null

  } catch (err) {
    console.error('Error updating product:', err)
    alert('Gagal mengupdate produk')
  } finally {
    editLoading.value = false
  }
}

const closeEditModal = () => {
  showEditModal.value = false
  editProductId.value = null
  editForm.name = ''
  editForm.price = 0
  editForm.description = ''
  editForm.image = null
}

const handleDelete = async (productId: string) => {
  if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
    try {
      await ProductServices.deleteProduct(productId)
      // Remove from local array
      products.value = products.value.filter(p => p.id !== productId)
    } catch (err) {
      console.error('Error deleting product:', err)
      alert('Gagal menghapus produk')
    }
  }
}

const toggleAvailability = async (product: Product) => {
  try {
    const updatedAvailability = !product.is_available

    // Call API to update availability
    await ProductServices.updateProductAvailability(product.id, updatedAvailability)

    // Update the product in the local array
    const productIndex = products.value.findIndex(p => p.id === product.id)
    if (productIndex !== -1) {
      products.value[productIndex].is_available = updatedAvailability
    }

    console.log(`Product ${product.name} availability changed to: ${updatedAvailability}`)

  } catch (err) {
    console.error('Error toggling product availability:', err)
    alert('Gagal mengubah status produk')
  }
}
</script>

<style scoped>
/* Custom scrollbar for table container */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background-color: #d1d5db;
}

/* Ensure buttons maintain aspect ratio on small screens */
@media (max-width: 640px) {
  .min-w-full {
    min-width: 640px;
  }
}
</style>
