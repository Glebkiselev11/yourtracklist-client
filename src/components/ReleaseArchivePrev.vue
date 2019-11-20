<template>  
  <!-- Компонент релизов, который показывает 4 релиза, которые мы ему передаем как пропсы,
  используется на главной странице и в дискографии автора одновременно -->
  <div class="wrap">

    <!-- Верхняя шапка с заголовком и кнопкой -->
    <TopBar 
      title="Релизы"
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
          link-to="/releases-archive/" 
          :tags-array="release.tags"
        />

        <!-- Здесь надо будет пофиксить переход к карточки релиза, потому что пока мы переходим по 1 исполнителю, а нужно по всем через + (niur+88b Например) -->
        <img class="release-image" :src="release.cover" alt="cover" @click="openRelease(release.authors, release.permalink)">
        <PrevInfo 
          :date="release.date"
          :name="release.name"
          :permalink="release.permalink"
          :authors="release.authors"
        />
      </div>

    </div>
  </div>
</template>

<script>
import TopBar from '@/components/app/TopBar.vue'
import PrevInfo from '@/components/app/PrevInfo.vue'
import PrevTagsHeader from '@/components/app/tags/PrevTagsHeader.vue'

export default {
  name: 'ReleaseArchivePrev',
  props: ['fourLatestReleases'],
  components: {
    TopBar, PrevInfo, PrevTagsHeader
  },
  
  methods: {
    // Открывает релиз (по клику на обложку)
    openRelease(authors, release) {

      // Возможно это костыль, но по сути у нас не бывает больше 4 авторов в одном релизе
      if (authors.length === 1) {
        this.$router.push(`/release-cart/${authors[0]['permalink']}/${release}`)
      } else if (authors.length === 2) {
        this.$router.push(`/release-cart/${authors[0]['permalink']}+${authors[1]['permalink']}/${release}`)
      } else if (authors.length === 3) {
        this.$router.push(`/release-cart/${authors[0]['permalink']}+${authors[1]['permalink']}+${authors[2]['permalink']}/${release}`)
      } else {
        this.$router.push(`/release-cart/${authors[0]['permalink']}+${authors[1]['permalink']}+${authors[2]['permalink']}+${authors[3]['permalink']}/${release}`)
      }
    }
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
    justify-content: flex-start;
  }

  .releases-wrap:not(:first-child) .release-item {
    margin-right: 26px;
  }


  /* Карточка релиза */
  .release-item {
    width: 280px;
    height: 425px;
    border-top: 1px solid black;
  }


  .release-image {
    cursor: pointer;
    width: 280px;
    height: 280px;
    margin-bottom: 16px;
  }

</style>

