<template>
  <section class="row">
    <div class="col">
      <form class="form-signin" @submit.prevent="pressed">
        <img class="mb-4" src="../assets/hedwig-icon.png" alt="" width="250" height="150">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" v-model="email" class="form-control" placeholder="E-mail address" required
               autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" v-model="password" class="form-control" placeholder="Password" required>
        <button class="btn btn-lg btn-block" type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-muted">Hedwig &copy; 2020</p>
      </form>
    </div>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        email: '',
        password: '',
        error: null,
      }
    },
    methods: {
      ...mapActions('common', ['getLogin']),
      async pressed () {
        const userData = await this.getLogin({ email: this.email, password: this.password })
        if (userData) {
          this.$router.push({ name: 'dashboard' })
        }
      },
    },
  }
</script>

<style lang="scss" src="../assets/style/Login.scss"></style>

