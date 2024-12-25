<template>
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-xl font-bold text-indigo-600">
            Troov App
          </NuxtLink>
        </div>
        <div class="flex items-center space-x-4">
          <NuxtLink
            to="/auth/login"
            class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
          >
            Se connecter
          </NuxtLink>
          <NuxtLink
            to="/auth/register"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            S'inscrire
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>
