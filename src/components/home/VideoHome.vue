<template>
  <!-- Секция на главной странице, где выводим последние видео -->
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
            :style="{ 'backgroundImage' : 'url(' + video.cover + ')' }"
          > 
            <!-- Значок плея (если первое видео, то 100% размер, если второе и третье то меньше) -->
            <svg :width=" index < 1 ? 100 : 50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="49.5" stroke="white"/>
              <path d="M65 50L42.5 62.9904V37.0096L65 50Z" fill="white"/>
            </svg>
          </a>
        </div>
        
        <PrevInfo 
          :date="video.date"
          :nameInfo="video.nameInfo"
          :releaseAuthors="video.authors"
        />
      </div>
      
      
    </div>

  </div>
</template>

<script>
import PrevInfo from '@/components/app/PrevInfo.vue'
import TopBar from '@/components/home/TopBar.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'ViedeoHome',
  components: {
    TopBar, PrevInfo
  },

  computed: {
    ...mapGetters(['threeLatestVideos'])
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
    display: block;
    transform: scale(1);
    transition: all 1s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .video-cover:hover {
    transform: scale(1.02);
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