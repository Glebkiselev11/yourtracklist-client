<template>
  <!-- Плейлист в релизе -->
  <div class="release-playlist">

    <!-- Компонент 1 трека -->
    <AppTrackItem 
      v-for="(track, i) of releaseTracks"
      :key="i"
      :track="track"
      :currentSeconds="track.file_id === trackIdIsPlay ? currentSeconds : 0"
      :isPlay="track.file_id === trackIdIsPlay ? isPlay : false"
      class="release-track"
      @playAudio="playAudio"
      @seek="seek"
      @setVolume="setVolume"
    />

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AppTrackItem from '@/components/AppTrackItem'
export default {
  name: 'ReleasePlaylist',

  components: {
    AppTrackItem, // Циклом передаем туда информацию о 1 треке
  },

  data: () => ({
    audioStream: null, // Аудио поток 
    isPlay: false, // Инфа о том включен трек или нет
    currentSeconds: 0, // Текущее время трека
    trackIdIsPlay: null, // Айди файла, который в данный момент играет
  }),

  computed: {
    // Тут мы его получаем
    ...mapGetters([
      'releaseTracks', // Треки релиза (пока только информация о треках, без файлов)
    ]),

    trackVolume: {
      get() {
        return this.$store.getters.trackVolume
      },
      set(volume) { // Устанавливаем в стейт и сразу в аудио поток громкость
        this.audioStream.volume = volume / 100
        this.setTrackVolume(volume)
      }
    },

    currentDuration() { // Дополнительно преобразовывает секунды в формат времени
      return this.computedDuration(this.currentSeconds)
    },

    percentComplete() { // Высчитываем процент для прогресс бара
			return this.currentSeconds / this.track.duration * 100
		},
  },


  methods: {
    playAudio(fileId) {

      
      // Сначала создает поток, если это новый какой то трек
      if (this.trackIdIsPlay !== fileId) { 
        this.trackIdIsPlay = fileId

        if (this.audioStream) {
          this.currentSeconds = 0
          this.audioStream.pause()
          this.audioStream.setAttribute('src', `/api/track/${fileId}`)
          this.audioStream.load()

          setTimeout(() => {
            this.audioStream.play()
          }, 100)

        } else {
          this.audioStream = new Audio(`/api/track/${fileId}`)
        }
        
      
        // Добавляю прослушку на обновление времени
        this.audioStream.addEventListener('timeupdate', () => { 
          this.currentSeconds = parseInt(this.audioStream.currentTime) 
        })

        
        // Прослушка на включен не включен
        this.audioStream.addEventListener('pause', () => { this.isPlay = false })
        this.audioStream.addEventListener('play', () => { this.isPlay = true })

        // Ставим локальную громкость трека
        this.audioStream.volume = this.trackVolume / 100
      } 

      if (this.isPlay == false) { // Включает / выключает трек
        this.audioStream.play()
      } else {
        this.audioStream.pause() 
      }
    },

    seek(s) {
      console.log(s)
      this.audioStream.pause()

      this.audioStream.currentTime = s

      this.audioStream.play()
    },

    setVolume(volume) {
      this.audioStream.volume = volume
    }
  },

}
</script>

<style scoped>

/* Обертка под треки релиза */
.release-playlist {
  margin-top: 50px;
  border-top: 1px solid black;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
}

.release-track {
  line-height: 2em;
  display: flex;
  justify-content: space-between;

}
</style>