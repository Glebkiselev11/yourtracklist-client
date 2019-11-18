<template>
  <!-- На главной странице у секций вверху находится заголовок и кнопка -->
  <div class="top-bar">
    <h2>{{title}}</h2>
    
    <AnimationButton
      @click="click"
      :title="'Показать больше'"
    />
  </div>
</template>

<script>
import AnimationButton from '@/components/app/AnimationButton'
export default {
  name: 'TopBar',
  props: ['title'],
  components: {
    AnimationButton
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