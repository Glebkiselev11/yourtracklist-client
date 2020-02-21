<template>
  <!-- Компонент боковой панели для видео-->
  <div class="sort-side-bar-wrap">
    
    <!-- Выбираем тип сортировки -->
    <SortSideSelect 
      :sorting="sortingVideo"
      @sorting="setSorting"
    />

    <!-- Выбираем Теги -->
    <SortSideCheckTags 
      :tags="videosTags"
      :select-tags="selectTagsForVideo"
      @tags="setTags"
    />
    

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import SortSideSelect from '@/components/SortSideSelect.vue'
import SortSideCheckTags from '@/components/SortSideCheckTags.vue'

export default {
  name: 'SortSideVideoArchive',
  components: {SortSideSelect, SortSideCheckTags},

  computed: {
    ...mapGetters([
      'videosTags', // Доступные теги видео записей
      'sortingVideo', // Тип сортировки видео
      'selectTagsForVideo', // Выбранные теги для поиска видео (где стоят галки)
    ])
  },

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

}
</script>