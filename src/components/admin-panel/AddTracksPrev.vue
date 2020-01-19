<template>
  <!-- Компонент для добавления аудио записей с последующей отправкой их в телеграм -->
  <div class="tracks-prev-wrap">
    <!-- Итерируемый аудио файл (предпросмотр) -->
    <div class="track-item"
      v-for="(track, index) of tracksInfo"
      :key="index"
    > 
      <!-- Кнопка воспроизведение и паузы у трека -->
      <span class="btn-audio-play" @click="playAudio(index)">{{ track.isPlay ? 'Pause' : 'Play' }}</span>
      <!-- Нумер трека и название -->
      {{`${index + 1}) ${track.name}`}}
    </div>

    <input type="file" id="tracks" @change="sync" required accept=".mp3,audio/*">

    <label class="btn-add-track" for="tracks">Добавить трек</label>

  </div>
</template>

<script>
export default {
  name: 'Add-tracks-prev',
  data: () => ({
    tracksInfo: [], // Информация о загруженных аудио
    tracks: [], // Треки который можно прослушать
  }),
  methods: {
    selectAudio(file) {
      // Отправляем в родительский компонент файл для отправки на бэк
      console.log(file)
      this.$emit('track', file)

      let reader = new FileReader();

      reader.onload = this.onAudioLoad;
      reader.readAsDataURL(file);
    },
    sync(e) {
      e.preventDefault()


      // Добавляем информацию о треке 
      this.tracksInfo.push({ 
        name: e.target.files[0]['name'], // Название трека
        isPlay: false, // Информация о том включен ли этот трек или нет
      })

      this.selectAudio(e.target.files[0])
    },
    onAudioLoad(e) {
      this.content = e.target.result;
      // Добавляем аудио трек в массив
      this.tracks.push(new Audio(this.content))

    },

    // Воспроизводит аудио файл по индексу
    playAudio(index) {
      if (this.tracksInfo[index].isPlay == false) {
        this.tracksInfo[index].isPlay = true // Указываем что мы включили аудио
        this.tracks[index].play()  // Включаем аудио файл
      } else {
        this.tracksInfo[index].isPlay = false // Указываем что мы выключили аудио
        this.tracks[index].pause() // Ставим на паузу аудио файл
      }
    }
  },

}
</script>

<style scoped>

/* Главная обертка для треков */
.tracks-prev-wrap {
  border: 1px solid black;
}

/* Нужно для скрытия инпута (вместо него мы загружаем через лейбл) */
.tracks-prev-wrap #tracks {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.btn-add-track {
  display: block;
  cursor: pointer;
  margin: 10px;
}

.track-item {
  margin: 5px;
  
}

/* Воспроизведение аудио файла */
.btn-audio-play {
  margin-right: 10px;
  padding: 0 5px;
  border: 1px solid black;
  cursor: pointer;
}

</style>