<template>
  <!-- Компонент лейбла, который располагается на главной странице -->
  <div class="wrap">
    <TopBar 
      title="Лейбл yourtracklist"    
    />

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

    <!-- Призыв стать участником лейбла -->
    <div class="label-promo">

      <div class="label-promo-title-wrap">
        <button class="label-promo-title">Стать участником лейбла</button>
        <span class="arraw"></span>
      </div>
      
    </div>

  </div>
</template>

<script>
import TopBar from '@/components/home/TopBar.vue'
export default {
  name: 'LabelHome',
  components: {
    TopBar
  }
}
</script>

<style scoped>
  .wrap {
    margin-top: 150px;
    width: 100%;
    height: 100vh;
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


  /* Промо лейбла */
  .label-promo {
    margin-top: 100px;
    width: 100%;
    height: 200px;
    background: #1E1E1E;
    position: relative;
  }

  .label-promo-title-wrap {
    position: absolute;
    right: 25px;
    bottom: 25px;
  }

  .label-promo-title {
    color: white;
    font-size: 30px;
    font-weight: 300;
    z-index: 3;
  }
  
  .arraw {
    width: 50px;
    height: 28px;
    position: absolute;
    left: -80px;
    top: 5px;
    background: url('~@/../public/img/appicons/arrow.svg');
    transition: all 400ms ease; 
  }

  .label-promo-title:hover ~ .arraw {
    transition: all 0.5s ease;
    transform: translateX(10px)
  }
</style>