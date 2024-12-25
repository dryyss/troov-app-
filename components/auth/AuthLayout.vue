<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Background pattern -->
    <div class="absolute inset-0 z-0">
      <img
        :src="isLogin ? '/images/auth/curved1.jpg' : '/images/auth/curved2.jpg'"
        class="w-full h-full object-cover"
        alt="background pattern"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-indigo-800/80 to-teal-700/80"
      ></div>
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isLogin: {
    type: Boolean,
    default: true,
  },
})
</script>
