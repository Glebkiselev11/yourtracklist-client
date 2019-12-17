<template>
  <!-- Компонент боковой панели, где у нас будет соритровака релизов / миксов / видео-->
  <div class="sort-side-bar-wrap">
    
    <!-- Выбираем тип сортировки -->
    <SelectSort 
      :sorting="this.sortingReleases"
      @sorting="setSorting"
    />

    <!-- Выбираем Теги -->
    <CheckTags 
      :tags="releasesTags"
      :select-tags="selectTagsForReleases"
      @tags="setTags"
    />
    

  </div>
</template>

<script>
// import {mapGetters} from 'vuex'
import SelectSort from '@/components/side-sort-bar/SelectSort.vue'
import CheckTags from '@/components/side-sort-bar/CheckTags.vue'
export default {
  name: 'Sort-side-bar',
  components: {SelectSort, CheckTags},
  props: [
    'releasesTags', // Доступные теги релизов
    'sortingReleases', // Тип сортировки релизов
    'selectTagsForReleases', // Выбранные теги для поиска релизов (где стоят галки)
  ],
  methods: {
    // Прослушиваем с дочернего компонента способ сортировки
    setSorting(sorting) {
      // А так же сразу ставим выбранное значение в роутер
      this.$router.push({ query: { ...this.$route.query, sorting }})
      // И коммитим в стор выбранный метод фильтрации
      this.$store.commit('setSortingReleases', sorting)
    },

    // Прослушиваем с дочернего компонента теги
    setTags(tag) {
      // А так же сразу ставим выбранное значение в роутер и сбрасываем номер страницы
      this.$router.push({ query: { ...this.$route.query, tag, page: 1 }})
      this.$store.commit('setPageNum', 1)

      // И коммитим в стор выбранные теги
      this.$store.commit('setSelectTagsForReleases', tag)
    }
  },
}
</script>
