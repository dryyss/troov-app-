export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuth()

    if (!auth.loggedIn) {
        console.log('Utilisateur non authentifié, redirection vers login')
        return navigateTo('/auth/login')
    }
})