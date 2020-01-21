<template>
  <!-- Компонент для добавления аудио записей с последующей отправкой их в телеграм -->
  <div class="tracks-prev-wrap">

    <!-- Итерируем добавленные треки -->
    <TrackItem 
      v-for="(track, index) in tracks"
      :key="index"
      :track="track"
      :selected-authors="selectedAuthors"
      :selected-tags="selectedTags"
    />


    <input type="file" id="tracks" @change="sync" required accept=".mp3,audio/*">

    <label class="btn-add-track" for="tracks">Добавить трек</label>

  </div>
</template>

<script>
import jsmediatags from 'jsmediatags' // Для вытаскивания метатегов из аудио файлов

import TrackItem from '@/components/admin-panel/TrackItem.vue'

export default {
  name: 'Add-tracks-prev',
  props: [
    'selectedAuthors', // Получаем с родителя выбранных авторов для релиза, и прокидываем их в следующим компонент отвечающий за трек
    'selectedTags', // Тоже самое, но с тегами
  ],
  components: {
    TrackItem, // Отвечает за 1 трека (мы их воспроизводим циклом в этом компоненте)

  },
  data: () => ({
    trackInfo: null, // Промежуточная информация о загруженном треке
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
          this.tracksInfo = { 
            name: t.tags.title, // Название трека
            number: t.tags.track, // Номер трека в альбоме
            isPlay: false, // Информация о том включен ли этот трек или нет
            fileName: e.target.files[0]['name'], // Полное имя файла
            
          }
        },
        onError: function (error) {
          console.log(error);
        }
      })

      this.selectAudio(file)
    },
    onAudioLoad(e) {
      this.content = e.target.result;
      
      // Добавляем аудио файл и информацию о нем в массив
      this.tracks.push({file: new Audio(this.content), info: this.tracksInfo})

      console.log(this.tracks)

    },

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




</style>