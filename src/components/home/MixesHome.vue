<template>
  <!-- Компонент миксов, который отображаем на главной странице -->
  <div class="wrap">
    <TopBar 
      Title="Миксы"
    />
    <div class="mixes-wrap">

      <!-- Сама карточка микса -->
      <div class="mix-item">
        <span class="mix-tags">techno</span>
        <img class="mix-image" src="https://sun9-37.userapi.com/c855632/v855632495/126f60/Ob3bw1S-FoM.jpg" alt="">
        <span class="mix-date">October 25, 2019</span>
        <p class="mix-name">yourtracklist — techno mix #5</p>
      </div>

      <!-- Временно пока добавил для визуализации -->
      <div class="mix-item">
        <span class="mix-tags">808</span>
        <img class="mix-image" src="https://sun1-26.userapi.com/c857328/v857328358/22c8c/ZyA6w5gy3z8.jpg" alt="">
        <span class="mix-date">October 25, 2019</span>
        <p class="mix-name">DITA REDRUM — Shadowrun</p>
      </div>

      <div class="mix-item">
        <span class="mix-tags">808</span>
        <img class="mix-image" src="https://sun1-26.userapi.com/c857328/v857328358/22c8c/ZyA6w5gy3z8.jpg" alt="">
        <span class="mix-date">October 25, 2019</span>
        <p class="mix-name">DITA REDRUM — Shadowrun</p>
      </div>

      <div class="mix-item">
        <span class="mix-tags">808</span>
        <img class="mix-image" src="https://sun1-26.userapi.com/c857328/v857328358/22c8c/ZyA6w5gy3z8.jpg" alt="">
        <span class="mix-date">October 25, 2019</span>
        <p class="mix-name">DITA REDRUM — Shadowrun</p>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/home/TopBar.vue'
export default {
  name: 'MixesHome',
  components: {
    TopBar
  }
}
</script>

<style scoped>
  .wrap {
    margin-top: 150px;
    width: 100%;
  }

  .mixes-wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  /* Карточка микса */
  .mix-item {
    width: 280px;
    height: 425px;
    border-top: 1px solid black;
  }

  .mix-tags {
    font-size: 14px;
    font-weight: 200;
  }

  .mix-image {
    width: 280px;
    height: 280px;
  }
</style>