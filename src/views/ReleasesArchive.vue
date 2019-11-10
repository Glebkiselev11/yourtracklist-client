<template>
  <!-- Страница ризов, где есть сайд бар с фильтрам и основное поле куда мы выводим релизы -->
  <div class="wrap">
    <h1 class="archive-title">Архив релизов</h1>

    <div class="container">

      <!-- Боковая сортировка -->
      <SortSideBar />
      
      <!-- Основное окно куда выводим релизы -->
      <ArchiveWindow 
        :releases="this.releases"
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
  components: {
    ArchiveWindow, // Компонент для отобржаения релизов
    SortSideBar, // Боковая панель с фильтрами и сортировками
  },
  computed: {
    ...mapGetters(['releases'])
  },
  async mounted() {
    
  },
}
</script>

<style scoped>
  .wrap {
    border-top: 1px solid black;
    padding-top: 10px;
  }

  .container {
    display: flex;
  }
</style>