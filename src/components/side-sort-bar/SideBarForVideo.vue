<template>
  <!-- Компонент боковой панели для видео-->
  <div class="sort-side-bar-wrap">
    
    <!-- Выбираем тип сортировки -->
    <SelectSort 
      :sorting="this.sortingVideo"
      @sorting="setSorting"
    />

    <!-- Выбираем Теги -->
    <CheckTags 
      :tags="releasesTags"
      :select-tags="selectTagsForVideo"
      @tags="setTags"
    />
    

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import SelectSort from '@/components/side-sort-bar/SelectSort.vue'
import CheckTags from '@/components/side-sort-bar/CheckTags.vue'
export default {
  name: 'Sort-side-bar',
  components: {SelectSort, CheckTags},
  props: [
    'sortingVideo', // Тип сортировки видео
    'selectTagsForVideo', // Выбранные теги для поиска видео (где стоят галки)
  ],
  methods: {
    // Прослушиваем с дочернего компонента способ сортировки
    setSorting(sorting) {
      // А так же сразу ставим выбранное значение в роутер
      this.$router.push({ query: { ...this.$route.query, sorting }})
      // И коммитим в стор выбранный метод фильтрации
      this.$store.commit('setSortingVideo', sorting)
    },

    // Прослушиваем с дочернего компонента теги
    setTags(tag) {
      // А так же сразу ставим выбранное значение в роутер и сбрасываем номер страницы
      this.$router.push({ query: { ...this.$route.query, tag, page: 1 }})
      this.$store.commit('setPageNum', 1)

      // И коммитим в стор выбранные теги
      this.$store.commit('setSelectTagsForVideo', tag)
    }
  },

  computed: {
    // ! Переносим их в род-компонент, как толко сделаем функционал под получение  видео, а не релизов
    ...mapGetters(['releasesTags']),
  },


}
</script>