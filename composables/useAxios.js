import { useRuntimeConfig } from '#app'

export const useAxios = () => {
    const config = useRuntimeConfig()

    const $axios = $fetch.create({
        baseURL: config.public.apiBase || 'http://localhost:3001/api',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return {
        $axios,
    }
}