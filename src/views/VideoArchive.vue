<template>
  <!-- Страница Архива видео записей -->
  <div class="wrap">

    <!-- Отображаем если нет автора в квери параметрах и не загружены данные о авторе -->
    <h1 v-if="!this.$route.query.author && !this.localNameAuthor" class="archive-title">Видео</h1>
    
    <!-- Отображаем этот блок, если это релизы определенного автора -->
    <div v-else class="archive-title-wrap">
      <!-- Локальное название артиста -->
      <h1 class="archive-title">Видео <b>{{this.localNameAuthor}}</b></h1>

      <!-- Кнопка которая переходит к видео записям артиста -->
      <ArrowButton 
        :title="'Релизы ' + this.localNameAuthor"
        :arrow-color="'#000'"
        :forward="true"
        :styles="'color: black; font-size: 25px; font-weight: 300;'"
        @click="goToReleasesAuthor"
      />
    </div>


    <div class="container">

      <!-- Боковая панель с сортировкой -->
      <SideBarForVideo 
        :sorting-video="this.sortingVideo"
        :select-tags-for-video="this.selectTagsForVideo"
        :videos-tags="this.videosTags"
      />
      
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
import {mapGetters} from 'vuex'
import SideBarForVideo from '@/components/side-sort-bar/SideBarForVideo.vue'
import paginationMixin from '@/mixins/pagination.mixin.js'
import VideoItem from '@/components/app/video/VideoPrevCartItem.vue'

export default {
  name: 'Video-archive',
  data: () => ({
    loading: true, // Визуальное отображение загрузки
  }),
  components: {
    SideBarForVideo,
    VideoItem 
  },
  mixins: [ paginationMixin ], // Тут мы инициализируем миксин который нужен для пагинации
  computed: {
    ...mapGetters([
      'videos', // Карточки превьюх видео
      'count', // Количество найденых видео по нашим фильтрам (всего сколько найдено во всей базе)
      'pageSize', // Размер одной страницы (для пагинации)
      'videosTags', // Доступные теги видео записей
      'sortingVideo', // Тип сортировки видео
      'localNameAuthor', // Локальное название автора, для которого мы ищем видео
      'selectTagsForVideo', // Выбранные теги для поиска видео (где стоят галки)
    ]),

  },
  methods: {
    // Метод для стрелки в самом верху, который перекидывает к релизам автора
    goToReleasesAuthor() {
      this.$router.push({ path: '/releases-archive', query: {author: this.$route.query.author}})
    }
  },
  async created() {
    // При открытие в раз , мы смотрим что у нас есть в роуторе
    // Нужно чтобы селектор, где мы выбираем тип сортировки - синхронизировался с адресной строкой
    switch(this.$route.query.sorting) {
      case 'old' : 
        this.$store.commit('setSortingVideo', 'old')
        break
      case 'random' :
        this.$store.commit('setSortingVideo', 'random')
        break
      case 'artist' :
        this.$store.commit('setSortingVideo', 'artist')
        break
      // Если там что то другое, иили вообще нет типа сортировки, то по умолчанию ставим как new
      default:
        this.$store.commit('setSortingVideo', 'new')
        break
    }

    // Если есть артист в query параметрах, то этого личная дискография и мы загружаем все релизы только этого автора
    if (this.$route.query.author) {
      this.$store.commit('setAuthorPermalinkForVideos', this.$route.query.author)
    }

    // Устанавлием в store теги релизов которые выбраны
    this.$store.commit('setSelectTagsForVideo', this.$route.query.tag)

    // Устанавливаем в стор номер текущей страницы из роутера
    this.$store.commit('setPageNum', +this.$route.query.page || 1)

    // Очищаем локальное имя автора, чтобы если мы загрузили нового, старое название не мелькнуло в заголовке
    this.$store.commit('clearLocalNameAuthor')

    // Подгружаем с бэкенда на основе фильтров нужные видео
    await this.$store.dispatch('getVideo')
    
    // Как только загрузили все, мы выключаем лоадер
    this.loading = false
  },

  watch: {
    // Следит за изменениями роутера
    async '$route' (to) {
      

      // Ставит в $store теги из urla (нужно для того, чтобы когда мы в ручную меняем url 
      // либо жмем по тегам в карточках и мы дополняем эти теги в store)
      this.$store.commit('setSelectTagsForVideo', to.query.tag)

      // Устанавливаем в стор пермалинк автора если он есть
      this.$store.commit('setAuthorPermalinkForVideos', this.$route.query.author)

      // И очищаем старого автора из стора (его локальное имя) если в routore нету автора
      // Это нужно, чтобы автор на время не пропадал, если мы шелкаем фильтры 
      if (!this.$route.query.author) {
        this.$store.commit('clearLocalNameAuthor')
      }
      

      // До запроса включаем лоадер
      this.loading = true

      // И как только роутер меняется делает запрос на бэк с новыми фильтрами, которые у нас храняться в стейте
      await this.$store.dispatch('getVideo')

      // Как запрос прошел - выключаем
      this.loading = false
    }
  },
  // Как только мы закрываем этот раздел, мы подчищаем страницу от тегов сортировки
  beforeDestroy() {
    this.$store.commit('clearSortingVideo')
    this.$store.commit('clearAuthorPermalinkForVideos')
    this.$store.commit('clearSelectTagsForVideo')
    this.$store.commit('clearVideos')
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

