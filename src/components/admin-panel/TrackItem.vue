<template>
  <!-- Компонент 1 трека, используется для добавления релиза -->
  <div class="track-item" v-if="track">
    <!-- Кнопка воспроизведение и паузы у трека -->
      <span class="btn-audio-play" @click="playAudio()">

        <!-- Play -->
        <svg v-show="track.info.isPlay"
          version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" viewBox="0 0 512 512">
          <g>
          </g>
          <path d="M162.642 148.337h56.034v215.317h-56.034v-215.316z" fill="#000000" />
          <path d="M293.356 148.337h56.002v215.317h-56.002v-215.316z" fill="#000000" />
        </svg>

        <!-- Pause -->  
        <svg v-show="!track.info.isPlay"
          version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" viewBox="0 0 512 512">
          <g>
          </g>
          <path d="M152.443 136.417l207.114 119.573-207.114 119.593z" fill="#000000" />
        </svg>

      </span>
      
      <!-- Обертка под инпуты -->
      <span class="track-inputs-wrap">
        <span class="track-number" >{{10 > track.info.number  ? '0' + track.info.number : track.info.number }} </span>

        <!-- Выбираем авторов для трека -->
        <treeselect
          :multiple="true"
          :options="possibleAuthors"
          placeholder="Выберите автора релиза"
          v-model="authors"
        />

        <input type="text" v-model="track.info.name" placeholder="Название трека"/>
        

        <!-- Выбираем теги для трека -->
        <treeselect
          :multiple="true"
          :options="possibleTags"
          placeholder="Выберите теги релиза"
          v-model="tags"
        />
        
      
      </span>
   
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect' // Библиотека для выбора возможных авторов / тегов
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'Track-item',
  props: [
    'track' // Объект с file (Сам аудио файл) и info(информация о треке)
  ],
  components: {
    Treeselect // Библиотека для выбора возможных авторов и тегов трека
  },
  data: () => ({
    possibleAuthors: [], // Массив возможных авторов
    authors: [],  // Массив выбранных авторов для этого релиза

    possibleTags: [], // Массив возможных тегов, которые мы получаем с бэка
    tags: [], // Массив тегов, так как их может быть у релиза несколько
  }),

  methods: {
    // Воспроизводит аудио файл
    playAudio() {
      if (this.track.info.isPlay == false) {
        this.track.info.isPlay = true // Указываем что мы включили аудио
        this.track.file.play()  // Включаем аудио файл
      } else {
        this.track.info.isPlay = false // Указываем что мы выключили аудио
        this.track.file.pause() // Ставим на паузу аудио файл
      }
    },
  },

  async created() {
     
    // При создании подгружаю:
    this.possibleAuthors = await this.$store.dispatch('getAuthors') // Всех возможных авторов
    this.possibleTags = await this.$store.dispatch('getTags') // Все возможные теги
  },
}
</script>


<style scoped>
.track-item {
  margin-bottom: 5px;
  height: 70px;
  border: 1px solid black;
  padding: 5px;
  display: inline-grid;
  grid-template-columns: 0.5fr 6fr;

}

/* Обертка под инпуты */
.track-inputs-wrap {
  width: 100%;
  display: inline-grid;
  grid-template-columns: 0.3fr 3fr 4fr 2fr;
  align-items: center;
  grid-gap: 10px;
}

.track-number {
  font-size: 1.5rem;
}

/* Воспроизведение аудио файла */
.btn-audio-play {
  margin-right: 10px;
  flex-shrink: 1;
  padding: 0 5px;
  border: 1px solid black;
  cursor: pointer;
}
</style>