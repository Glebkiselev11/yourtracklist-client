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
import Chip from '@/components/app/Chip.vue'

export default {
  name: 'Authors-select-list',
  data: () => ({
    enterAuthors: [], // Массив выбранных авторов
    author: '', // Выбранный автор
    authorsArray: null, // Массив возможных авторов
  }),
  components: {
    Chip, // Чипса, которые мы итерируем
  },

  methods: {
    // Вносим выбранного автора в массив выбранных авторов :)
    setAuthor() {
      // Находим в нашем массиве возможных авторов по пермалинку
      const findAuthor = this.authorsArray.find((e) => {
        if( e.permalink === this.author) 
          return e
        }) 

      this.enterAuthors.push(findAuthor) // И вносим результат в массив выбранных авторов
      
      // Удаляем из массива возможных авторов, того автора которого выбрали
      for (let i = 0; i < this.authorsArray.length; i++) {
        if (this.authorsArray[i].permalink === this.author) {
          this.authorsArray.splice(i, 1)
          break;
        }
      }

      this.author = '' // После очищаем выбранного автора
    },

    // Удаляем выбранного автора
    clearAuthor(index) {
      this.authorsArray.push(this.enterAuthors[index]) // Сначала возвращаем в массив возможных авторов
      this.enterAuthors.splice(index, 1) // А после удаляем из выбранных авторов
    }
  },

  // Получаем список возможных авторов
  async created() {
    // И вносим их в локальную переменную
    this.authorsArray = await this.$store.dispatch('getAuthors')
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
    width: 100%;
  }
</style>

