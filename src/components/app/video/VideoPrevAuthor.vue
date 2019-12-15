<template>
  <!-- Компонент предпросмотра 4 видео, который используется пока только на странице автора -->
  <div class="wrap">
    <TopBar 
      title="Видео"
    />

    <!-- Здесь выводим видео -->
    <div class="video-wrap">

      <VideoItem 
        v-for="(video, index) in fourLatestVideo"
        :key="index"
        :video="video"
      />
      
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/app/TopBar.vue'
import VideoItem from '@/components/app/video/VideoPrevCartItem.vue'

export default {
  name: 'Video-prev-author',
  props: ['fourLatestVideo'],

  components: {
    TopBar, VideoItem
  }
}
</script>

<style scoped>
  .wrap {
    margin-top: 80px;
    width: 100%;
    min-height: 525px;
  }

  .video-wrap {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  .video-item:not(:nth-child(4))  {
    margin-right: 26px;
  }


</style>