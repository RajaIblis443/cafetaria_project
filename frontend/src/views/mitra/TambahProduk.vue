<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-gray-50">
    <SideBar />

    <!-- Main Content -->
    <main class="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 mt-0">
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <button class="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-lg sm:text-xl md:text-2xl font-bold flex-1">Tambah Produk Baru</h1>
        <button @click="addProduct" :disabled="isLoading"
          class="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-800 text-white px-4 py-2.5 sm:py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base">
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          {{ isLoading ? 'Menambahkan...' : 'Tambah Produk' }}
        </button>
      </div>

      <!-- Form Container -->
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <!-- Informasi Dasar -->
          <div class="bg-white p-4 sm:p-6 rounded-lg shadow-sm order-1">
            <h2 class="text-base sm:text-lg font-semibold mb-4">Informasi Dasar</h2>
            <div class="space-y-4 sm:space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nama Produk</label>
                <input type="text" v-model="product.name"
                  class="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Masukkan nama produk" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Harga Produk</label>
                <input type="number" v-model="product.price"
                  class="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Masukkan harga produk" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi Produk</label>
                <textarea v-model="product.description" rows="3"
                  class="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm sm:text-base"
                  placeholder="Masukkan deskripsi produk"></textarea>
              </div>
            </div>
          </div>

          <!-- Gambar Produk -->
          <div class="bg-white p-4 sm:p-6 rounded-lg shadow-sm order-2 xl:order-1">
            <h2 class="text-base sm:text-lg font-semibold mb-4">Gambar Produk</h2>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4">
              <div v-if="!product.image" class="text-center">
                <div class="flex flex-col items-center justify-center py-6 sm:py-8">
                  <svg class="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="mt-2 text-xs sm:text-sm text-gray-600">Drag & Drop or Click Upload</p>
                  <p class="text-xs text-gray-500">Max Size 2 MB | Format JPG, PNG</p>
                </div>
                <input type="file" @change="handleImageUpload" class="hidden" id="image-upload" accept="image/*" />
                <button @click="triggerImageUpload"
                  class="mt-3 px-4 py-2 text-xs sm:text-sm text-green-700 hover:bg-green-50 rounded-md border border-green-300 transition-colors w-full sm:w-auto">
                  Upload Gambar
                </button>
              </div>
              <div v-else class="relative">
                <img :src="product.image" alt="Preview" class="w-full h-40 sm:h-48 object-cover rounded-lg" />
                <button @click="removeImage"
                  class="absolute top-2 right-2 p-1.5 sm:p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                  <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SideBar from '../component/SideBar.vue'
import ProductServices from '@/services/productServices'

const isSidebarOpen = ref(false)
const isLoading = ref(false)
const selectedFile = ref<File | null>(null)
const product = ref({
  name: '',
  price: '',
  description: '',
  image: null as string | null
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const triggerImageUpload = () => {
  document.getElementById('image-upload')?.click()
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    selectedFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      product.value.image = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  product.value.image = null
  selectedFile.value = null
  const input = document.getElementById('image-upload') as HTMLInputElement
  if (input) {
    input.value = ''
  }
}

const addProduct = async () => {
  try {
    // Validasi input
    if (!product.value.name.trim()) {
      alert('⚠️ Nama produk harus diisi!')
      return
    }

    if (!product.value.price || parseFloat(product.value.price) <= 0) {
      alert('⚠️ Harga produk harus diisi dan lebih dari 0!')
      return
    }

    if (!product.value.description.trim()) {
      alert('⚠️ Deskripsi produk harus diisi!')
      return
    }

    if (!selectedFile.value) {
      alert('⚠️ Gambar produk harus dipilih!')
      return
    }

    isLoading.value = true

    // Buat FormData untuk mengirim data termasuk file
    const formData = new FormData()
    formData.append('name', product.value.name.trim())
    formData.append('price', product.value.price.toString())
    formData.append('description', product.value.description.trim())
    formData.append('image', selectedFile.value)

    // Debug - lihat apa yang dikirim
    console.log('Sending FormData:')
    console.log('Name:', product.value.name.trim())
    console.log('Price:', product.value.price.toString())
    console.log('Description:', product.value.description.trim())
    console.log('File:', selectedFile.value)

    // Debug FormData entries
    console.log('FormData entries:')
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value)
      if (value instanceof File) {
        console.log(`  File details: name=${value.name}, size=${value.size}, type=${value.type}`)
      }
    }

    // Kirim data ke backend
    const response = await ProductServices.addProduct(formData)

    alert('Produk berhasil ditambahkan!')

    // Reset form setelah berhasil
    product.value = {
      name: '',
      price: '',
      description: '',
      image: null
    }
    selectedFile.value = null
    const input = document.getElementById('image-upload') as HTMLInputElement
    if (input) {
      input.value = ''
    }

  } catch (error: any) {
    console.error('Error adding product:', error)
    console.error('Error response:', error.response?.data)
    console.error('Error status:', error.response?.status)

    let errorMessage = 'Gagal menambahkan produk. Silakan coba lagi.'
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error
    }

    alert(errorMessage)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* No custom CSS, all handled by Tailwind */
</style>
