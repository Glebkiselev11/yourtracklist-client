<template>
  <!-- Умный компонет, который по введенной сcылке понимает, что перед ним ссылка на конкретную соц сеть -->
  <div class="input-item">
    <input id="link" type="text" @change="link" placeholder="Введите ссылку на соц-сеть">
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'Socials-input',
  methods: {
    ...mapActions(['checkSocialLink']),

    // Отравлят запрос с этой ссылкой на бэк
    async link(link) {
      console.log(link.target.value)
      if (link.target.value !== '') {
        const result = await this.checkSocialLink(link.target.value)
        console.log(result)
      }
    }
  },

}


</script>