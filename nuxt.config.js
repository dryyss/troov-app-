export default defineNuxtConfig({
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Troov App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },

  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
  },

  imports: {
    dirs: ['stores'],
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-12-26',
})
