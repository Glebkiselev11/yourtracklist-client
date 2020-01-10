<template>
  <!-- Страница через которую мы будем добавлять новый релиз -->
  <!-- ! Тестовый компонент, на котором мы тестируем добавление через телеграм -->
  <form class="form-wrap" @submit.prevent="addNewRelease">
    
      <!-- Стандартные поля -->
      <div class="input-wrap">

        <!-- Для добавления обложки -->
        <CoverPrev
          @cover="setCover"
        
        />

        <div class="input-item">
          <label for="name">Название релиза</label>
          <input type="text" id="name" v-model="name" required>
        </div>

      </div>

    
      
      
      <!-- Для добавления треков -->
      <AddTracksPrev class="tracks-wrap" 
        @track="setTrack"
      />


    <button type="submit">Добавить</button>
  </form>
</template>

<script>
import CoverPrev from '@/components/admin-panel/CoverPrev.vue'
import AddTracksPrev from '@/components/admin-panel/AddTracksPrev.vue'

export default {
  name: 'Add-release',
  components: {
    CoverPrev, // Компонент для предпросмотра обложки перед тем  как залить альбом
    AddTracksPrev, // Компонент для добавления аудио и отображения загруженных аудио перед загрузкой
  },
  data: () => ({
    name: '', // Название релиза
    cover: null, // Сам файл обложки
    tracks: [], // Массив отправляемых треков
  }),
  methods: {

    // Добавляем новый релиз в базу данных
    async addNewRelease() {

      let formData = new FormData();

      // Добавляем обложку релиза
      formData.append('cover', this.cover)
      formData.append('name', this.name);

      // Добавляем треки
      for (let i = 0; i < this.tracks.length; i++) {
        formData.append('tracks', this.tracks[i])
      }

      console.log(this.tracks)
      console.log(this.cover)

      await this.$store.dispatch('addRelease', formData)

      // После добавления нового автора очищаем инпуты, если нету ошибки
      if (this.statusForRelease.status === 'ok') {
        this.name = ''
        this.cover = null
        this.tracks = []

      }

    },

    // Получаем с дочернего компонента обложку
    setCover(c) {
      console.log(c)
      this.cover = c
    },

    // Получаем с дочернего компонента трек TODO: пока один
    setTrack(t) {
      console.log(t)
      this.tracks.push(t)
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