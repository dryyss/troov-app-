<template>
  <button
    type="button"
    class="p-2 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
    :class="{
      'text-blue-600 hover:text-blue-700': network === 'facebook',
      'text-black hover:text-gray-800': network === 'apple',
      'text-red-500 hover:text-red-600': network === 'google',
    }"
  >
    <span class="sr-only">{{ network }}</span>
    <div class="w-6 h-6" v-html="icon"></div>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { FacebookIcon, AppleIcon, GoogleIcon } from '~/components/icons'

const props = defineProps({
  network: {
    type: String,
    required: true,
    validator: (value) => ['facebook', 'apple', 'google'].includes(value),
  },
})

const icon = computed(() => {
  switch (props.network) {
    case 'facebook':
      return FacebookIcon
    case 'apple':
      return AppleIcon
    case 'google':
      return GoogleIcon
    default:
      return ''
  }
})
</script>
