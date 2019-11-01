<template>  
  <!-- Компонент релизов, который показывает последние 4 релиза на главной странице -->
  <div class="wrap">

    <!-- Верхняя шапка с заголовком и кнопкой -->
    <div class="top-bar">
      <h2>Архив релизов</h2>
      <Button />
    </div>

    <!-- Обертка под релизы, который мы будем итерировать циклом -->
    <div class="releases-wrap">
      
      <!-- Сама карточка релиза -->
      <div class="release-item">
        <span class="release-tags">808</span>
        <img class="release-image" src="https://sun1-26.userapi.com/c857328/v857328358/22c8c/ZyA6w5gy3z8.jpg" alt="">
        <span class="release-date">October 25, 2019</span>
        <p class="release-name">DITA REDRUM — Shadowrun</p>
      </div>

      <!-- Временно пока добавил для визуализации -->
      <div class="release-item">
        <span class="release-tags">808</span>
        <img class="release-image" src="https://sun1-26.userapi.com/c857328/v857328358/22c8c/ZyA6w5gy3z8.jpg" alt="">
        <span class="release-date">October 25, 2019</span>
        <p class="release-name">DITA REDRUM — Shadowrun</p>
      </div>

      <div class="release-item">
        <span class="release-tags">808</span>
        <img class="release-image" src="https://sun1-26.userapi.com/c857328/v857328358/22c8c/ZyA6w5gy3z8.jpg" alt="">
        <span class="release-date">October 25, 2019</span>
        <p class="release-name">DITA REDRUM — Shadowrun</p>
      </div>

      <div class="release-item">
        <span class="release-tags">808</span>
        <img class="release-image" src="https://sun1-26.userapi.com/c857328/v857328358/22c8c/ZyA6w5gy3z8.jpg" alt="">
        <span class="release-date">October 25, 2019</span>
        <p class="release-name">DITA REDRUM — Shadowrun</p>
      </div>




    </div>

  </div>
</template>

<script>
import Button from '@/components/app/Button.vue'
export default {
  name: 'ReleaseArchiveHome',
  components: {
    Button
  }
}
</script>

<style scoped>
  .wrap {
    margin-top: 150px;
    width: 100%;
    min-height: 525px;
  }

  .top-bar {
    width: 100%;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
  }

  .top-bar h2 {
    font-size: 40px;
    font-weight: 300;
  }

  /* Обертка под релизы */
  .releases-wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }


  /* Карточка релиза */
  .release-item {
    width: 280px;
    height: 425px;
    border-top: 1px solid black;
  }

  .release-tags {
    font-size: 14px;
    font-weight: 200;
  }

  .release-image {
    width: 280px;
    height: 280px;
  }

</style>

