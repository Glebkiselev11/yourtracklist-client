<template>
  <!-- Страница релизов, где есть сайд бар с фильтрам и основное поле куда мы выводим релизы -->
  <div class="wrap">

    <!-- Отображаем если нет автора в квери параметрах и не загружены данные о авторе -->
    <h1 v-if="!this.$route.query.author && !this.localNameAuthorForRelease" class="archive-title">Релизы</h1>
    
    <!-- Отображаем этот блок, если это релизы определенного автора -->
    <div v-else class="archive-title-wrap">
      <!-- Локальное название артиста -->
      <h1 class="archive-title">Релизы <b>{{this.localNameAuthorForRelease}}</b></h1>

      <!-- Кнопка которая переходит к видео записям артиста -->
      <ArrowButton 
        :title="'Видео ' + this.localNameAuthorForRelease"
        :arrow-color="'#000'"
        :forward="true"
        :styles="'color: black; font-size: 25px; font-weight: 300;'"
        @click="goToVideosAuthor"
      />
    </div>
    
    
    <div class="container">

      <!-- Боковая сортировка -->
      <SortSideBar 
        
      />
      
      <!-- Прелоадер -->
      <Loader v-if="loading"/>
      
      <!-- Основное окно куда выводим релизы -->
      <!-- linkTo туда передаем начальный кусок ссылки -->
      <ArchiveWindow 
        v-else
        :releases="this.releases"
        :count="this.count"
        linkTo="/releases-archive"
      />

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import SortSideBar from '@/components/side-sort-bar/SortSideBar.vue'
import ArchiveWindow from '@/components/archive-window/ArchiveWindow.vue'
export default {
  name: 'Releases-archive',
  data: () => ({
    loading: true, // Визуальное отображение загрузки
    filters: undefined,
    sorting: undefined, // Тип сортировки, который у нас выбран, когда загружается страница в первый раз, то мы сюда его устанавливаем с квери параметров в адресной строке
    checkedTags: [], // Выбранные теги, которые тоже устанавливаются первый раз из адресной строки, если они там есть
  }),
  components: {
    ArchiveWindow, // Компонент для отобржаения релизов
    SortSideBar, // Боковая панель с фильтрами и сортировками
  },
  computed: {
    ...mapGetters(['releases', 'count', 'localNameAuthorForRelease']),
  },
  methods: {
    // Отправляет к видео записям автора
    goToVideosAuthor() {
      console.log('Нажали кнопку к видео записям автора, которых пока нет))')
    }
  },
  async created() {

    // При открытие в первый раз сортировки, мы смотрим что у нас есть в роуторе
    // Нужно чтобы селектор, где мы выбираем тип сортировки - синхронизировался с адресной строкой
    switch(this.$route.query.sorting) {
      case 'old' : 
        this.$store.commit('setSorting', 'old')
        break
      case 'random' :
        this.$store.commit('setSorting', 'random')
        break
      case 'artist' :
        this.$store.commit('setSorting', 'artist')
        break
      // Если там что то другое, иили вообще нет типа сортировки, то по умолчанию ставим как new
      default:
        this.$store.commit('setSorting', 'new')
        break
    }

    // Если есть артист в query параметрах, то этого личная дискография и мы загружаем все релизы только этого автора
    if (this.$route.query.author) {
      this.$store.commit('setReleasesForAuthor', this.$route.query.author)
    }

    // Устанавлием в store теги релизов которые выбраны
    this.$store.commit('setSelectTags', this.$route.query.tag)

    // Устанавливаем в стор номер текущей страницы из роутера
    this.$store.commit('setPageNum', +this.$route.query.page || 1)

    // Устанавливаем в стор автора если он есть
    this.$store.commit('setReleasesForAuthor', this.$route.query.author)
    // Очищаем локальное имя автора, чтобы если мы загрузили нового, старое название не мелькнуло в заголовке
    this.$store.commit('clearLocalNameAuthorForRelease')

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
      this.$store.commit('setSelectTags', to.query.tag)

      // Устанавливаем в стор автора если он есть
      this.$store.commit('setReleasesForAuthor', this.$route.query.author)

      // И очищаем старого автора из стора (его локальное имя) если в routore нету автора
      // Это нужно, чтобы автор на время не пропадал, если мы шелкаем фильтры 
      if (!this.$route.query.author) {
        this.$store.commit('clearLocalNameAuthorForRelease')
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
    this.$store.commit('clearSorting')
    this.$store.commit('clearSelectTags')
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
</style>