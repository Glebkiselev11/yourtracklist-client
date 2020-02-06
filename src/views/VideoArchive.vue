<template>
  <!-- Страница Архива видео записей -->
  <div class="wrap">
 
    <!-- Верхний блок с заголовком и кнопкой по которой можно перейти к релизам, если они есть у этого автора -->
    <div class="archive-title-wrap">
      <!-- Локальное название артиста -->
      <h1 class="archive-title" v-html="titleGenerator"></h1>

      <!-- Кнопка которая переходит к релизам артиста (если они у него есть) -->
      <ArrowButton 
        v-if="this.thereIsReleases && this.localNameAuthor"
        :title="'Релизы ' + this.localNameAuthor"
        :arrow-color="'#000'"
        :forward="true"
        :styles="'color: black; font-size: 25px; font-weight: 300;'"
        @click="goToReleasesAuthor"
      />
    </div>


    <div class="container">

      <!-- Боковая панель с сортировкой -->
      <SortSideVideoArchive />
      
      <!-- Прелоадер -->
      <Loader v-if="loading"/>
      
      <!-- Основное окно куда выводим видео -->
      <div v-else class="window-wrap">
     
        <!-- Количество видео -->
        <span class="number-of-releases" v-if="count > 0">Найдено {{count}} видео</span>

        <!-- Сюда итерируем сами релизы / миксы -->
        <div class="archive-wrap">

          <!-- Итерируемый итем -->
          <VideoItem 
            v-for="(video, index) in videos"
            :key="index"
            :video="video"
          />
        </div>


        <!-- Пагинация (для визуального представления был использован плагин vuejs-paginate, 
          а сама логика для работы с нашей таблицей лежит в @/mixins/pagination.mixin.js) -->
        <Paginate
          v-if="pageCount && (count > pageSize)"
          :page-count="pageCount"
          v-model="pageNum"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination'"
          :page-class="'page-item'"
          :active-class="'page-active'"
        />
      </div>

    </div>

  </div>
</template>

<script> 
import { mapGetters, mapMutations, mapActions } from 'vuex'
import SortSideVideoArchive from '@/components/SortSideVideoArchive.vue'
import paginationMixin from '@/mixins/pagination.mixin.js'
import VideoItem from '@/components/app/video/VideoPrevCardItem.vue'

export default {
  name: 'Video-archive',

  components: {
    SortSideVideoArchive,
    VideoItem 
  },

  mixins: [ paginationMixin ], // Тут мы инициализируем миксин который нужен для пагинации

  data: () => ({
    loading: true, // Визуальное отображение загрузки
  }),

  computed: {
    ...mapGetters([
      'videos', // Карточки превьюх видео
      'count', // Количество найденых видео по нашим фильтрам (всего сколько найдено во всей базе)
      'pageSize', // Размер одной страницы (для пагинации)
      'localNameAuthor', // Локальное название автора, для которого мы ищем видео
      'thereIsReleases', // Информация о том, есть ли релизы (есть ли мы запрашивали видео для конкретного автора) у автора
      'searchQueryForVideo', // Поисковой запрос для видео, который мы получаем из квери параметров
    ]),

    // Генерирует валидный заголовок в зависимости от того на странице видео автора мы , или на страницы найденых видео 
    titleGenerator() {
      if (this.$route.query.author && this.localNameAuthor) {
        return `Видео <b>${this.localNameAuthor}</b>`
      } 
  
      if (this.searchQueryForVideo) {
        return `Видео по запросу <mark>${this.searchQueryForVideo}</mark>`
      } 
      return `Видео`
    }
  },

  watch: {
    // Следит за изменениями роутера
    async '$route' (to) {
      // Перед сменой роутера, чистим стор от хлама на всякий случай
      this.clearSortingVideo()
      this.clearSelectTagsForVideo()

      // Ставит в $store теги из urla (нужно для того, чтобы когда мы в ручную меняем url 
      // либо жмем по тегам в карточках и мы дополняем эти теги в store)
      if (to.query.tag) this.setSelectTagsForVideo(to.query.tag)
      if (to.query.sorting) this.setSortingVideo(to.query.sorting)

      // Устанавливаем поисковой запрос (если он есть)
      if (to.query.search) {
        this.setSearchQueryForVideo(to.query.search)
      } else {
        // А если его нет, то чистим стор от поискового запроса
        this.clearSearchQueryForVideo()
      }
      
      // Устанавливаем в стор пермалинк автора если он есть
      if (to.query.author) {
        this.setAuthorPermalinkForVideos(to.query.author)
      } else {
        // А если в роуторе нету квери параметра, то чистим инфу о авторе из стора
        this.clearLocalNameAuthor()
        this.clearAuthorPermalinkForVideos()
      } 
        
      // До запроса включаем лоадер
      this.loading = true

      // И как только роутер меняется делает запрос на бэк с новыми фильтрами, которые у нас храняться в стейте
      await this.getVideo()

      // Как запрос прошел - выключаем
      this.loading = false
    }
  },

  async created() {
    // При открытие в раз , мы смотрим что у нас есть в роуторе
    // Нужно чтобы селектор, где мы выбираем тип сортировки - синхронизировался с адресной строкой
    switch(this.$route.query.sorting) {
      case 'old' : 
        this.setSortingVideo('old')
        break
      case 'random' :
        this.setSortingVideo('random')
        break
      case 'artist' :
        this.setSortingVideo('artist')
        break
      // По-умолчанию в сторе у нас стоит сортировка "new"
    }

    // Если есть артист в query параметрах, то этого личная дискография и мы загружаем все релизы только этого автора
    if (this.$route.query.author) this.setAuthorPermalinkForVideos(this.$route.query.author)
 
    // Устанавлием в store теги релизов которые выбраны
    if (this.$route.query.tag) this.setSelectTagsForVideo(this.$route.query.tag)

    // Устанавливаем в стор номер текущей страницы из роутера
    this.setPageNum(+this.$route.query.page || 1)

    // Устанавливаем поисковой запрос (если он есть)
    if (this.$route.query.search) this.setSearchQueryForVideo(this.$route.query.search)

    // Подгружаем с бэкенда на основе фильтров нужные видео
    await this.getVideo()
    
    // Как только загрузили все, мы выключаем лоадер
    this.loading = false
  },

  // Как только мы закрываем этот раздел, мы подчищаем страницу от тегов сортировки
  beforeDestroy() {
    this.clearSortingVideo()
    this.clearAuthorPermalinkForVideos()
    this.clearSelectTagsForVideo()
    this.clearVideos()
    this.clearLocalNameAuthor()
    this.clearSearchQueryForVideo()
  },

  methods: {
    ...mapMutations([
      'setSortingVideo', // Устанавливает сортировку для видео
      'clearSortingVideo', // Очищает сортировку
      'setAuthorPermalinkForVideos', // Устанавливает пермалинк для автора в стор (если он есть в квери параметрах)
      'clearAuthorPermalinkForVideos', // Очищает пермалинк
      'setSelectTagsForVideo', // Устанавливает выбранные теги в стор
      'clearSelectTagsForVideo', // Очищает теги
      'setPageNum', // Устанавливает номер страницы (пагинация)
      'setSearchQueryForVideo', // Устанавливает поисковой запрос для видео
      'clearSearchQueryForVideo', // Очищает поисковой запрос для видео
      'clearLocalNameAuthor', // Очищает локальное имя автора
      'clearVideos', // Очищает видео
    ]),

    ...mapActions([
      'getVideo', // Получает видео
    ]),

    // Метод для стрелки в самом верху, который перекидывает к релизам автора
    goToReleasesAuthor() {
      this.$router.push({ path: '/releases-archive', query: {author: this.$route.query.author}})
    }
  },

}
</script>

<style scoped>
  .wrap {
    border-top: 1px solid black;
    padding-top: 10px;
  }

  .archive-title-wrap {
    display: flex;
    justify-content: space-between;
  }

  .container {
    margin-top: 50px;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  /* Обертка под карточки и пагинацию */
  .window-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 200px;
    width: 892px;
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
  .video-item:not(:nth-child(3n)) {
    margin-right: 26px;
  }


  /* Карточка релиза */
  .video-item {
    margin-bottom: 60px;
  }
</style>

