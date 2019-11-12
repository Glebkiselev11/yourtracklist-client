<template>
  <!-- На главной странице у секций вверху находится заголовок и кнопка -->
  <div class="top-bar">
    <h2>{{title}}</h2>
    
    <button @click="click">
      показать больше
    </button>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  props: ['title'],
  methods: {
    // Отправляем родительскому компоненту сигнал, что кнопка нажата
    click() {
      this.$emit('click')
    }
  },
}
</script>

<style scoped>
  .top-bar {
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
  }

  .top-bar h2 {
    font-size: 40px;
    font-weight: 300;
  }


  /* Для кнопки */
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
    cursor: pointer;
  }
</style>