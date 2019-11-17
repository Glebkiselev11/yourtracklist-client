<template>
  <!-- Компонент информации о видео которая отображается прямо внутри обложки (платформа и длительность видео)-->
  <div class="prev-video-wrap">
    <!-- Если видео большое и там есть часы, то показываем с часами -->
    <span v-if="duration.hours">{{platform}} {{duration.hours + ':' + duration.minutes + ':' + duration.seconds}}</span>

    <!-- А если нету часов (что по сути чаще всего) то показываем только минуты и секунды -->
    <span v-else>{{platform}} {{duration.minutes + ':' + duration.seconds}}</span>
  </div>
</template>

<script>
export default {
  props: ['platform', 'duration'],
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
    color: white;
    font-size: 14px;
    font-weight: 300;
    padding: 7px 10px;
    background-color: rgba(0, 0, 0, 0.4);

  }
</style>