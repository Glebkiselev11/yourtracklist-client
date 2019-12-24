<template>
  <!-- Страница куда выводим видео запись с ютуба -->
  <div class="wrap">
    <div class="video-container">
      <lite-youtube autoload :videoid="videoPermalink"></lite-youtube>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Video-cart',
  data: () => ({
    videoPermalink: undefined, // Уникальный пермалинк, по которому мы получаем видос с ютуба
  }),
  mounted() {
    this.videoPermalink = this.$route.params.video_permalink
  },
}
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 100%;
    margin: 80px 0;
  }

  .video-container {
    height: 70vh;
    display: flex;
    
  }
</style>