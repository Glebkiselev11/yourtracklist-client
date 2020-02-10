<template>
  <!-- Компонент кнопки со стрелкой, которую используем для перехода куда-то (с анимированной стрелкой) -->
  <div class="wrap-button">
    <button
      v-if="title" 
      :style="this.styles"
      class="title"
      @click="buttonClick"
    >{{title}}</button>

    <!-- Если нам пришло значение forward из родительского компонента в true, то мы показываем стрелку направленную вправо  -->
    <span 
      v-if="forward"
      key="right-arrow" 
      class="arrow" 
    >
      <svg width="51" height="30" viewBox="0 0 51 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line :stroke="this.arrowColor" x1="4.37114e-08" y1="15.5" x2="50" y2="15.5"/>
        <line :stroke="this.arrowColor" x1="36.3609" y1="0.653994" x2="50.2012" y2="15.0917"/>
        <line :stroke="this.arrowColor" x1="35.8773" y1="29.4794" x2="50.315" y2="15.6391"/>
      </svg>
    </span>

    <!-- А иначе влево -->
    <span 
      v-else
      key="left-arrow" 
      class="arrow-back" 
    >
      <svg width="50" height="31" viewBox="0 0 50 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line :stroke="this.arrowColor" x1="50" y1="14.8969" x2="0.652355" y2="14.8968"/>
        <line :stroke="this.arrowColor" y1="-0.5" x2="20.3011" y2="-0.5" transform="matrix(-0.672854 -0.739775 0.703458 -0.710736 14.4697 30)"/>
        <line :stroke="this.arrowColor" y1="-0.5" x2="20.2561" y2="-0.5" transform="matrix(-0.703458 0.710736 -0.672854 -0.739775 14.2495 0)"/>
      </svg>
    </span>


  </div>
</template>

<script>
export default {
  name: 'AppArrowButton',

  props: {
    title: String, // Текст кнопки
    styles: String, // Сss стиль
    forward: { // Направление стрелки 
      type: Boolean,
      default: true,
    }, 
    arrowColor: String, // Цвет стрелки
  },

  methods: {
    buttonClick() {
      this.$emit('click')
    }
  },
}
</script>

<style scoped>

  .wrap-button {
    position: relative;
    display: flex;
  }

  .wrap-button button {
    outline: none;
  }

  .title {
    color: var(--primary-background-color);
  }
  
  .arrow {
    width: 50px;
    height: 28px;
    position: absolute;
    left: -80px;
    top: 10px;
    transition: all 400ms ease; 
  }

  .title:hover ~ .arrow {
    transition: all 0.5s ease;
    transform: translateX(10px)
  }

  .arrow-back {
    width: 50px;
    height: 28px;
    position: absolute;
    left: -70px;
    top: 5px;
    transition: all 400ms ease; 
  }

  .title:hover ~ .arrow-back {
    transition: all 0.5s ease;
    transform: translateX(-10px)
  }
</style>