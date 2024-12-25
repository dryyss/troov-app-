export const state = () => ({
    objects: [],
    loading: false,
    error: null
})

export const mutations = {
    SET_OBJECTS(state, objects) {
        state.objects = objects
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_ERROR(state, error) {
        state.error = error
    }
}

export const actions = {
    async fetchObjects({ commit }) {
        try {
            console.log('Récupération des objets...')
            commit('SET_LOADING', true)
            const { data } = await this.$axios.get('/objects')
            commit('SET_OBJECTS', data)
            console.log('Objets récupérés:', data)
        } catch (error) {
            console.error('Erreur lors de la récupération des objets:', error)
            commit('SET_ERROR', error.message)
        } finally {
            commit('SET_LOADING', false)
        }
    }
}