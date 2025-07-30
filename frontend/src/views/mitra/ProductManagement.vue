<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-gray-50">
    <SideBar />

    <!-- Main Content -->
    <main class="flex-1 p-4 md:p-8 mt-0 md:mt-0">
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <button class="hidden mr-4 p-2 rounded-full hover:bg-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
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
      <hr class="mb-6" />
      <div class="overflow-x-auto">
        <table class="min-w-full rounded-lg border-separate border-spacing-0">
          <thead class="hidden sm:table-header-group">
            <tr class="bg-gray-100">
              <th class="px-4 py-2 text-left font-medium text-gray-700">Produk</th>
              <th class="px-4 py-2 text-left font-medium text-gray-700">Tanggal</th>
              <th class="px-4 py-2 text-left font-medium text-gray-700">Status</th>
              <th class="px-4 py-2 text-center font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="sm:border-b border-gray-300 bg-white rounded-lg sm:rounded-none shadow-sm sm:shadow-none mb-4 sm:mb-0 block sm:table-row">
              <td class="flex items-start gap-3 px-4 py-3 sm:table-cell">
                <img src="/img/makanan.png" alt="Cake Strawberry" class="w-14 h-14 rounded object-cover shrink-0" />
                <div class="flex flex-col justify-center min-h-[3.5rem]">
                  <div class="font-semibold">Cake Strawberry</div>
                  <div class="text-sm text-gray-500">Rp 5000</div>
                  <div class="sm:hidden mt-2 flex items-center gap-2">
                    <span
                      class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Published</span>
                    <span class="text-sm text-gray-500">Jun 24, 2025</span>
                  </div>
                </div>
              </td>
              <td class="hidden sm:table-cell px-4 py-3 whitespace-nowrap">Jun 24, 2025</td>
              <td class="hidden sm:table-cell px-4 py-3">
                <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Published</span>
              </td>
              <td class="px-4 py-3 flex sm:table-cell sm:text-center">
                <div class="flex gap-2 w-full sm:w-auto sm:justify-center mt-3 sm:mt-0">
                  <button class="bg-green-500 hover:bg-green-600 text-white p-2 rounded"><svg class="w-4 h-4"
                      fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg></button>
                  <button class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"><svg class="w-4 h-4" fill="none"
                      stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15 12H9m6 0a6 6 0 11-12 0 6 6 0 012 0z" />
                    </svg></button>
                  <button class="bg-red-500 hover:bg-red-600 text-white p-2 rounded"><svg class="w-4 h-4" fill="none"
                      stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg></button>
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
