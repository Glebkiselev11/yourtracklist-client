<template>
  <!-- Анимированная кнопка с эффектом заполнения -->
  <button @click="click">
    {{title}}
  </button>
</template>

<script>
export default {
  name: 'Animation-button',
  props: ['title'],
  methods: {
    click() {
      this.$emit('click')
    }
  },
}
</script>

<style scoped>
  button {
    max-height: 35px;
    border: 1px solid black;
    background: transparent;
    font-weight: 300;
    font-size: 16px;
    padding: 7px 20px;
    position: relative;
    transition: all 400ms ease; 
  }

  button:before {
    content:'';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 33px;
    background: black;
    transition: all 0.4s ease;
    z-index: -1;
  }

  button:hover:before {
    width: 100%;
  }

  button:hover {
    color: white;
  }
</style>