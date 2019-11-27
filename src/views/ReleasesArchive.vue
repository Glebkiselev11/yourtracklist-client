<template>
  <!-- Страница релизов, где есть сайд бар с фильтрам и основное поле куда мы выводим релизы -->
  <div class="wrap">
    <h1 class="archive-title">Архив релизов</h1>

    

    <div class="container">

      <!-- Боковая сортировка -->
      <SortSideBar />
      
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
    ...mapGetters(['releases', 'count'])
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

    // Устанавлием в store теги релизов которые выбраны
    this.$store.commit('setSelectTags', this.$route.query.tag)


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

  .container {
    margin-top: 50px;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
</style>