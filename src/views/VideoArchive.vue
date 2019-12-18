<template>
  <!-- Страница Архива видео записей -->
  <div class="wrap">
    <h1 class="archive-title">Видео</h1>


    <div class="container">

      <!-- Боковая панель с сортировкой -->
      <SideBarForVideo 
        :sorting-video="this.sortingVideo"
        :select-tags-for-video="this.selectTagsForVideo"
        :videos-tags="this.videosTags"
      />
      
      <!-- Прелоадер -->
      <!-- <Loader v-if="loading"/> -->
      
      <!-- Основное окно куда выводим релизы -->
      

    </div>

  </div>
</template>

<script> 
import {mapGetters} from 'vuex'
import SideBarForVideo from '@/components/side-sort-bar/SideBarForVideo.vue'
export default {
  name: 'Video-archive',
  components: {
    SideBarForVideo, 
  },
  computed: {
    ...mapGetters([
      'videos', // Карточки превьюх видео
      'count', // Количество найденых видео по нашим фильтрам (всего сколько найдено во всей базе)
      'pageSize', // Размер одной страницы (для пагинации)
      'videosTags', // Доступные теги видео записей
      'sortingVideo', // Тип сортировки видео
      'selectTagsForVideo', // Выбранные теги для поиска видео (где стоят галки)
    ])
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
      
      // ! Остановились здесь

      // Ставит в $store теги из urla (нужно для того, чтобы когда мы в ручную меняем url 
      // либо жмем по тегам в карточках и мы дополняем эти теги в store)
      this.$store.commit('setSelectTagsForVideo', to.query.tag)

      // ! TODO: Устанавливаем в стор автора если он есть
      // this.$store.commit('setReleasesForAuthor', this.$route.query.author)

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

