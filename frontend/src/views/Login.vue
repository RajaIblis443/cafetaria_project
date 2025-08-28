<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col items-center">
      <h1 class="text-xl font-semibold mb-1 text-center">CafeTaria</h1>
      <h2 class="text-lg font-bold mb-1 text-center">Selamat datang di Cafetaria</h2>
      <p class="text-gray-500 text-sm mb-6 text-center">Tempat di mana rasa hangat dan karya siswa berpadu.</p>

      <!-- Error/Success Messages -->
      <div v-if="message" :class="messageClass" class="w-full p-3 rounded-md mb-4 text-sm">
        {{ message }}
      </div>

      <form class="w-full flex flex-col gap-4" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input id="email" type="email" placeholder="bagas@gmail.com"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
            v-model="email" required :disabled="isLoading" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div class="relative">
            <input id="password" :type="showPassword ? 'text' : 'password'" placeholder="******"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 pr-10"
              v-model="password" required :disabled="isLoading" />
            <button type="button" @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600 transition-colors">
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001 12C2.395 6.228 6.697 1.5 12 1.5c.847 0 1.678.08 2.48.228m-.919 13.019A8.966 8.966 0 0112 22.5c-5.239 0-9.49-4.239-9.99-9.622.099-.446.198-.892.316-1.328M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
        <button type="submit" :disabled="isLoading || !email || !password"
          class="w-full py-2 mt-2 bg-green-800 text-white rounded-full hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center">
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          {{ isLoading ? 'Logging in...' : 'Submit' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import AuthServices from '../services/authServices';

// Router untuk navigasi
const router = useRouter();

// Reactive data
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const message = ref('');
const messageType = ref(''); // 'success' atau 'error'
const retryCount = ref(0);
const maxRetries = 3;

// Computed property untuk class pesan
const messageClass = computed(() => {
  return messageType.value === 'success'
    ? 'bg-green-100 text-green-700 border border-green-200'
    : 'bg-red-100 text-red-700 border border-red-200';
});

// Function untuk toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Function untuk menampilkan pesan
const showMessage = (msg: any, type = 'error') => {
  message.value = msg;
  messageType.value = type;

  // Auto hide message after 5 seconds
  setTimeout(() => {
    message.value = '';
    messageType.value = '';
  }, 5000);
};

// Function untuk retry login dengan delay
const retryLogin = async (delayMs = 1000) => {
  return new Promise(resolve => {
    setTimeout(resolve, delayMs);
  });
};

// Function untuk handle login
const handleLogin = async () => {
  // Reset pesan sebelumnya
  message.value = '';

  // Validasi input
  if (!email.value || !password.value) {
    showMessage('Email dan password harus diisi');
    return;
  }

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    showMessage('Format email tidak valid');
    return;
  }

  isLoading.value = true;
  let currentRetry = 0;

  const attemptLogin = async () => {
    try {
      console.log(`Login attempt ${currentRetry + 1}/${maxRetries + 1}`);

      const response = await AuthServices.login(email.value, password.value);

      if (response && response.success) {
        showMessage('Login berhasil! Mengalihkan...', 'success');
        retryCount.value = 0; // Reset retry count on success

        localStorage.setItem('auth_token', response.data.session.access_token);
        localStorage.setItem('user_data', JSON.stringify(response.data));

        console.info(response)

        // Redirect ke halaman dashboard atau home setelah delay singkat
        setTimeout(() => {
          if (response.data.user.role == "mitra") {
            router.push('/mitra/products'); // Sesuaikan dengan route tujuan
          }
          if (response.data.user.role == "admin") {
            router.push('/admin/products')
          }
        }, 1500);

        return true; // Success
      } else {
        // Handle berbagai jenis response error
        const errorMessage = response?.message || 'Login gagal. Periksa email dan password Anda.';
        showMessage(errorMessage);
        return false; // Failed
      }
    } catch (error: any) {
      console.error(`Login error (attempt ${currentRetry + 1}):`, error);

      // Handle berbagai jenis error
      let errorMessage = 'Terjadi kesalahan. Silakan coba lagi.';
      let shouldRetry = false;

      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const data = error.response.data;

        switch (status) {
          case 400:
            errorMessage = data?.message || 'Data yang dikirim tidak valid. Periksa email dan password Anda.';
            break;
          case 401:
            errorMessage = 'Email atau password salah. Silakan coba lagi.';
            break;
          case 403:
            errorMessage = 'Akses ditolak. Akun Anda mungkin diblokir.';
            break;
          case 404:
            errorMessage = 'Layanan login tidak ditemukan. Hubungi administrator.';
            break;
          case 500:
            errorMessage = 'Server sedang mengalami gangguan. Silakan coba lagi dalam beberapa saat.';
            shouldRetry = true;
            break;
          case 502:
          case 503:
          case 504:
            errorMessage = 'Server sedang dalam pemeliharaan. Silakan coba lagi nanti.';
            shouldRetry = true;
            break;
          default:
            errorMessage = data?.message || `Terjadi kesalahan server (${status}). Silakan coba lagi.`;
            shouldRetry = status >= 500; // Retry only for server errors
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
        shouldRetry = true;
      } else if (error.code === 'ECONNABORTED') {
        // Timeout error
        errorMessage = 'Permintaan timeout. Silakan coba lagi.';
        shouldRetry = true;
      } else {
        // Other errors
        errorMessage = error.message || 'Terjadi kesalahan yang tidak diketahui.';
      }

      // Retry logic for certain errors
      if (shouldRetry && currentRetry < maxRetries) {
        currentRetry++;
        showMessage(`${errorMessage} Mencoba lagi... (${currentRetry}/${maxRetries})`);
        await retryLogin(2000); // Wait 2 seconds before retry
        return await attemptLogin();
      } else {
        showMessage(errorMessage);
        return false; // Failed
      }
    }
  };

  try {
    await attemptLogin();
  } finally {
    isLoading.value = false;
  }
};

// Clear message when user starts typing
const clearMessage = () => {
  if (message.value) {
    message.value = '';
    messageType.value = '';
  }
};

// Watch for input changes to clear messages
watch([email, password], clearMessage);
</script>

<style scoped>
/* Animasi loading spinner sudah menggunakan Tailwind classes */
</style>
