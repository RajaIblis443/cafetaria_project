<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-gray-50">
    <SideBar />

    <!-- Main Content -->
    <main class="flex-1 p-4 md:p-8 mt-0 md:mt-0">
      <div class="flex items-center mb-6">
        <button class="mr-4 p-2 rounded-full hover:bg-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-xl md:text-2xl font-bold flex-1">Edit Produk</h1>
        <button
          class="flex items-center gap-2 bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
          Simpan Draft
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Informasi Dasar -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h2 class="text-lg font-semibold mb-4">Informasi Dasar</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
              <input type="text" v-model="product.name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Masukkan nama produk" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Harga Produk</label>
              <input type="number" v-model="product.price"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Masukkan harga produk" />
            </div>
          </div>
        </div>

        <!-- Gambar Produk -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h2 class="text-lg font-semibold mb-4">Gambar Produk</h2>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div v-if="!product.image" class="text-center">
              <div class="flex flex-col items-center justify-center py-5">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="mt-2 text-sm text-gray-600">Drag & Drop or Click Upload</p>
                <p class="text-xs text-gray-500">Max Size 2 MB | Format JPG, PNG</p>
              </div>
              <input type="file" @change="handleImageUpload" class="hidden" id="image-upload" accept="image/*" />
              <button @click="triggerImageUpload"
                class="mt-2 px-4 py-2 text-sm text-green-700 hover:bg-green-50 rounded-md border border-green-300">
                Upload
              </button>
            </div>
            <div v-else class="relative">
              <img :src="product.image" alt="Preview" class="w-full h-48 object-cover rounded-lg" />
              <button @click="removeImage"
                class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SideBar from '../component/SideBar.vue'

const isSidebarOpen = ref(false)
const product = ref({
  name: '',
  price: '',
  image: null
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const triggerImageUpload = () => {
  document.getElementById('image-upload').click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      product.value.image = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  product.value.image = null
}
</script>

<style scoped>
/* No custom CSS, all handled by Tailwind */
</style>
