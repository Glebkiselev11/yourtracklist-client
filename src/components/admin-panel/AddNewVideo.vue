<template>
  <form class="form-wrap" @submit.prevent="addNewVideo">
    <h3>Добавить видео</h3>

    <div class="input-wrap">
      
      <div class="">
        <div class="input-item">
          <label for="url">Ссылка на youtube видео</label>
          <input type="text" id="url" v-model="urlVideo" required>
        </div>

        <div class="input-item">
          <label for="date">Дата выхода видео</label>
          <input type="date" id="date" v-model="releaseDateOfVideo" required readonly>
        </div>
        
        <div class="input-item">
          <label for="name">Название видео</label>
          <input type="text" id="name" v-model="videoName" required>
        </div>

        <!-- Компоненты куда мы подгружаем всех возможных авторов с базы данных -->
        <AuthorSelectList
          @selected="selectedAuthors"
        />


      </div>

      <!-- Теги которые мы получаем с базы данных -->
      <div class="tags-wrap">
        <h4>Теги:</h4>
        <label v-for="(tag, index) in releaseTags" :key="index" :for="tag.name + 'rel'">
          <input type="checkbox" v-model="tags" :id="tag.name + 'rel'" :value="tag.name">{{tag.name}}
        </label>
        
      </div>

    </div>
    
    
      

    <!-- Отображаем здесь статус о том добавился ли видос или нет -->
    <p v-if="statusForVideo" :class="statusForVideo.status === 'ok' ? 'status-ok' : 'status-error' ">{{statusForVideo.message}}</p>

    <button type="submit">Добавить</button>


    
  </form>
</template>

<script>
import AuthorSelectList from '@/components/app/AuthorsSelectList.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Add-new-vide',
  data: () => ({
    authors: [],
    tags: []
  }),
  components: {
    AuthorSelectList
  },
  computed: {
    ...mapGetters(['statusForVideo', 'releaseDateOfVideo', 'releaseTags']),

    // Динамически обрабатываем url и на его основе подгружаем данные с ютуба
    urlVideo: {
      async set(url) {
        this.$store.commit('setUrlVideo', url)

        // Если есть какое то значение, то мы запрашваем с ютуба по этому урлу информацию о релизе
        if (url) {
          await this.$store.dispatch('getInfoVideoForUpload')
        }
      },
      get() {
        return this.$store.getters.urlVideo
      }
    },

    // Двухстороння привязка нужна, чтобы мы получили видео с ютуба и можно было отредактировать название
    videoName: {
      set(name) {
        this.$store.commit('setVideoName', name)
      },

      get() {
        return this.$store.getters.videoName
      }
    }
  },
  methods: {
    // Обрабатываем выбранных авторов из дочернего комопнента (AuthorSelectList)
    selectedAuthors(authors) {
      this.authors = authors
    },

    // Добавляем новое видео в базу
    async addNewVideo() {

      // Если никакой автор не выбран, то выкидываем ошибку
      if (!this.authors.length) {
        this.$store.commit('setStatusForVideo', {message : 'Обязательно укажите автора видео', status : 'error'})
        return
      }

      await this.$store.dispatch('addNewVideo', {
        name: this.name,
        authors: this.authors,
        tags: this.tags
      })

      // После добавления нового автора очищаем инпуты, если нету ошибки
      if (this.statusForVideo.status === 'ok') {

        this.authors = []
        this.url = ''
        this.tags = []

        this.$store.commit('clearDuration')
        this.$store.commit('clearVideoName')
        this.$store.commit('clearReleaseDateOfVideo')
        this.$store.commit('clearUrlVideo')

        // И спустя 5 секунд он удаляет из стора статус
        setTimeout(() => {
          this.$store.commit('setStatusForVideo', undefined)
        }, 5000)
      }
    }
  },
}
</script>

<style scoped>

  .form-wrap {
    width: 350px;
    max-height: 670px;
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  .input-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 100%;
  }

  .input-item {
    display: flex;
    width: 200px;
    flex-direction: column;
    margin: 5px 0px;
  }

  .tags-wrap {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  button {
    width: 200px;
    max-height: 35px;
    border: 1px solid black;
    background: transparent;
    font-weight: 400;
    font-size: 16px;
    padding: 7px 20px;
  }

</style>