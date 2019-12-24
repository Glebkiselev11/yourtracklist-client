<template>
  <!-- Компонент итема видео, который мы используем на странице автора, в архиве видео. -->
  <div class="video-item">
    <!-- Передаем в компонент отвечающий за отображание тегов - массив с тегами -->
    <PrevTagsHeader
      link-to="/video-archive/"
      :tags-array="video.tags"
    />

    <!-- Обложка -->
    <div class="cover-wrap">
      <router-link 
        :to="`video/${video.permalink}`" 
        class="video-cover" 
        :style="{ 'backgroundImage' : 'url(' + `https://img.youtube.com/vi/${video.permalink}/hqdefault.jpg` + ')' }"
      > 
        <!-- Значок плея -->
        <VideoPlayButton 
          :size="50"
        />


        <!-- Компонент который отображает длительность видео -->
        <PrevVideoInfo 
          :duration="video.duration"
        />
      </router-link>

      
    </div>
    
    <PrevInfo 
      :date="video.date"
      :name="video.name"
      :authors="video.authors"
      :url="`https://www.youtube.com/watch?v=${video.permalink}`" 
    />
  </div>
</template>

<script>
import PrevVideoInfo from '@/components/app/video/PrevVideoInfo.vue'
import PrevTagsHeader from '@/components/app/tags/PrevTagsHeader.vue'
import PrevInfo from '@/components/app/PrevInfo.vue'
import VideoPlayButton from '@/components/app/video/VideoPlayButton.vue'
export default {
  name: 'video-prev-card-item',
  props: ['video'],
  components: {
    PrevVideoInfo, PrevInfo, VideoPlayButton, PrevTagsHeader
  }
}
</script>


<style scoped>

  .video-item {
    width: 280px;
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