<template>
  <!-- Компонент обратной связи, который пока используется только в футере -->
  <form @submit.prevent class="call-back-wrap">
    <h3>Оставить отзыв</h3>

    <div class="input-item">
      <input class="input" type="text" placeholder="Ваше имя" v-model="name">
    </div>

    <div class="input-item">
      
      <textarea class="input" placeholder="Комментарий" v-model="comment" maxlength="214" required></textarea>
      <span class="text-area-length" v-if="comment.length">{{comment.length}} / 214</span>
    </div>
    
    
    <AnimationButton
      @click="onSubmitComment"
      :title="'Отправить'"
    />

  </form>
</template>

<script>
import AnimationButton from '@/components/app/AnimationButton'
export default {
  name: 'Call-back',

  components: {
    AnimationButton
  },

  data: () => ({
    comment: '',
    name: ''
  }),

  methods: {
    // Отправляем в базу комментарий
    async onSubmitComment() {
      console.log(this.name)
      console.log(this.comment)
    }
  },
}
</script>

<style scoped>
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 25px;
  }

  .call-back-wrap {
    min-width: 280px;
    height: 215px;
    display: flex;
    flex-direction: column;
  }

  .input-item {
    margin-bottom: 42px;
    position: relative;
  }
  .input {
    max-width: 280px;
    min-width: 280px;
    height: 30px;
    min-height: 30px;
    max-height: 115px;
    width: 100%;
    font-size: 1rem;
  }

  /* span где отображется максимальное кол-во символов */
  .text-area-length {
    position: absolute;
    right: 0;
    top: -10px;
    font-size: .6rem;
  }


  button {
    width: 100%;
    border: 1px solid var(--primary-color);
  }
</style>