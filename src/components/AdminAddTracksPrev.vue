<template>
  <!-- Компонент для добавления аудио записей с последующей отправкой их в телеграм -->
  <div class="tracks-prev-wrap">

    <!-- Итерируем добавленные треки -->
    <AdminTrackItem 
      v-for="(track, index) in tracks"
      :key="index"
      :track="track"
      :selected-authors="selectedAuthors"
      :selected-tags="selectedTags"
    />

    
    <input 
      id="tracks" 
      type="file" 
      required 
      accept=".mp3,audio/*"
      @change="sync"
    >

    <label
      for="tracks" 
      class="btn-add-track" 
    >Добавить трек
    </label>

  </div>
</template>

<script>
import jsmediatags from 'jsmediatags' // Для вытаскивания метатегов из аудио файлов

import AdminTrackItem from '@/components/AdminTrackItem.vue'

import {mapMutations, mapGetters} from 'vuex'

export default {
  name: 'AdminAddTracksPrev',
  components: {
    AdminTrackItem, // Отвечает за 1 трека (мы их итерируем циклом в этом компоненте)
  },

  props: {
    selectedAuthors: Array, // Получаем с родителя выбранных авторов для релиза, и прокидываем их в следующим компонент отвечающий за трек
    selectedTags: Array // Тоже самое, но с тегами
  },

  data: () => ({
    trackInfo: null, // Промежуточная информация о загруженном треке
    file: null, // Промежуточный аудио файл
  }),

  computed: {
    ...mapGetters([
      'tracks', // Массив сформированных треков с информацией, которые отравляем уже на бэк
    ])
  },
  
  methods: {
    ...mapMutations([
      'pushTrack', // Добавляет 1 трек в массив
    ]),

    selectAudio(file) {
      this.file = file // Добавляем именно аудио файл

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
            name: t.tags.title || null, // Название трека
            ordinalNumber: t.tags.track || 0, // Номер трека в альбоме
            fileName: file['name'], // Полное имя файла
          }

          this.selectAudio(file) // Отправляем на создание аудио файла из этого трека
        },
        onError: (error) => {
          console.log(error)
        }

      })

    },

    onAudioLoad(e) {
      this.content = e.target.result;

      // Добавляем аудио файл и информацию о нем в массив стейта
      this.pushTrack({
        file: this.file,  // Сам файл трека (который мы отправим на бэк)
        audio: new Audio(this.content), // Делаем из него трек, который можно послушать (для предпросмотра)
        name: this.tracksInfo.name, // Название релиза
        fileName: this.tracksInfo.fileName, // Полное имя файла
        ordinalNumber: this.tracksInfo.ordinalNumber, // Номер трека в альбоме
        tags: [], // Теги релиза
        authors: [], // Авторы трека
      })
    },

  },

}
</script>

<style scoped>


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