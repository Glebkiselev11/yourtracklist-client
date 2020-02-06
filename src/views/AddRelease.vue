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
          <input type="text" placeholder="Название релиза" v-model="name" required>
        </div>

        <!-- Компонент куда мы подгружаем всех возможных авторов с базы данных -->
        <treeselect
          :multiple="true"
          :options="possibleAuthors"
          placeholder="Выберите автора релиза"
          v-model="authors"
          :required="true"
        />
        
        <br>

        <!-- Выбираем теги для релиза -->
        <treeselect
          :multiple="true"
          :options="possibleTags"
          placeholder="Выберите теги релиза"
          v-model="tags"
          :required="true"
        />

        <!-- Вводим соц сети -->
        <SocialsInput
          v-if="reload"
          @selected="selectedSoc"
        />

        <div class="input-item">
          <input type="date" id="date" v-model="releaseDate" required placeholder="Дата выхода релиза">
        </div>

      </div>

    
      <!-- Обертка под добавление треков -->
      <AddTracksPrev class="tracks-wrap" 
        v-if="reload"
        :selected-authors="authors"
        :selected-tags="tags"
      />


    <!-- Показываем этот лоадер когда релиз добавляется (вместо кнопки) -->
    <Loader v-if="loading"/>

    <!-- Кнопка отправки релиза на сервер -->
    <button v-else type="submit">Добавить</button>

  </form>
</template>


<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import CoverPrev from '@/components/admin-panel/CoverPrev.vue'
import AddTracksPrev from '@/components/admin-panel/AddTracksPrev.vue'
import SocialsInput from '@/components/admin-panel/SocialsInput.vue'
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  name: 'Add-release',

  components: {
    CoverPrev, // Компонент для предпросмотра обложки перед тем  как залить альбом
    AddTracksPrev, // Компонент для добавления аудио и отображения загруженных аудио перед загрузкой
    SocialsInput, // По ссылке определяет соц сеть
    Treeselect, // Компонент через который мы выбираем несколько авторов / тегов
  },

  data: () => ({
    loading: false, // Нужна для отображения загрузки вместо кнопки( когда мы отправляем релиз)
    reload: true, // FIXME: (возможно это мы скоро удалим) Нужна чтобы заставить дочерние компоненты пересоздаться
    name: '', // Название релиза
    cover: null, // Сам файл обложки
    possibleAuthors: [], // Массив возможных авторов
    authors: [],  // Массив выбранных авторов для этого релиза
    possibleTags: [], // Массив возможных тегов, которые мы получаем с бэка
    tags: [], // Массив тегов, так как их может быть у релиза несколько
    socials: [], // Массив соц сетей, так как их может быть у релиза несколько
    releaseDate: null, // Дата выхода релиза
  }),

  computed: {
    ...mapGetters([
      'tracks', // Массив отправляемых треков мы храним в сторе
    ]),
  },

  async created() {
    // При создании подгружаю:
    this.possibleAuthors = await this.$store.dispatch('getAuthors') // Всех возможных авторов
    this.possibleTags = await this.$store.dispatch('getTags') // Все возможные теги
  },
  
  methods: {
    ...mapActions([
      'addRelease', // Через него отравляем релиз в телеграм (а потом в базу данных)
    ]),
    ...mapMutations([
      'clearTracks', // Нужен для удаления массива треков (после того как успешно загрузили альбом)
    ]),

    // Добавляем новый релиз в базу данных
    async addNewRelease() {

      let formData = new FormData();

      formData.append('name', this.name) // Название релиза
      formData.append('cover', this.cover) // Обложка релиза
      formData.append('releaseDate', this.releaseDate) // Дата выхода релиза
      

      // Добавляем авторов релиза
      for (let i = 0; i < this.authors.length; i++) {
        formData.append('authors', this.authors[i]) // Автор(ы) релиза
      }

      // Добавляем теги релиза
      for (let i = 0; i < this.tags.length; i++) {
        formData.append('tags', this.tags[i]) // Теги релиза
      }

      // Добавляем треки
      for (let i = 0; i < this.tracks.length; i++) {
        formData.append('tracks', this.tracks[i].file) // Отдельно отправляем сам файл трека

        // И отдельно информацию о треках
        formData.append('tracksNames', this.tracks[i].name)
        formData.append('tracksOrdinalNumbers', this.tracks[i].ordinalNumber)
        formData.append('tracksTags', this.tracks[i].tags)
        formData.append('tracksAuthors', this.tracks[i].authors )
        formData.append('tracksDuratons', Math.round(this.tracks[i].audio.duration)) // Сразу обрезаем плавующую точку
      }

      // Добавляем соц-сети
      for(let i = 0; i < this.socials.length; i++) {
        formData.append('socialsLinks', this.socials[i].link) // Ссылки
        formData.append('socialsNames', this.socials[i].socialDefined) // Названия соц сетей
      }

      this.loading = true // Включаем загрузку (вместо кнопки отправки)
      
      // И отравляем на бэк все данные
      const response = await this.addRelease(formData)

      this.loading = false // Получив ответ, мы выключаем загрузку


      // После добавления нового автора очищаем инпуты, если нету TODO: ошибки
      if (response.status === 'ok') {

        // Откючаем дополнительные комопненты (чтобы вызвать их перерисовку)
        this.reload = false

        // Задаем изначальные параметры, чтобы добавить следующий релиз
        this.name = ''
        this.cover = null
        this.authors = []
        this.tags = []
        this.clearTracks() // Очищает треки из стора

        // Cнова включаем
        setTimeout(() => { this.reload = true }, 0)
      }

    },

    // Получаем с доч.компонента обложку
    setCover(c) {
      this.cover = c
    },

    // Получаем с дочернего компонента выбранные соц сети релиза
    selectedSoc(s) {
      this.socials = s
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
    width: 200px;
  }


  .input-item {
    display: flex;
    width: 200px;
    flex-direction: column;
    margin: 20px 0px;
  }

  button {
    width: 200px;
    max-height: 35px;
    border: 1px solid black;
    background: transparent;
    font-weight: 400;
    font-size: 1rem;
    padding: 7px 20px;
    grid-area: button;
  }


</style>