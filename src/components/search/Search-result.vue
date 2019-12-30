<template>
  <!-- Компонент окна куда выводятся результаты поиска -->
  <div class="search-result-wrap container" >

    <!-- Сюда выводим найденых авторов -->
    <div class="search-authors-result">
      <h5 class="search-result-title">{{authorsTitleText}}</h5>

      <ul class="search-authors-list" v-if="searchAuthors.length">
        <li 
        v-for="(author, index) of searchAuthors"
        :key="index"
        class="search-author-item"
        >{{author.name}}</li>
      </ul>

    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'search-result',
  computed: {
    ...mapGetters([
      'searchReleases', // Найденые три релиза по поиску
      'searchReleasesCount', // Кол-во сколько всего найдено релизов по запросу
      'searchVideos', // Найдены три видео по поиску
      'searchVideosCount', // кол-во сколько всего найдено видое по запросу
      'searchAuthors', // Найденые авторы по запросу
    ]),

    // В зависимости от кол-ва авторов возвращает валидный текст
    authorsTitleText() {
      const l = this.searchAuthors.length

      switch (true) {
        case l === 0:
          return `Авторов не найдено`
        case l < 2:
          return `Найден ${l} автор`
        case l < 5:
          return `Найдено ${l} автора`
        default:
          return `Найдено ${l} авторов`
      }
      
    }
  },
  methods: {
    ...mapMutations([
      'clearSearchReleases', 
      'clearSearchReleasesCount', 
      'clearSearchVideos',
      'clearSearchVideosCount',
      'clearSearchAuthors',
    ]),
  },
  // Когда закрываем компонент - чистим мусор в сторе
  beforeDestroy() {
    this.clearSearchReleases()
    this.clearSearchReleasesCount()
    this.clearSearchVideos()
    this.clearSearchVideosCount()
    this.clearSearchAuthors()
  },
}
</script>

<style scoped>
  .search-result-wrap {
    margin-top: 10px;
    background-color: var(--primary-background-color);
  }

  .search-result-title {
    font-size: 1.125rem;
    font-weight: 500;
  }
</style>