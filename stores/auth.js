import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async login(credentials) {
            try {
                console.log('Login attempt with:', credentials)
                const response = await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: credentials,
                })
                this.token = response.token
                this.user = response.user
                return response
            } catch (error) {
                console.error('Login error:', error)
                throw error
            }
        },

        async logout() {
            this.token = null
            this.user = null
        },
    },
})