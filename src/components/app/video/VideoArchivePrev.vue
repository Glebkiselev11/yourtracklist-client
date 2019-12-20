<template>
  <!-- Компонент предпросмотра 4 последних видео из архива -->
  <div class="wrap">
    <TopBar 
      title="Видео"
      @click="routerTo"
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
  props: ['fourLatestVideo', 'authorPermalink'],
  components: {
    TopBar, VideoItem
  },
  methods: {

    // Переходит к видео
    routerTo() {
      // Если в компонент был переданана ссылка на автора, то переходим к видео записям определенного автора
      if (this.authorPermalink) {
        this.$router.push({ path: '/video-archive', query: { author: this.authorPermalink }})
      } else {
        // Иначе просто переходим к видео
        this.$router.push({ path: '/video-archive'})
      }
      
    }
  },
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