<template>
  <!-- Компонент лейбла, который располагается на главной странице -->
  <div class="wrap">
    <TopBar 
      title="Лейбл yourtracklist"    
    />

    <!-- Обертка под релизы, который мы будем итерировать циклом -->
    <div class="releases-wrap">
      
      <!-- Итерируем карточку релиза -->
      <div class="release-item" 
        v-for="(release, index) in fourLatestReleases"
        :key="index"
        >
        <!-- Итерируем теги (пока только как названия) -->

        <PrevTagsHeader 
          link-to="/label-archive/" 
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

    <!-- Призыв стать участником лейбла -->
    <div class="label-promo">
      
      <ArrowButton 
        class="label-button"
        title="Стать участником лейбла"
        styles="font-size: 30px; font-weight: 300; color: white;"
        arrow-color='white'
        forward="true"
      /> 
    </div>

  </div>
</template>

<script>
import TopBar from '@/components/home/TopBar.vue'
import ArrowButton from '@/components/app/ArrowButton.vue'
import PrevInfo from '@/components/app/PrevInfo.vue'
import PrevTagsHeader from '@/components/app/tags/PrevTagsHeader.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'LabelHome',
  components: {
    TopBar, ArrowButton, PrevInfo, PrevTagsHeader
  },
  computed: {
    // Пока временно получает из стора 4 последних релиза (не лейбла)
    ...mapGetters(['fourLatestReleases'])
  },
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
    display: inline-block;
    margin-top: 7px;
    margin-bottom: 10px;
    margin-right: 5px;
    font-size: 14px;
    font-weight: 300;
  }

  .release-image {
    width: 280px;
    height: 280px;
    margin-bottom: 16px;
  }


  /* Промо лейбла */
  .label-promo {
    margin-top: 100px;
    width: 100%;
    height: 200px;
    background: #1E1E1E;
    position: relative;
  }

  .label-button {
    position: absolute;
    right: 25px;
    bottom: 25px;
  }

</style>