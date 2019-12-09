<template>
  <form class="form-wrap" @submit.prevent="addNewVideo">
    <h3>Добавить видео</h3>

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




    </div>
    
    <!-- Компоненты куда мы подгружаем всех возможных авторов с базы данных -->
    <AuthorSelectList
      @selected="selectedAuthors"
    />

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
    name: '',
    duration: '',
  }),
  components: {
    AuthorSelectList
  },
  computed: {
    ...mapGetters(['statusForVideo', 'releaseDateOfVideo']),

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
    // ! Остановились Здесь
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
      await this.$store.dispatch('addNewVideo', {
        name: this.name,
        duration: this.duration,
        authors: this.authors,
        url: this.url,
      })

      // После добавления нового автора очищаем инпуты, если нету ошибки
      if (this.statusForVideo.status === 'ok') {
        this.name = ''
        this.duration = ''
        this.authors = []
        this.url = ''

        // И спустя 10 секунд он удаляет из стора статус
        setTimeout(() => {
          this.$store.commit('setStatusForVideo', undefined)
        }, 10000)
      }
    }
  },
}
</script>

<style scoped>

  .form-wrap {
    width: 1000px;
    margin: 50px 0px;
    height: 400px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
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