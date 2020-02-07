<template>
  <!-- Компонент кнопки плея, которое располагается на обложках видео -->
  <svg :width="size" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="25" fill="black" fill-opacity="0.4"/>
    <path d="M32.5 25L21.25 31.4952V18.5048L32.5 25Z" fill="white"/>
  </svg>
</template>

<script>
export default {
  name: 'Video-play-button',

  props: {
    size: Number
  }
}
</script>