<template>
  <!-- Компонент миксов, который отображаем на главной странице -->
  <div class="wrap">
    <TopBar 
      title="Миксы"
    />


      <!-- Сама карточка микса -->
    <div class="mixes-wrap">
      
      <!-- Итерируем карточку релиза -->
      <div class="mix-item" 
        v-for="(release, index) in fourLatestMixes"
        :key="index"
        >
        <!-- Итерируем теги (пока только как названия) -->
        <span 
          class="mix-tags" 
          v-for="tags in release.tags"
          :key="tags"
        >{{tags}}</span>

        <img class="mix-image" :src="release.cover" alt="cover" >
        <PrevInfo 
          :date="release.date"
          :nameInfo="release.nameInfo"
          :releaseAuthors="release.authors"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/home/TopBar.vue'
import PrevInfo from '@/components/app/PrevInfo.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'MixesHome',
  components: {
    TopBar, PrevInfo
  },
  computed: {
    ...mapGetters(['fourLatestMixes'])
  },
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
    display: inline-block;
    margin-top: 7px;
    margin-bottom: 10px;
    margin-right: 5px;
    font-size: 14px;
    font-weight: 300;
  }

  .mix-image {
    width: 280px;
    height: 280px;
    margin-bottom: 16px;
  }
</style>