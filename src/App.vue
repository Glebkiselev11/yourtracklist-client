<template>
  <div id="app">
    <Navbar />

    <router-view/>

    <Footer />

  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default {
  components: {
    Navbar, Footer
  }
}
</script>

<style>
  #app {
    max-width: 1200px;
    margin: auto;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: black;
  }

  button {
    border: none;
    background: transparent;
    cursor: pointer;
  }

</style>

