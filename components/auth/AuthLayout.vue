<template>
  <div class="min-h-screen relative overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div
        class="w-full h-full bg-gradient-to-br from-purple-900 via-indigo-800 to-teal-700"
      ></div>
    </div>
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
