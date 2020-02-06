<template>
  <!-- Компонент боковой панели, где у нас будет соритровака релизов / миксов / видео-->
  <div class="sort-side-bar-wrap">
    
    <!-- Выбираем тип сортировки -->
    <SortSideSelect 
      :sorting="this.sortingReleases"
      @sorting="setSorting"
    />

    <!-- Вибираем количество треков в релизе -->
    <SortSideReleasesArchiveMinMaxTracks 
      :min-tracks="this.minTracksOfReleases"
      :max-tracks="this.maxTracksOfReleases"
      :range-number-of-tracks="this.rangeNumberOfTracks"
      @max="setMaxTracks"
      @min="setMinTracks"
    />

    <!-- Выбираем Теги -->
    <SortSideCheckTags 
      :tags="releasesTags"
      :select-tags="selectTagsForReleases"
      @tags="setTags"
    />
    

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import SortSideSelect from '@/components/SortSideSelect.vue'
import SortSideCheckTags from '@/components/SortSideCheckTags.vue'
import SortSideReleasesArchiveMinMaxTracks from '@/components/SortSideReleasesArchiveMinMaxTracks.vue'

export default {
  name: 'SortSideReleasesArchive',
  components: { 
    SortSideSelect, 
    SortSideCheckTags, 
    SortSideReleasesArchiveMinMaxTracks,
  },

  computed: {
    ...mapGetters([
      'minTracksOfReleases', // Минимальное количество треков в релизах
      'maxTracksOfReleases', // Максимальное количество треков в релизах
      'rangeNumberOfTracks', // Диапазон доступного кол-ва треков в релизах

      'sortingReleases', // Тип сортировки релизов
      'selectTagsForReleases', // Выбранные теги для поиска релизов (где стоят галки)
      'releasesTags', // Доступные теги релизов
    ])
  },
  
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
    },


    // Прослушиваем с дочернего компонента максимальное кол-во треков в релизах
    setMaxTracks(max) {
      this.$router.push({ query: { ...this.$route.query, max, min: this.minTracksOfReleases }})
      this.$store.commit('setMaxTracksOfReleases', max)
    },

    // Прослушиваем с дочернего компонента минимальное кол-во треков в релизах
    setMinTracks(min) {
      this.$router.push({ query: { ...this.$route.query, min, max: this.maxTracksOfReleases }})
      this.$store.commit('setMinTracksOfReleases', min)
    }

  },
}
</script>

