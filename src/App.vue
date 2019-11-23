<template>
  <div id="app">

    <!-- Контейнер с максимальной шириной 1200px -->
    <div class="container">

      <Navbar />

      <router-view class="body"/>

    </div>
    
    <!-- Для футера у нас установлен контейнер в самом футере -->
    <Footer />
  </div>

</template>

<script>
import Navbar from '@/layouts/Navbar'
import Footer from '@/layouts/Footer'
export default {
  components: {
    Navbar, Footer
  }
}
</script>

<style>
  .container {
    max-width: 1200px;
    margin: auto;
  }

  .body {
    min-height: 60vh;
  }

  .status-ok {
    color: green;
  }

  .status-error {
    color: red;
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

  .page-item a {
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

