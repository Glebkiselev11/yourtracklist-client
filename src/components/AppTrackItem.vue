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
          v-show="isPlay" 
          v-model.number="trackVolume" 
          type="range" 
          min="0" 
          max="100"
          class="volume-range"
        />

        <!-- Длительность трека -->
        <span :title="`${currentDuration} из ${computedDuration(track.duration)}`">
          <span v-show="isPlay">{{currentDuration}}</span>
          <span v-show="!isPlay">{{computedDuration(track.duration)}}</span>
        </span>
        
      
      </div>

    
      <span 
        @click="seek"
        class="progress-bar" 
      >
        <span 
          class="progress-seeker"
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
    },

    currentSeconds: {
      type: [String, Number]
    },

    isPlay: {
      type: Boolean
    },

    audioIndex: {
      type: Number, // Номер под которым этот трек идет в плейлисте
    }
  },

  computed: {
    trackVolume: {
      get() {
        return this.$store.getters.trackVolume
      },
      set(volume) { // Устанавливаем в стейт и сразу в аудио поток громкость
        this.$emit('setVolume', volume / 100)
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
      this.$emit('playAudio', {
        fileId: this.track.file_id, // Айди файла
        audioIndex: this.audioIndex, // Индекс трека в плейлисте релиза
      })
    },

    seek(e) { // Выбираем место на прогресс баре с какого отрезка хотим включить трек
			if (!this.isPlay) {
				return;
      }
			const el = e.target.getBoundingClientRect();
			const seekPos = (e.clientX - el.left) / el.width;

      this.$emit('seek', parseInt(this.track.duration * seekPos))
		},
    

  },
}
</script>

<style sooped>
  /* Обертка под весь итем */
  .track-wrap {
    display: flex;
    align-items: center;
    position: relative;
    flex-wrap: wrap;
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
    width: 80px;
    margin-right: 5px;
  }


  .progress-bar {
    height: 3px;
    width: 100%;
    cursor: pointer;
    background: rgba(199, 199, 199, 0.438);
    z-index: 2;
    position: relative;
    bottom: 0;
  }
  .progress-seeker {
    position: absolute;
    z-index: -1;
    background: black;
    height: 3px;
    bottom: 0;
		left: 0;
    top: 0;
  }

  
</style>