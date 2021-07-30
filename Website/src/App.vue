<template>
  <div v-if="isAuthenticated()" id="nav">
    <Header />
    <Footer />
  </div>
  <div v-else >
    <Sidebar />
    <Footer />
  </div>
  <router-view/>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Sidebar
  },
  methods: {
    isAuthenticated() {
      return true;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Open Sans', 'Roboto', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #A54AE6;
}
</style>
