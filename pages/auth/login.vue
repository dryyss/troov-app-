<template>
  <AuthLayout :is-login="true">
    <div class="min-h-screen flex items-center justify-center">
      <div class="max-w-md w-full m-4">
        <div class="bg-white rounded-lg shadow-xl p-8">
          <h1 class="text-3xl font-bold text-center mb-2">Welcome!</h1>
          <p class="text-gray-600 text-center mb-8">
            Use these awesome forms to login or create new account in your
            project for free.
          </p>

          <div class="flex justify-center space-x-4 mb-6">
            <SocialButton network="facebook" />
            <SocialButton network="apple" />
            <SocialButton network="google" />
          </div>

          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <form @submit.prevent="handleLogin">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Email</label
                >
                <input
                  v-model="email"
                  type="email"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Password</label
                >
                <input
                  v-model="password"
                  type="password"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    v-model="rememberMe"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    for="remember-me"
                    class="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                SIGN IN
              </button>
            </div>
          </form>

          <div class="mt-4 text-center">
            <span class="text-sm text-gray-600">or</span>
          </div>

          <NuxtLink
            to="/auth/register"
            class="mt-4 w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            SIGN UP
          </NuxtLink>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthLayout from '~/components/auth/AuthLayout.vue'
import SocialButton from '~/components/auth/SocialButton.vue'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()
const rememberMe = ref(false)

const handleLogin = async () => {
  try {
    console.log('Tentative de connexion...', {
      email: email.value,
      password: password.value,
    })
    await auth.login({
      email: email.value,
      password: password.value,
    })
    console.log('Connexion réussie')
    router.push('/')
  } catch (error) {
    console.error('Erreur de connexion:', error)
  }
}
</script>
