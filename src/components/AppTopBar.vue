<template>
  <!-- Используется у превьюх видео/релизов куда выводяться 4 последних -->
  <div class="top-bar">
    <h2>{{title}}</h2>
    
    <AnimationButton
      v-show="isShowButton"
      :title="'Показать больше'"
      @click="$emit('click')"
    />

  </div>
</template>

<script>
import AnimationButton from '@/components/AppAnimationButton'
export default {
  name: 'AppTopBar',

  components: {
    AnimationButton
  },

  props: {
    title: String, // Заголовок

    isShowButton: { // Решает показывать ли нам кнопку 'показать больше' или нет
      type: Boolean,
      default: false
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

</style>