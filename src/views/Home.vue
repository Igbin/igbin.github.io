<template>
  <div class="main-wrapper">
    <Header :user="parent" />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/baccaratEntry">baccaratEntry</router-link>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header,
  },
  data() {
    return {
      parent: this.$options.name
    }
  }
}
</script>
