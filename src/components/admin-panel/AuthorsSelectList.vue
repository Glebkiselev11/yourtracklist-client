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

    <!-- Сюда мы чипсами будем выводить выбранных авторов -->
    <div class="author-chips-wrap">
      <span
        v-for="(author, index) in enterAuthors" 
        :key="index" 
        class="author-chip-item"
        :style="`flex-grow: ${author.name.length < 5 ? 1 : author.name.length < 10 ? 2 : author.name.length < 15 ? 3 : 4}`"
        @click="clearAuthor(index)"
      >{{author.name}}</span>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Authors-select-list',
  data: () => ({
    enterAuthors: [], // Массив выбранных авторов
    author: '', // Выбранный автор
  }),
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
  .author-chip-item {
    background-color: var(--primary-color);
    color: var(--primary-background-color);
    height: 20px;
    margin: 2px;
    padding: 0 4px 0 2px;
    white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis;
    font-size: .8rem;
    border: 1px solid var(--primary-color);
    position: relative;
  }
  /* Кнопка удаления автора */
  .author-chip-item::after {
    position: absolute;
    content: 'X';
    right: 0;
    color: white;
    height: 100%;
    width: 10px;
    text-align: center;
    font-weight: 300;
    background: rgba(128, 128, 128, 0.589);
  }

  .author-chip-item:hover {
    cursor: pointer;
  }
</style>

