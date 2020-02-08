<template>
  <!-- Используется у превьюх видео/релизов куда выводяться 4 последних -->
  <div class="top-bar">
    <h2>{{title}}</h2>
    

    <AnimationButton
      v-if="count > 4"
      @click="click"
      :title="'Показать больше'"
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
    count: Number, // Количество всего релизов / видео (от этого зависит показываем ли мы кнопку или нет)
  },

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

</style>