<template>
  <!-- Компонент окна куда выводятся отсортированные релизы / миксы (он много где используется) -->

    <div class="window-wrap">
     
      <!-- Количество найденых релизов -->
      <span class="number-of-releases">Найдено {{count}} релизов</span>

      <!-- Сюда итерируем сами релизы / миксы -->
      <div class="archive-wrap">

        <!-- Итерируемый итем -->
        <div class="release-item" 
          v-for="(release, index) in releases"
          :key="index"
          >
          <!-- Передаем в компонент отвечающий за отображание тегов - массив с тегами -->
          <PrevTagsHeader
            :link-to="linkTo" 
            :tags-array="release.tags"
          />

          <img class="release-image" :src="release.cover" alt="cover" @click="openRelease(release.authors, release.permalink)">
          <PrevInfo 
            :date="release.date"
            :name="release.name"
            :permalink="release.permalink"
            :authors="release.authors"
          />
        </div>
      </div>


      <!-- Пагинация (для визуального представления был использован плагин vuejs-paginate, 
          а сама логика для работы с нашей таблицей лежит в @/mixins/pagination.mixin.js) -->
      <Paginate
        :page-count="5"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :active-class="'page-active'"
        v-model="pageNum"
      />
    </div>
</template>

<script>
import PrevInfo from '@/components/app/PrevInfo.vue'
import PrevTagsHeader from '@/components/app/tags/PrevTagsHeader.vue'
import paginationMixin from '@/mixins/pagination.mixin.js'

export default {
  name: 'Archive-window',
  props: ['releases', 'linkTo', 'count'],
  components: {
    PrevInfo, PrevTagsHeader
  },
  mixins: [ paginationMixin ], // Тут мы инициализируем миксин который нужен для пагинации
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
  
  beforeDestroy() {
    // Когда закрываем этот компонент то чистим стор от тех релизов которые были загружены до этого
    this.$store.commit('clearReleases')
  },
}
</script>

<style scoped>

  /* Обертка под карточки и пагинацию */
  .window-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 200px;
    max-width: 892px;
  }

  /* Спан с количеством найденых релизов */
  .number-of-releases {
    margin-left: auto;
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: 300;
  }


  /* Только для карточек */
  .archive-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  /* Делалает отступ 26 пикселей всем, кроме каждого 3 элемента */
  .release-item:not(:nth-child(3n)) {
    margin-right: 26px;
  }


  /* Карточка релиза */
  .release-item {
    margin-bottom: 60px;
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

