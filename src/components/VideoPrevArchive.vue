<template>
  <!-- Компонент предпросмотра 4 последних видео из архива -->
  <div class="wrap">
    <TopBar 
      title="Видео"
      :isShowButton="isShowButton"
      @click="routerTo"
    />

    <!-- Сообщение об ошибке -->
    <ErrorMessage 
      v-if="error"
      key="error" 
    >{{error.message}}
    </ErrorMessage>

    <!-- Здесь выводим видео -->
    <div 
      v-else
      key="video"
      class="video-wrap"
    >
      <VideoItem 
        v-for="(video, index) in fourLatestVideo"
        :key="index"
        :video="video"
      />
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/AppTopBar.vue'
import VideoItem from '@/components/VideoPrevCardItem.vue'

export default {
  name: 'VideoPrevArchive',
  components: {
    TopBar, VideoItem
  },

  props: {
    fourLatestVideo: Array, // Четыре видео (их может быть меньше, если например тут видео для определенного автора а у автора всего их 3 например)
    error: { // Объект с ошибкой
      type: Error,
      default: null
    },

    //* Нижние пропсы нужны только в том случае когда мы этот компонент используем на странице автора
    authorPermalink: String, // Ссылка на автора
    count: { // Сколько видео всего у автора
      default: 5,
      type: Number
    }, 
  },

  computed: {
    isShowButton() {
      if (this.error || this.count < 4) {
        return false
      } 
      return true
    }
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