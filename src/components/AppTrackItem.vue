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

      <!-- Длительность трека -->
      <span>{{computedDuration(track.duration)}}</span>

    </div>
    

</template>

<script>
import duration from '@/mixins/duration.mixin.js'
import AppPlayPauseBtn from '@/components/AppPlayPauseBtn'

export default {
  name: 'AppTrackItem',

  components: {
    AppPlayPauseBtn, // Кнопка плей / паузы
  },

  mixins: [
    duration, // Внутри computedDuration он превращает секунды например 90 в 01:30
  ],

  props: {
    track: Object
  },

  data: () => ({
    isPlay: false, // Инфа о том включен трек или нет
  }),

  methods: {
    playAudio() { // Воспроизводит аудио файл

      if (this.isPlay == false) {
        this.isPlay = true // Указываем что мы включили аудио
        // this.track.audio.play()  // Включаем аудио файл
      } else {
        this.isPlay = false // Указываем что мы выключили аудио
        // this.track.audio.pause() // Ставим на паузу аудио файл
      }
    }
  },


}
</script>

<style sooped>
  /* Обертка под весь итем */
  .track-wrap {
    display: flex;
    align-items: center;
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

  
</style>