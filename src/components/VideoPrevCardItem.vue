<template>
  <!-- Компонент итема видео, который мы используем на странице автора, в архиве видео. -->
  <div class="video-item">
    <!-- Передаем в компонент отвечающий за отображание тегов - массив с тегами -->
    <TagsPrevHeader
      link-to="/video-archive/"
      :tags-array="video.tags"
      @close="$emit('close')"
    />

    <!-- Обложка -->
    <div class="cover-wrap">
      <a
        :style="{ 'backgroundImage' : 'url(' + `https://img.youtube.com/vi/${video.permalink}/hqdefault.jpg` + ')' }"
        class="video-cover" 
        @click.prevent="openVideo(video.authors, video.permalink)"
      > 
        <!-- Значок плея -->
        <VideoPlayButton 
          :size="50"
        />


        <!-- Компонент который отображает длительность видео -->
        <VideoPrevInfo 
          :duration="video.duration"
        />
      </a>

      
    </div>
    
    <PrevInfo 
      :date="video.date"
      :name="video.name"
      :authors="video.authors"
      :permalink="video.permalink" 
      :type="'video'"
      @close="$emit('close')"
    />
  </div>
</template>

<script>
import VideoPrevInfo from '@/components/VideoPrevInfo.vue'
import TagsPrevHeader from '@/components/TagsPrevHeader.vue'
import PrevInfo from '@/components/AppPrevInfo.vue'
import VideoPlayButton from '@/components/VideoPlayButton.vue'
export default {
  name: 'video-prev-card-item',
  
  components: {
    VideoPrevInfo, PrevInfo, VideoPlayButton, TagsPrevHeader
  },

  props: {
    video: Object
  },
  
  methods: {
    // Открывает видео
    openVideo(authors, permalink) {

      // Эмитим (для меню поиска) чтобы при переходе в карточку видео, закрыть страницу поиска
      this.$emit('close')

      let pushString = '/video/'

      for (let i = 0; i < authors.length; i++) {
        const author = authors[i]
        
        // Собираем строку из авторов, чтобы на выходе у нас получилось cat-soup+drip-133, если автора два
        pushString += i < 1 ? `${author['permalink']}` : `+${author['permalink']}`
      }

      // И отправляем результат в роутер (на выходе получиться так: '/video/cat-soup+drip-133/sFf322gv')
      this.$router.push(`${pushString}/${permalink}`)
    }
  },
}
</script>


<style scoped>

  .video-item {
    width: 280px;
  }

  .cover-wrap {
    overflow: hidden;
    margin-bottom: 8px;
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