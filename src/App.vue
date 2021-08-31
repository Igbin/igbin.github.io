<template>
  <div id="app">
    <router-view />

  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    // handleResize ({ width, height }) {
    // }
  }

}
</script>


<style lang="scss">
body {
  background-color: black;
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

#app {
  width: 80%;
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
