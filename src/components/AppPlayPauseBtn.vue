<template>
  <!-- Кнопка отвечающая за плей и паузу у трека -->
  <span 
    class="btn-audio-play" 
    @click="$emit('playAudio')"
  >

    <!-- Play -->
    <svg 
      v-if="isPlay"
      key="play-icon"
      version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" viewBox="0 0 512 512">
      <g>
      </g>
      <path d="M162.642 148.337h56.034v215.317h-56.034v-215.316z" fill="#000000" />
      <path d="M293.356 148.337h56.002v215.317h-56.002v-215.316z" fill="#000000" />
    </svg>

    <!-- Pause -->  
    <svg 
      v-else 
      key="pause-icon"
      version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" viewBox="0 0 512 512">
      <g>
      </g>
      <path d="M152.443 136.417l207.114 119.573-207.114 119.593z" fill="#000000" />
    </svg>

  </span>
</template>

<script>
export default {
  name: 'AppPlayPauseBtn',

  props: {
    isPlay: Boolean
  }

}
</script>

<style scoped>

.btn-audio-play {
  display: flex;
  grid-area: btn;
}

.btn-audio-play svg {
  margin: auto;
}
</style>