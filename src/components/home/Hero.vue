<template>
  <!-- Это блок который отображается на главной странице в самом верху, у нас тут будет заголовок
  и сбоку рандомно три релиза / микса генерироваться -->
  <div class="hero-wrap">
    <h1>Дискография паблика<br>yourtracklist</h1>

    <!-- Здесь через цикл будем выводить 3 рандомных релиза в будущем -->
    <div class="random-releases-wrap">

      <!-- Релиз, который итерируем 3 раза -->
      <div class="random-release-item bottom-border">
        <img class="random-release-item--image" src="https://sun1-26.userapi.com/c857328/v857328358/22c8c/ZyA6w5gy3z8.jpg" alt="Release image">
        <span class="random-release-item--date">October 27, 2019</span>
        <p class="random-release-item--name">DITA REDRUM — Shadowrun</p>
      </div>

      <!-- То что ниже это временно для демонстрации, потому что потом мы это будем выводить через цикл -->
      <div class="random-release-item bottom-border">
        <img class="random-release-item--image" src="https://sun1-26.userapi.com/c857328/v857328358/22c8c/ZyA6w5gy3z8.jpg" alt="Release image">
        <span class="random-release-item--date">October 27, 2019</span>
        <p class="random-release-item--name">DITA REDRUM — Shadowrun</p>
      </div>

      <div class="random-release-item">
        <img class="random-release-item--image" src="https://sun1-26.userapi.com/c857328/v857328358/22c8c/ZyA6w5gy3z8.jpg" alt="Release image">
        <span class="random-release-item--date">October 27, 2019</span>
        <p class="random-release-item--name">DITA REDRUM — Shadowrun</p>
      </div>



    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  
}
</script>

<style scoped> 

  .hero-wrap {
    margin-top: 50px;
    height: 510px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between
  }

  .hero-wrap h1 {
    font-size: 50px;
  }

  /* Стили для рандомных релизов */
  .random-release-item {
    width: 390px;
    height: 165px;
    margin-top: 15px;
  }
  .bottom-border {
    border-bottom: 1px solid black;
  }

  .random-release-item--image {
    width: 150px;
    height: 150px;
    float: left;
    margin-right: 15px;
  }

  .random-release-item--date {
    font-size: 16px;
    font-weight: 300;
    display: block;
    margin-right: auto;
  }

  .random-release-item--name {
    display: block;
    font-size: 18px;
    margin-top: 15px;
    font-weight: 600;
    margin-right: auto;
  }

  
</style>