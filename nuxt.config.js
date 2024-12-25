export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'TroovTestFront',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // Ajout des modules nécessaires
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        'bootstrap-vue/nuxt'
    ],

    // Configuration Axios
    axios: {
        baseURL: 'http://localhost:3001/api', // L'URL de notre future API
    },

    // Configuration Auth
    auth: {
        strategies: {
            local: {
                token: {
                    property: 'token',
                    global: true,
                    required: true,
                    type: 'Bearer'
                },
                user: {
                    property: 'user'
                },
                endpoints: {
                    login: { url: '/auth/login', method: 'post' },
                    logout: { url: '/auth/logout', method: 'post' },
                    user: { url: '/auth/user', method: 'get' }
                }
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}