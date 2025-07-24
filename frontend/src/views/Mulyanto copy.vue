<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex mx-auto flex-col items-center justify-center h-screen">
    <span :style="{ fontSize: fontSize + 'px' }"> MULYANTO </span>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const seconds = ref(0)

let interval: ReturnType<typeof setInterval>

onMounted(() => {
  interval = setInterval(() => {
    seconds.value++
    fontSize.value += 10
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

const fontSize = ref(16)
</script>
