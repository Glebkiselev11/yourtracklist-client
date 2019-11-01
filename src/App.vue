<template>
  <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/Navbar'
export default {
  components: {
    navbar
  }
}
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-size: 25px;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: black;
  }

  /* Временно пока сюда скидываем общие стили */
  .release-date {
    font-size: 16px;
    font-weight: 300;
  }

  .release-name {
    font-size: 18px;
    font-weight: 600;
    margin-top: 7px;
  }
</style>

