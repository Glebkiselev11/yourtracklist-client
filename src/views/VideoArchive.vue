<template>
  <!-- Страница Архива видео записей -->
  <div class="wrap">
    <h1 class="archive-title">Видео</h1>


    <div class="container">

      <!-- Боковая панель с сортировкой -->
      <SideBarForVideo 
        
      />
      
      <!-- Прелоадер -->
      <!-- <Loader v-if="loading"/> -->
      
      <!-- Основное окно куда выводим релизы -->
      <!-- linkTo туда передаем начальный кусок ссылки -->
      <!-- <ArchiveWindow 
        :releases="this.releases"
        :count="this.count"
        linkTo="/releases-archive"
      /> -->

    </div>

  </div>
</template>

<script> 
import {mapGetters} from 'vuex'
import SideBarForVideo from '@/components/side-sort-bar/SideBarForVideo.vue'
// import ArchiveWindow from '@/components/archive-window/ArchiveWindow.vue'
export default {
  name: 'Video-archive',
  components: {
    SideBarForVideo, 
    // ArchiveWindow
  },
  computed: {
    ...mapGetters(['videos'])
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
      this.$store.commit('setReleasesForAuthor', this.$route.query.author)
    }

    // Устанавлием в store теги релизов которые выбраны
    this.$store.commit('setSelectTagsForReleases', this.$route.query.tag)

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

