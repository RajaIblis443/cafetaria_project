<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-md p-8 bg-white rounded-lg  flex flex-col items-center">
      <h1 class="text-xl font-semibold mb-1 text-center">CafeTaria</h1>
      <h2 class="text-lg font-bold mb-1 text-center">Selamat datang di Cafetaria</h2>
      <p class="text-gray-500 text-sm mb-6 text-center">Tempat di mana rasa hangat dan karya siswa berpadu.</p>
      <form class="w-full flex flex-col gap-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            placeholder="bagas@gmail.com"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div class="relative">
            <input
              id="password"
              type="password"
              placeholder="******"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 pr-10"
            />
            <button type="button" tabindex="-1" class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 cursor-default">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0012 6.5c2.042 0 3.97.612 5.58 1.723M19.07 10.87c.58.86.93 1.87.93 2.88 0 3.59-3.58 6.5-8 6.5-1.53 0-2.97-.31-4.19-.86M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
        <button type="submit" class="w-full py-2 mt-2 bg-green-800 text-white rounded-full hover:bg-green-700 transition-colors">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
// ...
</script>

<style scoped>
/* No custom CSS, all handled by Tailwind */
</style>
