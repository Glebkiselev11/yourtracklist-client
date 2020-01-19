<template>
  <!-- Инпут с списком возможных авторов, который у нас есть 
  в формах добаления релизов и видео -->
  <div class="input-item">

    <!-- Здесь мы вводим автора в поиск -->
    <input 
      type="text" 
      placeholder="Автор(ы)"
      list="authorslist" 
      v-model="author" 
      @change="setAuthor"
    >

    <!-- Удобный поиск авторов в списке -->
    <datalist id="authorslist" >
      <option 
        v-for="(author, index) in authorsArray" 
        :key="index" 
        :value="author.permalink"
        :label="author.name"
      ></option>
    </datalist>

    
    <div class="author-chips-wrap">
      <!-- Сюда мы чипсами будем выводить выбранных авторов -->
      <Chip 
        v-for="(author, index) in enterAuthors"
        :key="index"
        :chip="author.name"
        :buttonTitleMessage="'Убрать автора'"
        @destroy="clearAuthor(index)"
      />

    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Chip from '@/components/app/Chip.vue'

export default {
  name: 'Authors-select-list',
  data: () => ({
    enterAuthors: [], // Массив выбранных авторов
    author: '', // Выбранный автор
  }),
  components: {
    Chip, // Чипса, которые мы итерируем
  },
  computed: {
    ...mapGetters([
      'authorsArray', // Массив возможных авторов
    ]),
  },
  methods: {
    ...mapMutations(['clearSelectedAuthor', 'returnSelectedAuthor']),

    // Вносим выбранного автора в массив выбранных авторов :)
    setAuthor() {
      // Находим в нашем массиве возможных авторов по пермалинку
      const findAuthor = this.authorsArray.find((e) => {
        if( e.permalink === this.author) 
          return e
        }) 

      this.enterAuthors.push(findAuthor) // И вносим результат в массив выбранных авторов
      
      this.clearSelectedAuthor(this.author) // Удаляем из массива возможных авторов, того автора которого выбрали
      this.author = '' // После очищаем выбранного автора
      
    },
    // Удаляем выбранного автора
    clearAuthor(index) {
      this.returnSelectedAuthor(this.enterAuthors[index]) // Сначала возвращаем в массив возможных авторов
      this.enterAuthors.splice(index, 1) // А после удаляем из выбранных авторов
    }
  },

  // Получаем список возможных авторов
  async created() {
    await this.$store.dispatch('getAuthors')
  },
  watch: {
    // Передает родителю выбранного автора
    enterAuthors(enterAuthors) {
      this.$emit('selected', enterAuthors)
    }
  },
}
</script>


<style scoped>
  .author-chips-wrap {
    margin-top: 2px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
</style>

