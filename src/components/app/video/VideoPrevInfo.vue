<template>
  <!-- Компонент информации с помощь которого отображаем длительность видео внутри обложки видео-->
  <div class="video-prev-info-wrap">
    <span class="video-prev-info-item">{{duration}}</span>
  </div>
</template>

<script>
export default {
  name: 'VideoPrevInfo',
  
  props: {
    duration: {
      type: String,
      required: true
    }
  },
  
}
</script>

<style scoped>
  .video-prev-info-wrap {
    position: absolute;
    right: 16px;
    bottom: 16px;
  }

  .video-prev-info-item {
    color: var(--primary-background-color);
    font-size: 14px;
    font-weight: 300;
    padding: 7px 10px;
    background-color: rgba(0, 0, 0, 0.4);

  }
</style>