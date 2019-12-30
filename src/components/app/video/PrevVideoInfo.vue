<template>
  <!-- Компонент информации о видео которая отображается прямо внутри обложки (платформа и длительность видео)-->
  <div class="prev-video-wrap">
    <!-- Если видео большое и там есть часы, то показываем с часами -->
    <span>{{duration}}</span>
  </div>
</template>

<script>
export default {
  props: ['duration'],
  name: 'prev-video-info'
}
</script>

<style scoped>
  .prev-video-wrap {
    position: absolute;
    right: 16px;
    bottom: 16px;
  }

  .prev-video-wrap span{
    color: var(--primary-background-color);
    font-size: 14px;
    font-weight: 300;
    padding: 7px 10px;
    background-color: rgba(0, 0, 0, 0.4);

  }
</style>