<template>
  <div id="app">
    <Navbar />

    <router-view class="body"/>

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

  .body {
    min-height: 60vh;
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


  .archive-title {
    font-size: 40px;
    font-weight: 300;
  }

  /* Пагинация */
  .pagination {
    display: flex;
    width: 300px;
    justify-content: space-between;
    align-items: baseline;
  }

  .page-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid black;
  }

  .page-active {
    background: black;
  }

  .page-active a {
    color: white;
  }

</style>

