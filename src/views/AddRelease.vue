<template>
  <!-- Страница через которую мы будем добавлять новый релиз -->
  <!-- ! Тестовый компонент, на котором мы тестируем добавление через телеграм -->
  <form class="form-wrap" @submit.prevent="addNewRelease">
    
      <!-- Стандартные поля -->
      <div class="input-wrap">

        <!-- Для добавления обложки -->
        <CoverPrev
          @cover="setCover"
          v-if="reload"
        
        />

        <div class="input-item">
          <label for="name">Название релиза</label>
          <input type="text" id="name" v-model="name" required>
        </div>


        <!-- Компоненты куда мы подгружаем всех возможных авторов с базы данных -->
        <AuthorSelectList
          v-if="reload"
          @selected="selectedAuthors"
        />

      </div>

    
      <!-- Для добавления треков -->
      <AddTracksPrev class="tracks-wrap" 
        v-if="reload"
        @track="setTrack"
      />


    <button type="submit">Добавить</button>
  </form>
</template>

<script>
import CoverPrev from '@/components/admin-panel/CoverPrev.vue'
import AddTracksPrev from '@/components/admin-panel/AddTracksPrev.vue'
import AuthorSelectList from '@/components/app/AuthorsSelectList.vue'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Add-release',
  components: {
    CoverPrev, // Компонент для предпросмотра обложки перед тем  как залить альбом
    AddTracksPrev, // Компонент для добавления аудио и отображения загруженных аудио перед загрузкой
    AuthorSelectList, // Компонент куда подгружаются все возможные авторы в нашей базе данных, TODO: нужно будет его перереботать в будущем
  },
  data: () => ({
    reload: true, // ! Нужна чтобы заставить дочерние компоненты пересоздаться
    name: '', // Название релиза
    cover: null, // Сам файл обложки
    tracks: [], // Массив отправляемых треков
    authors: [],  // Массив авторов, так как их может быть несколько, указываем там уникальные ссылки авторов (permalink)
  }),
  computed: {
    ...mapGetters(['statusForRelease']),
  },
  methods: {
    ...mapActions(['addRelease']),

    // Добавляем новый релиз в базу данных
    async addNewRelease() {

      let formData = new FormData();

      formData.append('name', this.name) // Название релиза
      formData.append('cover', this.cover) // Обложка релиза

      // Добавляем авторов релиза
      for (let i = 0; i < this.authors.length; i++) {
        formData.append('authors', this.authors[i].permalink) // Автор(ы) релиза
      }

      // Добавляем треки
      for (let i = 0; i < this.tracks.length; i++) {
        formData.append('tracks', this.tracks[i])
      }

      // И отравляем на бэк все данные
      await this.addRelease(formData)

      // TODOS: После добавления нового автора очищаем инпуты, если нету ошибки
      if (this.statusForRelease.status === 'ok') {

        // Откючаем дополнительные комопненты (чтобы вызвать их перерисовку)
        this.reload = false

        this.name = ''
        this.cover = null
        this.tracks = []
        this.authors = []

        // Cнова включаем
        setTimeout(() => { this.reload = true }, 0)
        
      }

    },

    // Получаем с дочернего компонента обложку
    setCover(c) {
      this.cover = c
    },

    // Получаем с дочернего компонента трек 
    setTrack(t) {
      // И добавляем его в массив треков
      this.tracks.push(t)
    },

    // Получаем выбранных авторов для релизов
    selectedAuthors(a) {
      this.authors = a
    }
  },
}
</script>

<style scoped>
  .form-wrap {
    display: grid;
    grid-template-areas: 
      "input tracks"
      "button .";
    grid-template-rows: 1fr 0.3fr;
    grid-template-columns: 300px auto;
    grid-gap: .5em;
  }

  .input-wrap {
    grid-area: input;
  }

  .tracks-wrap {

  }

  .input-item {
    display: flex;
    width: 200px;
    flex-direction: column;
    margin: 5px 0px;
  }

  button {
    width: 200px;
    max-height: 35px;
    border: 1px solid black;
    background: transparent;
    font-weight: 400;
    font-size: 16px;
    padding: 7px 20px;
    grid-area: button;
  }
</style>