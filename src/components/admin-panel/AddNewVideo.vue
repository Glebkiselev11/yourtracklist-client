<template>
  <form class="form-wrap" @submit.prevent="addNewVideo">
    <h3>Добавить видео</h3>

    <div class="">

      <div class="input-item">
        <label for="url">Ссылка на видео</label>
        <input type="text" id="url" v-model="url" required>
      </div>
      
      <div class="input-item">
        <label for="name">Название видео</label>
        <input type="text" id="name" v-model="name" required>
      </div>

      <div class="input-item">
        <label for="cover">Ссылка на обложку</label>
        <input type="text" id="cover" v-model="cover" required>
      </div>

      <div class="input-item">
        <label for="duration">Длительность видео</label>
        <input type="text" id="duration" v-model="duration">
      </div>

      <div class="input-item">
        <span>Название платформы</span>
        
        <label for="youtube">
          <input type="radio" id="youtube" v-model="platform" value="youtube">YouTube
        </label>
        
        <label for="vk">
          <input type="radio" id="vk" v-model="platform" value="VK">VK
        </label>

        <label for="vimeo">
          <input type="radio" id="vimeo" v-model="platform" value="vimeo">Vimeo
        </label>

      </div>

    </div>
    
    <!-- Компоненты куда мы подгружаем всех возможных авторов с базы данных -->
    <AuthorSelectList
      @selected="selectedAuthors"
    />

    <button type="submit">Добавить</button>
  </form>
</template>

<script>
import AuthorSelectList from '@/components/app/AuthorsSelectList.vue'
export default {
  name: 'Add-new-vide',
  data: () => ({
    authors: [],
    cover: '',
    name: '',
    url: '',
    duration: '',
    platform: 'youtube'
  }),
  components: {
    AuthorSelectList
  },
  methods: {
    // Обрабатываем выбранных авторов из дочернего комопнента (AuthorSelectList)
    selectedAuthors(authors) {
      console.log(authors)
      this.authors = authors
    },

    // Добавляем новое видео в базу
    async addNewVideo() {

    }
  },
}
</script>

<style scoped>

  .form-wrap {
    width: 600px;
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