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
    border: 1px solid var(--primary-color);
    background: transparent;
    font-weight: 300;
    font-size: 16px;
    padding: 7px 20px;
    position: relative;
    transition: all 400ms ease; 
    z-index: 1;
  }

  button::after {
    content:'';
    position: absolute;
    width: 0;
    height: 35px;
    top: -1px;
    left: 0;
    background: var(--primary-color);
    transition: all 0.4s ease;
    z-index: -1;
  }

  button:hover:after {
    width: 100%;
  }

  button:hover {
    color: var(--primary-background-color);
  }
</style>