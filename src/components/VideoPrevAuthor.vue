<template>
  <!-- Компонент предпросмотра 4 видео, который используется пока только на странице автора -->
  <div class="wrap">
    <TopBar 
      title="Видео"
    />

    <!-- Здесь выводим видео -->
    <div class="video-wrap">
      
      <!-- Итерируем и отрисовываем 3 видео -->
      <div 
        class="video-item" 
        v-for="(video, index) in fourLatestVideo"
        :key="index"
      >
        <!-- Обложка -->
        <div class="cover-wrap">
          <a 
            :href="`https://www.youtube.com/watch?v=${video.permalink}`" 
            target="_blank"
            class="video-cover" 
            :style="{ 'backgroundImage' : 'url(' + `https://img.youtube.com/vi/${video.permalink}/hqdefault.jpg` + ')' }"
          > 
            <!-- Значок плея (если первое видео, то 100% размер, если второе и третье то меньше) -->
            <VideoPlayButton 
              :size="50"
            />


            <!-- Компонент который отображает длительность видео -->
            <PrevVideoInfo 
              :duration="video.duration"
            />
          </a>

          
        </div>
        
        <PrevInfo 
          :date="video.date"
          :name="video.name"
          :authors="video.authors"
          :url="`https://www.youtube.com/watch?v=${video.permalink}`" 
        />
      </div>
      
      
    </div>
  </div>
</template>

<script>
import PrevVideoInfo from '@/components/app/video/PrevVideoInfo.vue'
import PrevInfo from '@/components/app/PrevInfo.vue'
import TopBar from '@/components/app/TopBar.vue'
import VideoPlayButton from '@/components/app/video/VideoPlayButton.vue'
export default {
  name: 'Video-prev-author',
  props: ['fourLatestVideo'],
  mounted() {
    console.log(this.fourLatestVideo)
  },
  components: {
    TopBar, PrevInfo, VideoPlayButton, PrevVideoInfo
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

  .cover-wrap {
    overflow: hidden;
    margin-bottom: 10px;
  }
  .video-cover {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 280px;
    height: 200px;
  }
  

</style>