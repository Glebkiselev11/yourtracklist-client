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
  /* Здесь мы объявляем глобальные переменные для всего приложения */
  :root {
    /* Цвет заднего фона */
    --primary-background-color: white; 

    /* Цвет текста, цвет обводок */
    --primary-color: black;
  }

  .container {
    max-width: 1200px;
    margin: auto;
  }

  #app {
    font-size: 16px;
    /* background-color: var(--primary-background-color); */
  }

  input, textarea {
    background-color: var(--primary-background-color);
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
    color: var(--primary-color);
    cursor: pointer;
  }

  button {
    border: none;
    background: transparent;
    cursor: pointer;
  }


  .archive-title {
    font-size: 2.5rem;
    font-weight: 300;
  }

  /* Пагинация */
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .page-item a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin: 0 5px;
    border: 1px solid var(--primary-color);
  }

  .page-active a {
    background: var(--primary-color);
  }

  .page-active a {
    color: var(--primary-background-color);
  }

</style>

