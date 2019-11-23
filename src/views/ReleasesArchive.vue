<template>
  <!-- Страница релизов, где есть сайд бар с фильтрам и основное поле куда мы выводим релизы -->
  <div class="wrap">
    <h1 class="archive-title">Архив релизов</h1>

    <div class="container">

      <!-- Боковая сортировка -->
      <SortSideBar 
        @selected="getReleasesWithFilter"
        @checkedTags="getReleasesWithTags"
      />
      
      
      <!-- Основное окно куда выводим релизы -->
      <!-- linkTo туда передаем начальный кусок ссылки -->
      <ArchiveWindow 
        :releases="this.releases"
        :count="this.count"
        linkTo="/release-cart/"
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
    filters: undefined
  }),
  components: {
    ArchiveWindow, // Компонент для отобржаения релизов
    SortSideBar, // Боковая панель с фильтрами и сортировками
  },
  computed: {
    ...mapGetters(['releases', 'count'])
  },
  methods: {
    // Этот метод мы будем вызывать когда применили фильтр, он вызывает когда в сайд баре выбран какой либо фильтр
    // То есть получается когда прогрузился сайд бар, так сразу вызывается этот метод
    async getReleasesWithFilter(sorting) {

      // Ставим в роутер нужный фильтр
      this.$router.push({ query: { ...this.$route.query, sorting }})

      // И запрашиваем с бэка по этому фильтру релизы
      await this.$store.dispatch('getReleases', { sorting: this.$route.query.sorting})
    },

    // Через этот метод будем загружать только релизы выбранных жанров
    async getReleasesWithTags(tag) {
      
      // Пушим в роутер нужные теги, при этом не перебиваем другие query параметры
      this.$router.push({ query: { ...this.$route.query, tag }})

      // ! Завтра начнем отсюда, добавлять функционал тегов
      console.log(this.$route.query)

    }
  }
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