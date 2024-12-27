<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-teal-700"
  >
    <div class="max-w-md w-full mx-4">
      <div class="bg-white rounded-xl shadow-xl p-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold mb-2">Welcome!</h1>
          <p class="text-gray-600 mb-8">
            Use these awesome forms to login or create new account in your
            project for free.
          </p>
        </div>

        <div class="flex justify-center gap-4 mb-6">
          <button class="p-3 border rounded-lg hover:bg-gray-50">
            <img
              src="/images/auth/facebook.svg"
              alt="Facebook"
              class="w-5 h-5"
            />
          </button>
          <button class="p-3 border rounded-lg hover:bg-gray-50">
            <img src="/images/auth/apple.svg" alt="Apple" class="w-5 h-5" />
          </button>
          <button class="p-3 border rounded-lg hover:bg-gray-50">
            <img src="/images/auth/google.svg" alt="Google" class="w-5 h-5" />
          </button>
        </div>

        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">or</span>
          </div>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div v-if="error" class="p-3 bg-red-100 text-red-700 rounded-lg">
            {{ error }}
          </div>
          <input
            v-model="name"
            type="text"
            placeholder="Name"
            autocomplete="name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            autocomplete="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            autocomplete="new-password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />

          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                v-model="agreeToTerms"
                class="h-4 w-4 text-indigo-600 rounded border-gray-300"
                required
              />
            </div>
            <div class="ml-3">
              <label for="terms" class="text-sm text-gray-600">
                I agree the
                <a
                  href="#"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg"
          >
            {{ loading ? 'Inscription en cours...' : 'SIGN UP' }}
          </button>
        </form>

        <div class="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <NuxtLink
            to="/auth/login"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const agreeToTerms = ref(false)
const error = ref(null)
const loading = ref(false)

const handleRegister = async () => {
  try {
    if (!agreeToTerms.value) {
      error.value = "Veuillez accepter les conditions d'utilisation"
      return
    }

    loading.value = true
    error.value = null

    console.log("Tentative d'inscription avec:", {
      name: name.value,
      email: email.value,
      password: password.value,
    })

    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
    })

    console.log('Inscription réussie')
    router.push('/auth/login')
  } catch (err) {
    console.error("Erreur d'inscription:", err)
    error.value = err.message || "Une erreur est survenue lors de l'inscription"
  } finally {
    loading.value = false
  }
}
</script>
