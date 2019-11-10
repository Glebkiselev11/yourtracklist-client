<template>
  <!-- Компонент окна куда выводятся отсортированные релизы / миксы (он много где используется) -->
  <div class="window-wrap">

    <!-- Количество найденых релизов -->
    <span class="number-of-releases">Найдено 50 релизов</span>

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

        <img class="release-image" :src="release.cover" alt="cover">
        <PrevInfo 
          :date="release.date"
          :nameInfo="release.nameInfo"
          :releaseAuthors="release.authors"
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
  props: ['releases', 'linkTo'],
  components: {
    PrevInfo, PrevTagsHeader
  },
  mixins: [ paginationMixin ], // Тут мы инициализируем миксин который нужен для пагинации
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
    width: 892px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
  }


  /* Карточка релиза */
  .release-item {
    margin-bottom: 60px;
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

