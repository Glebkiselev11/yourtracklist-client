<template>
  <!-- Компонент 1 трека, используется для добавления релиза -->
  <div class="track-item" v-if="track">
      
      <!-- Оригинальное название файла, нужно чтобы мы не упустили авторов трека -->
      <small class="track-file-name">{{track.fileName}}</small>

      <!-- Кнопка воспроизведение и паузы у трека -->
      <span class="btn-audio-play" @click="playAudio()">

        <!-- Play -->
        <svg v-if="track.isPlay === true"
          version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" viewBox="0 0 512 512">
          <g>
          </g>
          <path d="M162.642 148.337h56.034v215.317h-56.034v-215.316z" fill="#000000" />
          <path d="M293.356 148.337h56.002v215.317h-56.002v-215.316z" fill="#000000" />
        </svg>

        <!-- Pause -->  
        <svg v-if="track.isPlay === false"
          version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" viewBox="0 0 512 512">
          <g>
          </g>
          <path d="M152.443 136.417l207.114 119.573-207.114 119.593z" fill="#000000" />
        </svg>

      </span>
      
      <!-- Обертка под инпуты -->
      <span class="track-inputs-wrap">
        <span class="track-number" >{{10 > track.ordinalNumber  ? '0' + track.ordinalNumber : track.ordinalNumber }} </span>

        <!-- Выбираем авторов для трека -->
        <treeselect
          :multiple="true"
          :options="possibleAuthors"
          placeholder="Выберите автора трека"
          v-model="authors"
          :required="true"
        />

        <input class="input-name-track" type="text" v-model="trackName" placeholder="Название трека" required/>
        
        <!-- Выбираем теги для трека -->
        <treeselect
          :multiple="true"
          :options="possibleTags"
          placeholder="Выберите теги трека"
          v-model="tags"
          :required="true"
        />
        
      
      </span>
   
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect' // Библиотека для выбора возможных авторов / тегов
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {mapMutations} from 'vuex'

export default {
  name: 'Track-item',

  components: {
    Treeselect // Библиотека для выбора возможных авторов и тегов трека
  },

  props: [
    'track', // Объект с file (Сам аудио файл) и info(информация о треке)
    'selectedAuthors', // Авторы выбранные для релиза, ставим их по умолчанию для треков
    'selectedTags', // Теги выбранные для релиза, ставим их по умолчанию для треков
  ],

  data: () => ({
    possibleAuthors: [], // Массив возможных авторов
    authors: [],  // Массив выбранных авторов для этого релиза
    trackName: null, // Название трека
    possibleTags: [], // Массив возможных тегов, которые мы получаем с бэка
    tags: [], // Массив тегов, так как их может быть у релиза несколько
  }),

  watch: {
    $data: {
      // Если что то поменяли в треке, то синхронизируем это с нашим стором
      handler: function() {
        this.syncTracksOfNumber({ 
          authors: this.authors,
          tags: this.tags,
          name: this.trackName,
          ordinalNumber: this.track.ordinalNumber,
          file: this.track.file,
          audio: this.track.audio,
          isPlay: this.track.isPlay,
          fileName: this.track.fileName
        })
      },
      deep: true
    }
  },

  async created() {
    // При создании подгружаю:
    this.possibleAuthors = await this.$store.dispatch('getAuthors') // Всех возможных авторов
    this.possibleTags = await this.$store.dispatch('getTags') // Все возможные теги

    // Ставим сразу авторов кокотоыре выбраны для релиза (потому что скорей всего он(и) являются автором этого трека (за редким исключением))
    if (this.selectedAuthors) {
      this.authors = this.selectedAuthors
    }

    if (this.selectedTags) {
      this.tags = this.selectedTags
    }

    if (this.track) {
      this.trackName = this.track.name || null
    }
  },

  methods: {
    ...mapMutations([
      'syncTracksOfNumber', // Синхронизирует новую информацию с треком по номеру в релизе
    ]),

    // Воспроизводит аудио файл
    playAudio() {
      
      if (this.track.isPlay == false) {
        this.track.isPlay = true // Указываем что мы включили аудио
        this.track.audio.play()  // Включаем аудио файл
      } else {
        this.track.isPlay = false // Указываем что мы выключили аудио
        this.track.audio.pause() // Ставим на паузу аудио файл
      }
    },
    
  },
  


  


  
}
</script>


<style scoped>
.track-item {
  margin-bottom: 5px;
  border-radius: 4px;
  border: 1px solid black;
  padding: 5px;
  display: inline-grid;
  grid-template-columns: 0.5fr 6fr;
  grid-template-rows: 18px 1fr;
  grid-template-areas: 
    ". file"
    "btn inputs";
}

/* Название файла (трека) */
.track-file-name {
  width: 100%;
  grid-area: file;
  font-size: .8rem;
}

/* Обертка под инпуты */
.track-inputs-wrap {
  width: 100%;
  display: inline-grid;
  grid-template-columns: 0.2fr 3fr 4fr 3fr;
  align-items: center;
  grid-gap: 10px;
  grid-area: inputs;
}

.track-number {
  font-size: 1.5rem;
}

.input-name-track {
  border: 1px solid rgba(128, 128, 128, 0.363);
  padding: 3px;
  border-radius: 5px;
  font-size: 1rem;
  height: 35px;
}

/* Воспроизведение аудио файла */
.btn-audio-play {
  display: flex;
  grid-area: btn;
}

.btn-audio-play svg {
  margin: auto;
}
</style>