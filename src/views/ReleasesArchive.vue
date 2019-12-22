<template>
  <!-- Страница релизов, где есть сайд бар с фильтрам и основное поле куда мы выводим релизы -->
  <div class="wrap">

    <!-- Отображаем если нет автора в квери параметрах и не загружены данные о авторе -->
    <h1 v-if="!this.$route.query.author && !this.localNameAuthor" class="archive-title">Релизы</h1>
    
    <!-- Отображаем этот блок, если это релизы определенного автора -->
    <div v-else class="archive-title-wrap">
      <!-- Локальное название артиста -->
      <h1 class="archive-title">Релизы <b>{{this.localNameAuthor}}</b></h1>

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
      <SideBarForReleases 
        :releases-tags="this.releasesTags"
        :sorting-releases="this.sortingReleases"
        :select-tags-for-releases="this.selectTagsForReleases"
        :min-tracks="this.minTracksOfReleases"
        :max-tracks="this.maxTracksOfReleases"
      />
      
      <!-- Прелоадер -->
      <Loader v-if="loading"/>
      
      <!-- Основное окно куда выводим релизы -->
      <div v-else class="window-wrap">
     
        <!-- Количество найденых релизов -->
        <span class="number-of-releases" v-if="count > 0">Найден{{count == 1 ? '': 'o'}} {{count}} {{countText}}</span>

        <!-- Сюда итерируем сами релизы / миксы -->
        <div class="archive-wrap">

          <!-- Итерируемый итем -->
          <ReleaseItem 
            v-for="(release, index) of releases"
            :key="index"
            :release="release"
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
import SideBarForReleases from '@/components/side-sort-bar/SideBarForReleases.vue'
import ReleaseItem from '@/components/app/music/ReleasePrevCartItem.vue'
import paginationMixin from '@/mixins/pagination.mixin.js'

export default {
  name: 'Releases-archive',
  data: () => ({
    loading: true, // Визуальное отображение загрузки
    sorting: undefined, // Тип сортировки, который у нас выбран, когда загружается страница в первый раз, то мы сюда его устанавливаем с квери параметров в адресной строке
    checkedTags: [], // Выбранные теги, которые тоже устанавливаются первый раз из адресной строки, если они там есть
  }),
  mixins: [ paginationMixin ], // Тут мы инициализируем миксин который нужен для пагинации
  components: {
    SideBarForReleases, // Боковая панель с фильтрами и сортировками
    ReleaseItem, // Итем релиза
  },
  computed: {
    ...mapGetters([
      'releases', // Карточки релизов
      'count', // Количество найденых релизов по нашим фильтрам (всего сколько найдено во всей базе)
      'localNameAuthor', // Локальное название автора, для которого мы ищем релизы
      'pageSize', // Размер одной страницы (для пагинации)
      'releasesTags', // Доступные теги релизов
      'minTracksOfReleases', // Минимальное количество треков в релизах
      'maxTracksOfReleases', // Максимальное количество треков в релизах
      'sortingReleases', // Тип сортировки релизов
      'selectTagsForReleases', // Выбранные теги для поиска релизов (где стоят галки)
      'thereIsVideos', // Информация о том, есть ли видео (есть ли мы запрашивали релизы для конкретного автора) у автора
    ]),

    // Вычисляет текст записи исходя из количества релизов
    countText() {
      if (this.count == 1) {
        return 'релиз'
      } else if (this.count <= 4) {
        return 'релиза'
      } else {
        return 'релизов'
      }
    }
  },
  methods: {
    // Отправляет к видео записям автора
    goToVideosAuthor() {
      this.$router.push({ path: '/video-archive', query: {author: this.$route.query.author}})
    }
  },
  async created() {

    // При открытие в первый раз сортировки, мы смотрим что у нас есть в роуторе
    // Нужно чтобы селектор, где мы выбираем тип сортировки - синхронизировался с адресной строкой
    switch(this.$route.query.sorting) {
      case 'old' : 
        this.$store.commit('setSortingReleases', 'old')
        break
      case 'random' :
        this.$store.commit('setSortingReleases', 'random')
        break
      case 'artist' :
        this.$store.commit('setSortingReleases', 'artist')
        break
      // Если там что то другое, иили вообще нет типа сортировки, то по умолчанию ставим как new
      default:
        this.$store.commit('setSortingReleases', 'new')
        break
    }

    // Если есть артист в query параметрах, то этого личная дискография и мы загружаем все релизы только этого автора
    if (this.$route.query.author) {
      this.$store.commit('setAuthorPermalinkForReleases', this.$route.query.author)
    }

    // Устанавлием в store теги релизов которые выбраны
    this.$store.commit('setSelectTagsForReleases', this.$route.query.tag)

    // Устанавливаем в стор номер текущей страницы из роутера
    this.$store.commit('setPageNum', +this.$route.query.page || 1)

    // Очищаем локальное имя автора, чтобы если мы загрузили нового, старое название не мелькнуло в заголовке
    this.$store.commit('clearLocalNameAuthor')

    // Подгружаем с бэкенда на основе фильтров нужные релизы
    await this.$store.dispatch('getReleases')
    
    // Как только загрузили все, мы выключаем лоадер
    this.loading = false
  },
  watch: {
    // Следит за изменениями роутера
    async '$route' (to) {

      // Ставит в $store теги из urla (нужно для того, чтобы когда мы в ручную меняем url 
      // либо жмем по тегам в карточках и мы дополняем эти теги в store)
      this.$store.commit('setSelectTagsForReleases', to.query.tag)

      // Устанавливаем в стор пермалинк автора если он есть
      this.$store.commit('setAuthorPermalinkForReleases', this.$route.query.author)

      // И очищаем старого автора из стора (его локальное имя) если в routore нету автора
      // Это нужно, чтобы автор на время не пропадал, если мы шелкаем фильтры 
      if (!this.$route.query.author) {
        this.$store.commit('clearLocalNameAuthor')
      }
      

      // До запроса включаем лоадер
      this.loading = true

      // И как только роутер меняется делает запрос на бэк с новыми фильтрами, которые у нас храняться в стейте
      await this.$store.dispatch('getReleases')

      // Как запрос прошел - выключаем
      this.loading = false
    }
  },
  // Как только мы закрываем этот раздел, мы подчищаем страницу от тегов сортировки
  beforeDestroy() {
    this.$store.commit('clearSortingReleases')
    this.$store.commit('clearAuthorPermalinkForReleases')
    this.$store.commit('clearSelectTagsForReleases')
    this.$store.commit('clearReleases')
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