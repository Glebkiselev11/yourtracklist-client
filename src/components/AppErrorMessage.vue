<template>
  <!-- Компонент для отображения сообщения об ошибок -->
  <span 
    :style="{fontSize: fontSize}"
    class="error-message"
  >
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'AppErrorMessage',

  props: {
    fontSize: {
      type: String,
      default: '1.5em'
    }
  }
}
</script>

<style scoped>
.error-message {
  background: rgb(255, 89, 89);
  padding: 10px;
}
</style>

