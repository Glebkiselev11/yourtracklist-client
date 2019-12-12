<template>
  <!-- Страница Архива видео записей -->
  <div class="wrap">
    <h1 class="archive-title">Видео</h1>

    <!-- Основное окно куда выводим видео записи -->
    <VideoArchiveWindow 
      :video-array="this.video"
    />

  </div>
</template>

<script> 
import {mapGetters} from 'vuex'
import VideoArchiveWindow from '@/components/archive-window/VideoArchiveWindow.vue'
export default {
  name: 'Video-archive',
  components: {
    VideoArchiveWindow
  },
  computed: {
    ...mapGetters(['videos'])
  },
}
</script>

<style scoped>
  .wrap {
    border-top: 1px solid black;
  }
</style>

