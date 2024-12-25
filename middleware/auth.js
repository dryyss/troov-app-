export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuthStore()

    // Liste des routes publiques
    const publicRoutes = ['/auth/login', '/auth/register', '/']

    if (!auth.isAuthenticated && !publicRoutes.includes(to.path)) {
        return navigateTo('/auth/login')
    }
})