<template>
  <!-- Это блок который отображается на главной странице в самом верху, у нас тут будет заголовок
  и сбоку рандомно три релиза / микса генерироваться -->
  <div class="hero-wrap">
    <h1>Дискография паблика<br>yourtracklist</h1>

    <!-- Здесь через цикл будем выводить 3 рандомных релиза в будущем -->
    <div class="random-releases-wrap">

      <!-- Релиз, который итерируем 3 раза -->
      <div class="random-release-item" 
        v-for="(element, index) in threeRandomArtistsArray"
        :key="index"
        :class="index < 2 ? 'bottom-border': ''"
      > 
        <!-- Ссылка на альбом, а внутри картинка -->
        <router-link 
          :to="element.nameInfo.href"
          class="image-link"
        >
          <img class="random-release-item--image" :src="element.cover" alt="Release cover">
        </router-link>
        
        <!-- Компонент с информацией о данном релизе -->
        <PrevInfo 
          :date="element.date"
          :nameInfo="element.nameInfo"
          :releaseAuthors="element.authors"
        />
      </div>

    </div>
  </div>
</template>

<script>
import PrevInfo from '@/components/app/PrevInfo.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'Hero',
  data: () => ({
    // Эксперемент с релизаме, где может быть 2 и более исполнителей
    artists: []
  }),
  components: {
    PrevInfo // Компонент с информацией о релизе рядом с обложкой которая
  },
  computed: {...mapGetters(['threeRandomArtistsArray'])},
  
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
    display: flex;
  }
  .bottom-border {
    border-bottom: 1px solid black;
  }

  /* Ссылка на релиз, в которую вшита картинка */
  .image-link {
    width: 150px;
    height: 150px;
    margin-right: 15px;
  }
  .random-release-item--image {
    width: 150px;
    height: 150px;
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