<template>
  <!-- Секция на главной странице, где выводим последние 3 видео -->
  <div class="wrap">
    <!-- Верхняя шапка с заголовком и кнопкой -->
    <TopBar 
      title="Видео"
    />

    <!-- Здесь выводим видео -->
    <div class="video-wrap">
      
      <!-- Итерируем и отрисовываем 3 видео -->
      <div 
        class="video-item" 
        v-for="(video, index) in threeLatestVideos"
        :key="index"
      >
        <!-- Обложка -->
        <div class="cover-wrap">
          <a 
            :href="video.url" 
            target="_blank"
            class="video-cover" 
            :class=" index < 1 ? 'big-video' : 'small-video'"
            :style="{ 'backgroundImage' : 'url(' + `https://img.youtube.com/vi/${video.permalink}/hqdefault.jpg` + ')' }"
          > 
            <!-- Значок плея (если первое видео, то 100% размер, если второе и третье то меньше) -->
            <VideoPlayButton 
              :size="index < 1 ? 100 : 50"
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
          :url="video.url"
        />
      </div>
      
      
    </div>

  </div>
</template>

<script>
import PrevInfo from '@/components/app/PrevInfo.vue'
import TopBar from '@/components/app/TopBar.vue'

import PrevVideoInfo from '@/components/app/video/PrevVideoInfo.vue'
import VideoPlayButton from '@/components/app/video/VideoPlayButton.vue'

export default {
  name: 'ViedeoHome',
  props: ['threeLatestVideos'],
  components: {
    TopBar, PrevInfo, PrevVideoInfo, VideoPlayButton
  },

}
</script>

<style scoped>
  .wrap {
    margin-top: 150px;
    width: 100%;
  }

  .video-wrap {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: space-between;
    justify-content: space-between;
    height: 605px;
    width: 100%;
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
  }
  

  /* Класс для первого видео, которое у нас самое большое */
  .big-video {
    width: 747px;
    height: 526px;
  }

  .small-video {
    width: 392px;
    height: 210px;
  }

</style>