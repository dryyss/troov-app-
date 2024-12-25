export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  ssr: true,
  experimental: {
    payloadExtraction: false,
  },
})
