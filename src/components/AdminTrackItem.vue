<template>
  <!-- Компонент 1 трека, используется для добавления релиза -->
  <div
    v-if="track" 
    class="track-item" 
  >
      
      <!-- Оригинальное название файла, нужно чтобы мы не упустили авторов трека -->
      <small class="track-file-name">{{track.fileName}}</small>

      <!-- Кнопка воспроизведение и паузы у трека -->
      <AppPlayPauseBtn 
        :isPlay="isPlay"
        @playAudio="playAudio"
      />

      <!-- Обертка под инпуты -->
      <span class="track-inputs-wrap">
        <span class="track-number">{{ordinalNumber}}</span>

        <!-- Выбираем авторов для трека -->
        <treeselect
          v-model="authors"
          :multiple="true"
          :options="possibleAuthors"
          :required="true"
          placeholder="Выберите автора трека"
        />

        <input 
          v-model="trackName"
          type="text"
          class="input-name-track" 
          placeholder="Название трека" 
          required
        />
        
        <!-- Выбираем теги для трека -->
        <treeselect
          v-model="tags"
          :multiple="true"
          :options="possibleTags"
          :required="true"
          placeholder="Выберите теги трека"
        />
        
      
      </span>
   
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect' // Библиотека для выбора возможных авторов / тегов
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {mapMutations} from 'vuex'
import AppPlayPauseBtn from '@/components/AppPlayPauseBtn'

export default {
  name: 'AdminTrackItem',

  components: {
    Treeselect, // Библиотека для выбора возможных авторов и тегов трека
    AppPlayPauseBtn, // Кнопка которая отвечает за проигрывание трека
  },

  props: {
    track: Object, // file (Сам аудио файл) и info(информация о треке) 
    selectedAuthors: Array, // Получаем с родителя выбранных авторов для релиза, и прокидываем их в следующим компонент отвечающий за трек
    selectedTags: Array // Тоже самое, но с тегами
  },

  data: () => ({
    possibleAuthors: [], // Массив возможных авторов
    authors: [],  // Массив выбранных авторов для этого релиза
    trackName: null, // Название трека
    possibleTags: [], // Массив возможных тегов, которые мы получаем с бэка
    tags: [], // Массив тегов, так как их может быть у релиза несколько
    isPlay: false, // Инфа о том включен трек или нет
  }),

  computed: {
    ordinalNumber() { // Добавляет ноль вначале если меньше 10
      return 10 > this.track.ordinalNumber  ? '0' + this.track.ordinalNumber : this.track.ordinalNumber
    }
  },

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

      if (this.isPlay == false) {
        this.isPlay = true // Указываем что мы включили аудио
        this.track.audio.play()  // Включаем аудио файл
      } else {
        this.isPlay = false // Указываем что мы выключили аудио
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
/* .btn-audio-play {
  display: flex;
  grid-area: btn;
}

.btn-audio-play svg {
  margin: auto;
} */
</style>