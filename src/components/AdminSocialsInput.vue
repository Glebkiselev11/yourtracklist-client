<template>
  <!-- Умный компонет, который по введенной сcылке понимает, что перед ним ссылка на конкретную соц сеть -->
  <div class="input-item">
    <input id="link" type="text" @change="link" placeholder="Введите ссылку на соц-сеть">

    <!-- Сюда итерируем выбранные соц сети -->
    <div class="soc-chips-wrap">
      <!-- Сюда мы чипсами будем выводить введенные соц сети -->
      <Chip 
        v-for="(soc, index) in socials"
        :key="index"
        :chip="soc.socialDefined"
        :title="soc.link"
        :buttonTitleMessage="'Убрать соц сеть'"
        @destroy="clearSoc(index)"
      />

    </div>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
import Chip from '@/components/AdminChip.vue'

export default {
  name: 'AdminSocialsInput',

  components: {
    Chip, // Чипса, которые мы итерируем
  },

  data: () => ({
    socials: [], // Массив введенных соц сетей
  }),

  watch: {
    // Передает родителю выбранные соц сети
    socials(socials) {
      this.$emit('selected', socials)
    }
  },
  
  methods: {
    ...mapActions(['checkSocialLink']),

    // Отравлят запрос с этой ссылкой на бэк
    async link(link) {
      if (link.target.value !== '') {

        // Вносит в массив выбранных соц сетей
        this.socials.push(await this.checkSocialLink(link.target.value))

        link.target.value = ''; // Очищает поле (чтобы можно было внести еще одно)
      }
    },

    // Удаляем выбранную соц сеть
    clearSoc(index) {
      this.socials.splice(index, 1) // Удаляем из массива введенных соц сетей
    }
  },
  

  

}


</script>


<style scoped>
  .soc-chips-wrap {
    margin-top: 2px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
</style>