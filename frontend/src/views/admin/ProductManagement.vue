<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-gray-50">
    <SideBar />

    <!-- Main Content -->
    <main class="flex-1 p-4 md:p-8 mt-0 md:mt-0">
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <button class="hidden sm:block mr-4 p-2 border-2 border-gray-300 rounded-lg hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width  ="20" height="20" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 12h14m-7-7l-7 7l7 7" />
          </svg>
        </button>
        <h1 class="text-xl md:text-2xl font-bold flex-1">Daftar Produk</h1>
        <button
          class="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Produk
        </button>
      </div>
      <hr class="mb-20" />
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-100">
            <tr class="border-y-2 border-gray-300">
              <th class="py-4 px-6 text-left text-gray-600">Produk</th>
              <th class="py-4 px-6 text-left text-gray-600">Tanggal</th>
              <th class="py-4 px-6 text-left text-gray-600">Status</th>
              <th class="py-4 px-6 text-right text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b-2 border-gray-300 hover:bg-gray-50">
              <td class="py-4 px-6">
                <div class="flex items-center gap-4">
                  <img src="/img/makanan.png" alt="Cake Strawberry" class="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h3 class="text-lg font-semibold">Cake Strawberry</h3>
                    <p class="text-gray-600">Rp 5000</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6 text-gray-600">Jun 24, 2025</td>
              <td class="py-4 px-6">
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Published</span>
              </td>
              <td class="py-4 px-6">
                <div class="flex gap-2 justify-end">
                  <button class="p-2 bg-[#4ade80] hover:bg-[#22c55e] text-white rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="M12 19V5m-7 7l7 7l7-7" />
                    </svg>
                  </button>
                  <button class="p-2 bg-[#60a5fa] hover:bg-[#3b82f6] text-white rounded-lg">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button class="p-2 bg-[#f87171] hover:bg-[#ef4444] text-white rounded-lg">
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
import SideBar from '../component/SideBar.vue'
</script>

<style scoped>
/* No custom CSS, all handled by Tailwind */
</style>
