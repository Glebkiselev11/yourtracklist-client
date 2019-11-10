<template>  
  <!-- Компонент релизов, который показывает последние 4 релиза на главной странице -->
  <div class="wrap">

    <!-- Верхняя шапка с заголовком и кнопкой -->
    <TopBar 
      title="Архив релизов"
    />

    <!-- Обертка под релизы, который мы будем итерировать циклом -->
    <div class="releases-wrap">
      
      <!-- Итерируем карточку релиза -->
      <div class="release-item" 
        v-for="(release, index) in fourLatestReleases"
        :key="index"
        >
        <!-- Передаем в компонент отвечающий за отображание тегов - массив с тегами -->
        <PrevTagsHeader
          link-to="/release-archive/" 
          :tags-array="release.tags"
        />

        <img class="release-image" :src="release.cover" alt="cover">
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
import PrevTagsHeader from '@/components/app/tags/PrevTagsHeader.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'ReleaseArchiveHome',
  components: {
    TopBar, PrevInfo, PrevTagsHeader
  },
  computed: {
    ...mapGetters(['fourLatestReleases'])
  },
}
</script>

<style scoped>
  .wrap {
    margin-top: 150px;
    width: 100%;
    min-height: 525px;
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


  .release-image {
    width: 280px;
    height: 280px;
    margin-bottom: 16px;
  }

</style>

