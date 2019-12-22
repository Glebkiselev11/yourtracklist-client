<template>
  <!-- Компонент боковой панели, где у нас будет соритровака релизов / миксов / видео-->
  <div class="sort-side-bar-wrap">
    
    <!-- Выбираем тип сортировки -->
    <SelectSort 
      :sorting="this.sortingReleases"
      @sorting="setSorting"
    />

    <!-- Вибираем количество треков в релизе -->
    <MinMaxTracks 
      :min-tracks="this.minTracks"
      :max-tracks="this.maxTracks"
      @max="setMaxTracks"
      @min="setMinTracks"
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
import SelectSort from '@/components/side-sort-bar/SelectSort.vue'
import CheckTags from '@/components/side-sort-bar/CheckTags.vue'
import MinMaxTracks from '@/components/side-sort-bar/MinMaxTracks.vue'

export default {
  name: 'Sort-side-bar',
  components: { 
    SelectSort, 
    CheckTags, 
    MinMaxTracks,
  },
  props: [
    'releasesTags', // Доступные теги релизов
    'sortingReleases', // Тип сортировки релизов
    'selectTagsForReleases', // Выбранные теги для поиска релизов (где стоят галки)
    'minTracks', // Минимальное кол-во треков в релизах
    'maxTracks', // Максимальное кол-во треков в релизах
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
    },

    // Прослушиваем с дочернего компонента максимальное кол-во треков в релизах
    setMaxTracks(max) {
      this.$router.push({ query: { ...this.$route.query, max }})
      this.$store.commit('setMaxTracksOfReleases', max)
    },

    // Прослушиваем с дочернего компонента минимальное кол-во треков в релизах
    setMinTracks(min) {
      this.$router.push({ query: { ...this.$route.query, min }})
      this.$store.commit('setMinTracksOfReleases', min)
    }

  },
}
</script>

