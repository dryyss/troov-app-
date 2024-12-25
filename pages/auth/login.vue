<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">Connexion</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <label>Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="form-control"
                  required
                >
              </div>
              <div class="form-group">
                <label>Mot de passe</label>
                <input
                  v-model="form.password"
                  type="password"
                  class="form-control"
                  required
                >
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary">
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      try {
        console.log('Tentative de connexion...', this.form)
        await this.$auth.loginWith('local', {
          data: this.form
        })
        console.log('Connexion réussie')
        this.$router.push('/objects')
      } catch (error) {
        console.error('Erreur de connexion:', error)
      }
    }
  }
}
</script>
