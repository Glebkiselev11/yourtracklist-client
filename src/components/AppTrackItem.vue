<template>
  <!-- Компонент предназначен для 1 трека, который можно послушать (будет использоваться в релизах а потом и по отдельности) -->
    <div class="track-wrap">


      <div class="left-side-track">
        <!-- Кнопка воспроизведение и паузы у трека -->
        <AppPlayPauseBtn 
          :isPlay="isPlay"
          @playAudio="playAudio"
        />

        <span
          v-for="(author, index) of track.authors_permalink"
          :key="index"
          class="author-item"
        >
          <router-link 
            :to="`/author/${author}`"
            class="author-link"
          >{{track.authors_name[index]}}</router-link>{{track.authors_name.length - 1 != index ? ' & ' : ''}}
        
        </span>
        
          —
        <!-- Название трека -->  
        <span class="track-name">{{track.name}}</span>
      </div>

      <div class="right-side-track">
        
        <input
          v-show="isPlay || audioStream" 
          v-model.number="trackVolume" 
          type="range" 
          min="0" 
          max="100"
          class="volume-range"
        />

        <!-- Длительность трека -->
        <span>{{`${currentDuration} | ${computedDuration(track.duration)}`}}</span>

        
      </div>

      
      
      <span class="progress-bar">
        <span 
          class="progress-bar-current"
          :style="{ width: percentComplete + '%' }"
        >
        </span>
      </span>

    </div>
</template>

<script>
import duration from '@/mixins/duration.mixin.js'
import AppPlayPauseBtn from '@/components/AppPlayPauseBtn'
import {mapMutations} from 'vuex'

export default {
  name: 'AppTrackItem',

  components: {
    AppPlayPauseBtn, // Кнопка плей / паузы
  },

  mixins: [
    duration, // Внутри computedDuration он превращает секунды например 90 в 01:30
  ],

  props: {
    track: {
      type: Object,
      required: true,
    }
  },

  data: () => ({
    isPlay: false, // Инфа о том включен трек или нет
    audioStream: null, // Аудио поток 
    currentSeconds: 0, // Текущее время трека
  }),

  computed: {
    trackVolume: {
      get() {
        return this.$store.getters.trackVolume
      },
      set(volume) { // Устанавливаем в стейт и сразу в аудио поток, звук
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
    ...mapMutations(['setTrackVolume']),

    playAudio() { // Воспроизводит аудио файл
      if (this.audioStream === null) { // Сначала создает поток, если его еще нет
        this.audioStream = new Audio(`/api/track/${this.track.file_id}`)
        // Добавляю прослушку на обновление времени
        this.audioStream.addEventListener('timeupdate', this.update);
        // Ставим локальную громкость трека
        this.audioStream.volume = this.trackVolume / 100
      } 

      // Включает / выключает трек
      if (this.isPlay == false) {
        this.isPlay = true 
        this.audioStream.play()
      } else {
        this.isPlay = false
        this.audioStream.pause() 
      }
    },

    // Обновляем текущее время, отслеживая обновления на аудио элементе (то бишь эмулируем реактивность)
    update() {
      this.currentSeconds = parseInt(this.audioStream.currentTime);
    }

  },
}
</script>

<style sooped>
  /* Обертка под весь итем */
  .track-wrap {
    display: flex;
    align-items: center;
    position: relative;
  }

  /* Левая часть */
  .left-side-track {
    display: flex;
    align-items: center;
  }
  .author-item {
    font-weight: 500;
    margin-right: .2em;
  }
  .track-name {
    margin-left: .2em;
  }
  .author-link:hover {
    border-bottom: 2px solid rgba(0, 0, 0, 0.829);
  }


  .right-side-track {
    display: flex;
    align-items: center;
  }
  .volume-range {
    width: 50px;
    margin-right: 5px;
  }


  .progress-bar {
    height: 3px;
    width: 100%;
    background: rgb(199, 199, 199);
    position: absolute;
    bottom: 0;
  }
  .progress-bar-current {
    position: absolute;
    background: black;
    height: 3px;
  }

  
</style>