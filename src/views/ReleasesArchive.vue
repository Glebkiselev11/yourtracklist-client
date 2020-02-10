<template>
  <!-- Страница релизов, где есть сайд бар с фильтрам и основное поле куда мы выводим релизы -->
  <div class="wrap">

    <!-- Верхний блок с заголовком и кнопкой по которой можно перейти к видео, если они есть у этого автора -->
    <div class="archive-title-wrap">
      <!-- Локальное название артиста -->
      <h1 
        v-html="titleGenerator"
        class="archive-title" 
      ></h1>

      <!-- Кнопка которая переходит к видео записям артиста -->
      <ArrowButton 
        v-if="this.thereIsVideos && this.localNameAuthor"
        :title="'Видео ' + this.localNameAuthor"
        :arrow-color="'#000'"
        :forward="true"
        :styles="'color: black; font-size: 25px; font-weight: 300;'"
        @click="goToVideosAuthor"
      />
    </div>
    
    
    <div class="container">

      <!-- Боковая сортировка -->
      <SortSideReleasesArchive />
      
      <!-- Прелоадер -->
      <Loader v-if="loading"/>
      
      <!-- Основное окно куда выводим релизы -->
      <div 
        v-else 
        class="window-wrap"
      >
     
        <!-- Количество найденых релизов -->
        <span 
          v-if="count > 0"
          class="number-of-releases" 
        >{{countText}}
        </span>

        <!-- Сюда итерируем сами релизы -->
        <div class="archive-wrap">

          <!-- Итерируемый итем карточки релиза -->
          <ReleasePrevCardItem 
            v-for="(release, index) of releases"
            :key="index"
            :release="release"
          />
        </div>


        <!-- Пагинация (для визуального представления был использован плагин vuejs-paginate, 
          а сама логика для работы с нашей таблицей лежит в @/mixins/pagination.mixin.js) -->
        <Paginate
          v-if="pageCount && (count > pageSize)"
          v-model="pageNum"
          :page-count="pageCount"
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
import SortSideReleasesArchive from '@/components/SortSideReleasesArchive.vue'
import ReleasePrevCardItem from '@/components/ReleasePrevCardItem.vue'
import paginationMixin from '@/mixins/pagination.mixin.js'

export default {
  name: 'Releases-archive',

  components: {
    SortSideReleasesArchive, // Боковая панель с фильтрами и сортировками
    ReleasePrevCardItem, // Итем релиза
  },

  mixins: [ paginationMixin ], // Тут мы инициализируем миксин который нужен для пагинации

  data: () => ({
    loading: true, // Визуальное отображение загрузки
  }),

  computed: {
    ...mapGetters([
      'releases', // Карточки релизов
      'count', // Количество найденых релизов по нашим фильтрам (всего сколько найдено во всей базе)
      'localNameAuthor', // Локальное название автора, для которого мы ищем релизы
      'pageSize', // Размер одной страницы (для пагинации)
      'thereIsVideos', // Информация о том, есть ли видео (есть ли мы запрашивали релизы для конкретного автора) у автора
      'searchQueryForReleases', // Поисковой запрос для релизов, который мы получаем из квери параметров
    ]),

    // Вычисляет текст записи исходя из количества релизов
    countText() {
      if (this.count == 1) {
        return `Найден 1 релиз`
      } 
      if (this.count <= 4) {
        return `Найдено ${this.count} релиза`
      }      
      return `Найдено ${this.count} релизов`
    },

    // Генерирует валидный заголовок в зависимости от того на странице релизов автора мы , или на страницы найденых релизов 
    titleGenerator() {
      if (this.$route.query.author && this.localNameAuthor) {
        return `Релизы <b>${this.localNameAuthor}</b>`
      } 
  
      if (this.searchQueryForReleases) {
        return `Релизы по запросу <mark>${this.searchQueryForReleases}</mark>`
      } 
        
      return `Релизы`
    }
  },

  watch: {
    // Следит за изменениями роутера
    async '$route' (to) {
      //  Сначала чистим из стора старые параметры 
      this.clearSortingReleases()
      this.clearSelectTagsForReleases()

      // Ставит в $store теги из urla (нужно для того, чтобы когда мы в ручную меняем url 
      // либо жмем по тегам в карточках - мы дополняем эти теги в store)
      this.setSelectTagsForReleases(to.query.tag)
      this.setSortingReleases(to.query.sorting)
      this.setMinTracksOfReleases(+to.query.min)
      this.setMaxTracksOfReleases(+to.query.max)

      // Устанавливаем поисковой запрос (если он есть)
      if (to.query.search) {
        this.setSearchQueryForReleases(to.query.search)
      } else {
        // А если нету, то подчищаем за ним в сторе
        this.clearSearchQueryForReleases()
      }

      // Устанавливаем в стор пермалинк автора если он есть
      if (to.query.author) {
        this.setAuthorPermalinkForReleases(to.query.author)
      } else {
        // А если в роуторе нету квери параметра, то чистим инфу о авторе из стора
        this.clearLocalNameAuthor()
        this.clearAuthorPermalinkForReleases()
      }

      // До запроса включаем лоадер
      this.loading = true
      // И как только роутер меняется делаем запрос на бэк с новыми фильтрами, которые у нас храняться в стейте
      await this.getReleases()
      // Как запрос прошел - выключаем лоадер
      this.loading = false
    }
  },

  async created() {
    // При открытие в первый раз сортировки, мы смотрим что у нас есть в роуторе
    // Нужно чтобы селектор, где мы выбираем тип сортировки - синхронизировался с адресной строкой
    switch(this.$route.query.sorting) {
      case 'old' : 
        this.setSortingReleases('old')
        break
      case 'random' :
        this.setSortingReleases('random')
        break
      case 'artist' :
        this.setSortingReleases('artist')
        break
      // По-умолчанию в сторе у нас стоит сортировка "new"
    }

    // Если есть артист в query параметрах, то этого личная дискография и мы загружаем все релизы только этого автора
    if (this.$route.query.author) this.setAuthorPermalinkForReleases(this.$route.query.author)
    
    // Устанавлием в store теги релизов которые выбраны (если они есть)
    if (this.$route.query.tag) this.setSelectTagsForReleases(this.$route.query.tag)

    // Устанавливаем в стор номер текущей страницы из роутера
    this.setPageNum(+this.$route.query.page || 1)

    // Устанавливаем поисковой запрос (если он есть)
    if (this.$route.query.search) this.setSearchQueryForReleases(this.$route.query.search)

    // Вносим в стор инфу из квери параметра о диапазоне треков (нужно для того, чтобы если ты выбрал диапазон треков, перезапустил страницу и все сохранилось)
    this.setMinTracksOfReleases(+this.$route.query.min)
    this.setMaxTracksOfReleases(+this.$route.query.max)

    // Подгружаем с бэкенда на основе фильтров нужные релизы
    await this.getReleases()
    
    // Как только загрузили все, мы выключаем лоадер
    this.loading = false
  },

  // Как только мы закрываем этот раздел, мы подчищаем страницу от тегов сортировки
  beforeDestroy() {
    this.clearSortingReleases()
    this.clearAuthorPermalinkForReleases()
    this.clearLocalNameAuthor()
    this.clearSelectTagsForReleases()
    this.clearReleases()
    this.clearMinTracksOfReleases()
    this.clearMaxTracksOfReleases()
    this.clearSearchQueryForReleases()
  },

  methods: {
    ...mapMutations([
      'setAuthorPermalinkForReleases', // Устанавливает в стор пермалинк автора, если мы ищем релизы для автора
      'clearAuthorPermalinkForReleases', // Очищает пермалинк для автора
      'setSortingReleases', // Устанавливает тип сортировки для релизов
      'clearSortingReleases', // Очищает тип сортировки релизов из стора
      'setSelectTagsForReleases', // Устанавливает выбранные теги для релизов
      'clearSelectTagsForReleases',
      'setPageNum', // Устанавливает номер страницы пагинации
      'setSearchQueryForReleases', // Устанавливает поисковой запрос для релизов
      'clearSearchQueryForReleases', // Очищает поисковой запрос для релизов из стора
      'setMinTracksOfReleases', // Уст мин значение треков
      'clearMinTracksOfReleases', // Очищает мин кол-во треков
      'setMaxTracksOfReleases', // Уст макс значение треков
      'clearMaxTracksOfReleases', // Очищает макс кол-во треков
      'clearLocalNameAuthor', // Очищает локальное имя для автора
      'clearReleases', // Очищает загруженные релизы
    ]),

    ...mapActions([
      'getReleases', // Для получения релизов
    ]),

    // Отправляет к видео записям автора
    goToVideosAuthor() {
      this.$router.push({ path: '/video-archive', query: {author: this.$route.query.author}})
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
  .release-item:not(:nth-child(3n)) {
    margin-right: 26px;
  }


  /* Карточка релиза */
  .release-item {
    margin-bottom: 60px;
  }
</style>