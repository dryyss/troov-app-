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
    async register(userData) {
      try {
        console.log("Tentative d'inscription avec:", userData)
        const response = await $fetch(
          'http://localhost:3001/api/auth/register',
          {
            method: 'POST',
            body: userData,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        console.log('Réponse inscription:', response)
        return response
      } catch (error) {
        console.error("Erreur d'inscription:", error)
        const message =
          (error.data && error.data.message) ||
          error.message ||
          "Erreur d'inscription"
        throw new Error(message)
      }
    },

    async login(credentials) {
      try {
        console.log('Login attempt with:', credentials)
        const response = await $fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          body: credentials,
          headers: {
            'Content-Type': 'application/json',
          },
        })

        console.log('Login response:', response)

        if (!response.token) {
          throw new Error('Token non reçu du serveur')
        }

        this.token = response.token
        this.user = response.user
        localStorage.setItem('auth_token', this.token)

        return response
      } catch (error) {
        console.error('Login error details:', error)
        const message =
          (error.data && error.data.message) ||
          error.message ||
          'Erreur de connexion'
        throw new Error(message)
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('auth_token')
    },
  },
})
