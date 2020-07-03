<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    created () {
      this.getAuthData()
    },
    methods: {
      ...mapActions('common', ['getAuth']),
      getAuthData () {
        this.getAuth()
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #1d1e2a;
  }
  html {
    background-color: #1d1e2a;
  }
</style>
