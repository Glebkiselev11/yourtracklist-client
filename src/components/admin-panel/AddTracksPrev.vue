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
      
      <!-- Обертка под инпуты -->
      <span class="track-inputs-wrap">
        <input type="text" class="track-input-number" v-model="track.number"/>
        )
        <!-- <input type="text" v-model="track.artist" placeholder="Автор(ы) трека"/> -->

        <AuthorSelectList 

        />

        —
        <input type="text" v-model="track.name" placeholder="Название трека"/>
        |
        <input type="text" v-model="track.tags" placeholder="Теги трека"/>
      
      </span>

      <!-- Полное название трека -->
      <span class="track-full-name">{{track.fileName}}</span>
      

    </div>

    <input type="file" id="tracks" @change="sync" required accept=".mp3,audio/*">

    <label class="btn-add-track" for="tracks">Добавить трек</label>

  </div>
</template>

<script>
import jsmediatags from 'jsmediatags' // ! Для вытаскивания метатегов из аудио файлов
import AuthorSelectList from '@/components/admin-panel/AuthorsSelectList.vue'

export default {
  name: 'Add-tracks-prev',
  components: {
    AuthorSelectList, // Выбор возможных авторов для конкретного трека
  },
  data: () => ({
    tracksInfo: [], // Информация о загруженных аудио
    tracks: [], // Треки который можно прослушать
  }),
  methods: {
    selectAudio(file) {
      // Отправляем в родительский компонент файл для отправки на бэк
      this.$emit('track', file)

      let reader = new FileReader();

      reader.onload = this.onAudioLoad;
      reader.readAsDataURL(file)
    },
    sync(e) {
      e.preventDefault()

      const file = e.target.files[0]

      // Вытаскиваем мета теги из трека (используем для этого стороннюю библиотеку jsmediatags)
      jsmediatags.read(file, {
        onSuccess: (t) => {

          // Добавляем информацию о треке 
          this.tracksInfo.push({ 
            name: t.tags.title, // Название трека
            artist: t.tags.artist, // Автора трека
            number: t.tags.track, // Номер трека в альбоме
            fileName: e.target.files[0]['name'],
            isPlay: false, // Информация о том включен ли этот трек или нет
          })
        },
        onError: function (error) {
          console.log(error);
        }
      })

      this.selectAudio(file)
    },
    onAudioLoad(e) {
      this.content = e.target.result;
      // Добавляем аудио трек в массив
      this.tracks.push(new Audio(this.content))

      console.log(this.tracks)

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

/* Главная обертка для треков
.tracks-prev-wrap {

} */

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
  margin-top: 10px;
  border: 1px solid black;
  padding: 5px;
}

.btn-add-track:hover {
  background: black;
  color: white;
}


.track-item {
  margin-bottom: 5px;
  height: 70px;
  border: 1px solid black;
  padding: 5px;
  display: flex;
  align-items: flex-start;
}

/* Обертка под инпуты */
.track-inputs-wrap {
  display: flex;
  align-items: flex-start;
}

/* Нумерация трека */
.track-input-number  {
  max-width: 20px;
}

/* Название аудио файла (полезно, когда у трека не заполнены метатеги) */
.track-full-name {
  font-size: .8rem;
  margin-left: 5px;
  max-width: 250px;
  padding: 1px;
  border: 1px dotted grey;

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