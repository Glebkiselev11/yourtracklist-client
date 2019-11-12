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
        <!-- Передаем в компонент отвечающий за отображание тегов - массив с тегами -->
        <PrevTagsHeader 
          link-to="/mixes-archive/" 
          :tags-array="release.tags"
        />

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
import TopBar from '@/components/app/TopBar.vue'
import PrevInfo from '@/components/app/PrevInfo.vue'
import PrevTagsHeader from '@/components/app/tags/PrevTagsHeader.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'MixesHome',
  components: {
    TopBar, PrevInfo, PrevTagsHeader
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


  .mix-image {
    width: 280px;
    height: 280px;
    margin-bottom: 16px;
  }
</style>