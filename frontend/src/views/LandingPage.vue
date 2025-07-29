<template>
  <div class="font-montserrat bg-gray-100 text-[#222]">
    <header class="bg-[#174c3c] border-b border-gray-400/50 py-2">
      <div class="flex items-center w-full max-w-[1200px] mx-auto px-8">
        <span class="text-white font-bold text-xl ml-[100]">CafeTaria</span>
        <nav class="flex gap-8 flex-1 justify-center">
          <a href="#beranda" class="text-[#cbcbcb] no-underline text-base font-medium">Beranda</a>
          <a href="#menu" class="text-[#cbcbcb] no-underline text-base font-medium">Menu</a>
          <a href="#" class="text-[#cbcbcb] no-underline text-base font-medium">Contact</a>
        </nav>
        <button class="bg-white text-[#174c3c] rounded-full px-12 py-2 font-semibold text-lg mr-[100]">Login</button>
      </div>
    </header>
    <section class="bg-[#174c3c] text-white text-center py-20 px-8" id="beranda">
      <button class="bg-[#174c3c] border border-white text-white rounded-full px-14 py-1 text-base mb-5">Cafetaria</button>
      <h1 class="text-5xl md:text-6xl font-bold my-5 leading-tight">MAKANAN YANG BISA<br>DINIKMATI SEMUA</h1>
      <p class="text-lg">Makanan yang dibuat oleh siswa, untuk memberikan pilihan terbaik bagi</p>
      <p class="text-lg">teman-temannya.</p>
      <button class="bg-white text-[#174c3c] rounded-full px-16 py-4 font-semibold text-lg inline-flex items-center gap-2 mt-12" @click="scrollToMenu">
        Lihat Menu
        <svg class="-rotate-[315deg] ml-2" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 16L16 6" stroke="#174c3c" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M7 6H16V15" stroke="#174c3c" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      </button>
    </section>
    <div class="bg-[#f7c948] text-white py-4 px-8 text-3xl font-bold overflow-hidden relative">
      <div class="flex gap-10 w-max animate-[marquee_28s_linear_infinite] min-w-[100vw]">
        <span v-for="i in 16" :key="i" class="whitespace-nowrap">Cireng</span>
        <span v-for="i in 16" :key="'repeat-' + i" class="whitespace-nowrap">Cireng</span>
      </div>
    </div>
    <section class="bg-[#ebebeb] pt-10 pb-12 text-center">
      <h2 class="text-4xl md:text-5xl font-bold mb-2 font-poppins">Menu Hari Ini</h2>
      <p class="text-base text-gray-600">Makanan yang dibuat oleh siswa, untuk memberikan pilihan terbaik bagi</p>
      <p class="text-base text-gray-600">teman-temannya.</p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 px-8 mt-8">
        <div v-for="i in 8" :key="i" class="bg-gray-100 rounded border-2 border-white shadow-md px-4 py-10 min-h-[150px] flex flex-col items-center relative mt-32 mb-0 overflow-visible">
          <img src="/img/makanan.png" alt="Cake Strawberry" class="w-[150px] h-[150px] object-cover rounded-full shadow-md absolute -top-20 left-1/2 -translate-x-1/2 bg-white z-20" />
          <div class="text-center mt-12">
            <h3 class="text-base font-semibold mb-1 font-poppins">Cake Strawberry</h3>
            <p class="text-base text-gray-600">Rp 15.000</p>
          </div>
        </div>
      </div>
    </section>
    <footer class="bg-[#174c3c] text-white text-center pt-20 pb-4 px-8">
      <div>
        <span class="font-bold text-2xl">Cafetaria</span>
        <p class="text-base">Hidangan karya siswa, rasa istimewa.</p>
        <p class="text-sm text-gray-400">Makanan dari proses belajar, bukan sekedar sajian.</p>
        <div class="w-full max-w-[1300px] h-0.5 bg-gray-300 my-20 mx-auto rounded"></div>
        <span class="text-sm text-gray-300">Copyright &copy; 2025. Cafetaria</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
function scrollToMenu() {
  const menuSection = document.getElementById('menu');
  if (menuSection) {
    menuSection.scrollIntoView({ behavior: 'smooth' });
  }
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
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
