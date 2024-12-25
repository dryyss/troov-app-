import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false,
        token: null,
    }),

    actions: {
        setUser(user) {
            this.user = user
            this.isAuthenticated = !!user
        },

        setToken(token) {
            this.token = token
        },

        async login(credentials) {
            try {
                // Simulation d'appel API pour le moment
                const response = await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: credentials,
                })
                this.setToken(response.token)
                this.setUser(response.user)
                return response
            } catch (error) {
                console.error('Login error:', error)
                throw error
            }
        },

        async logout() {
            this.setUser(null)
            this.setToken(null)
        },
    },

    getters: {
        getUser: (state) => state.user,
        getToken: (state) => state.token,
    },
})