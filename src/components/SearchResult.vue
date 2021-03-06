<template>
  <!-- Компонент окна куда выводятся результаты поиска -->
  <div class="search-result-wrap container" >

    <!-- Боковая панель (пока используется для авторов) -->
    <div class="search-sidebar-result">
      
      <!-- Сюда выводим найденых авторов -->
      <h5 class="search-result-title">{{authorsTitleText}}</h5>
      
      <ul 
        v-if="searchAuthors.length"
        class="search-authors-list" 
      >
        <li 
          v-for="(author, index) of searchAuthors"
          :key="index"
          class="search-author-item"
        > 
          <a 
            v-html="author.name"
            @click.prevent="goToAuthorPage(author.permalink)"
          ></a>

        </li>
      </ul>
    </div>  <!-- Боковая панель: конец -->
   

    <!-- Основное окно куда выводим релизы / видео / миксы(в будущем)  -->
    <div class="search-main-result">

      <!-- Сюда выводим релизы (если они найдены) -->
      <div class="search-release-wrap">
        <h5 class="search-result-title">{{releasesTitleText}}</h5>

        <AnimationButton
          v-if="searchReleasesCount > 3"
          class="anim-button"
          :title="'Показать все результаты'"
          @click="goToReleasesArchive"
        />

        <ReleasePrevCardItem
          v-for="(release, index) of searchReleases"
          :key="index"
          :release="release"
          :id="'release-item' + index"
          @close="$emit('close')"
        />
      </div>

      <hr>

      <!-- Сюда выводим видео (если они найдены) -->
      <div class="search-videos-wrap">
        <h5 class="search-result-title">{{videosTitleText}}</h5>

        <AnimationButton
          v-if="searchVideosCount > 3"
          class="anim-button"
          :title="'Показать все результаты'"
          @click="goToVideosArchive"
        />

        <!-- Итерируемый итем -->
        <VideoPrevCardItem 
          v-for="(video, index) in searchVideos"
          :key="index"
          :id="'video-item' + index"
          :video="video"
          @close="$emit('close')"
        />
      </div>


    </div> <!-- Основное окно: конец -->
    
    

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ReleasePrevCardItem from '@/components/ReleasePrevCardItem.vue'
import VideoPrevCardItem from '@/components/VideoPrevCardItem.vue'
import AnimationButton from '@/components/AppAnimationButton'

export default {
  name: 'search-result',
  
  components: {
    ReleasePrevCardItem, // Карточка релиза
    VideoPrevCardItem, // Карточка видео
    AnimationButton, // Кнопка 'показать больше'
  },

  props: {
    searchQuery: String, // Поисковой запрос по которому мы нашли релизы / авторов / видео
  },

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
    },

    // В зависимости от кол-ва релизов возвращает валидный текст
    releasesTitleText() {
      const l = this.searchReleasesCount

      switch (true) {
        case l === 0:
          return `Релизов не найдено`
        case l < 2:
          return `Найден ${l} релиз`
        case l < 5:
          return `Найдено ${l} релиза`
        default:
          return `Найдено ${l} релизов`
      }
    },

    // В зависимости от кол-ва видео возвращает валидный текст
    videosTitleText() {
      const l = this.searchVideosCount

      switch (true) {
        case l === 0:
          return `Видео не найдено`
        default:
          return `Найдено ${l} видео`
      }
    }
  },

  // Когда закрываем компонент - чистим мусор в сторе
  beforeDestroy() {
    this.clearSearchReleases()
    this.clearSearchReleasesCount()
    this.clearSearchVideos()
    this.clearSearchVideosCount()
    this.clearSearchAuthors()
  },

  methods: {
    ...mapMutations([
      'clearSearchReleases', 
      'clearSearchReleasesCount', 
      'clearSearchVideos',
      'clearSearchVideosCount',
      'clearSearchAuthors',
    ]),

    // Перекидывает на страницу автора по клику на найденого автора
    goToAuthorPage(permalink) {
      this.$router.push(`/author/${permalink}`)
      // Закрывает окно поиска
      this.$emit('close')
    },

    // В архив найденых релизов
    goToReleasesArchive() {
      this.$router.push({ path: '/releases-archive/' , query: { search: this.searchQuery }})
      // Закрывает окно поиска
      this.$emit('close')
    },

    // В архив найденых видео
    goToVideosArchive() {
      this.$router.push({ path: '/video-archive/' , query: { search: this.searchQuery }})
      // Закрывает окно поиска
      this.$emit('close')

    }
  },
  
}
</script>

<style scoped>
  
  .search-result-title {
    font-size: 1.125rem;
    font-weight: 500;
    grid-area: title;
  }

  .anim-button {
    justify-self: end;
    grid-area: anim-button;
  }

  /* Основное окно результатов */
  .search-result-wrap {
    background-color: var(--primary-background-color);
    display: grid;
    grid-template-columns: 3fr 10fr;
    grid-gap: 3em;
    padding-bottom: 5em; 
  }


  /* Для вывода авторов */
  .search-authors-list {
    margin-top: 20px;
    
  }
  .search-author-item {
    font-size: 1.125rem;
    font-weight: 300;
    line-height: 150%;
  }

  /* Основная часть, куда мы выводим релизы / видео / миксы */
  .search-main-result {
    display: grid;
    grid-gap: 3rem;
  }

  /* Под релизы */
  .search-release-wrap {
    display: grid;
    grid-template-areas: 
      "title title anim-button"
      "rel-item0 rel-item1 rel-item2";
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1.5em 1em;
  }
  #release-item0 {
    grid-area: rel-item0;
  }
  #release-item1 {
    grid-area: rel-item1;
  }
  #release-item2 {
    grid-area: rel-item2;
  }

  /* Под видео */
  .search-videos-wrap {
    display: grid;
    grid-template-areas: 
      "title title anim-button"
      "video-item0 video-item1 video-item2";
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1.5em 1em;
  }
  #video-item0 {
    grid-area: video-item0;
  }
  #video-item1 {
    grid-area: video-item1;
  }
  #video-item2 {
    grid-area: video-item2;
  }
  




  

  
</style>