<template>
  <!-- Добавляем через этот компонент новый релиз -->
  <form class="form-wrap" @submit.prevent="addNewRelease">
    <h3>Добавить релиз</h3>
    
    <div class="input-wrap">

      <!-- Стандартные поля -->
      <div class="">
        <div class="input-item">
          <label for="name">Название релиза</label>
          <input type="text" id="name" v-model="name" required>
        </div>

        <div class="input-item">
          <label for="author-permalink">permalink</label>
          <input type="text" id="author-permalink" v-model="permalink" required>
        </div>

        <div class="input-item">
          <label for="cover">Ссылка на обложку</label>
          <input type="text" id="cover" v-model="cover" required>
        </div>

        <div class="input-item">
          <label for="duration">Длительность релиза</label>
          <input type="text" id="duration" v-model="duration">
        </div>

        <div class="input-item">
          <label for="number_of_tracks">Количество треков</label>
          <input type="number" id="number_of_tracks" v-model="number_of_tracks" required>
        </div>

        <div class="input-item">
          <label for="date">Дата релиза</label>
          <input type="date" id="date" v-model="dateRel" required>
        </div>


        <!-- Список возможных авторов, который мы получаем с бэкенда -->
        <div class="input-item">
          <label for="authors">Автор(ы)</label>
          <select v-model="authors" id="authors" multiple>
            <option 
              v-for="(author, index) in authorsArray" 
              :key="index" 
              :value="author.permalink"
            >{{author.name}}</option>
          </select>
        </div>

      </div>


      

      <!-- Социальные сети (Итерируем с бэкенда)-->
      <div class="social-wrap">

        <div class="input-item" 
          v-for="(soc, index) in socialsNameList" 
          :key="index"
        >
          <label :for="index">{{soc.name}}</label>
          <input type="text" :id="index" v-model="socialsNameListObj[soc.name]">
        </div>

      </div>
      
      <!-- Теги которые мы получаем с базы данных -->
      <div class="tags-wrap">
        <h4>Теги:</h4>
        <label v-for="(tag, index) in releaseTags" :key="index" :for="tag.tag_name">
          <input type="checkbox" v-model="tags" :id="tag.tag_name" :value="tag.tag_name">{{tag.tag_name}}
        </label>
        
      </div>
    </div>
    
    

    <button type="submit">Добавить</button>
  </form>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Add-new-release',
  data: () => ({
    dateRel: '',
    name: '',
    permalink: '', // Уникальное название альбома, по нему мы будем получать с базы данных этот релиз
    cover: '', // Ссылка на обложку
    socialsNameListObj: {}, // Ссылки на релизы
    tags: [], // Теги релиза
    duration: '', // Длительность релиза
    date: '', // Дата релиза 
    number_of_tracks: 0, // Количество треков
    authors: [],  // Массив авторов, так как их может быть несколько, указываем там уникальные ссылки авторов (permalink)
  }),
  async mounted() {
    await this.$store.dispatch('getReleaseTags'),
    await this.$store.dispatch('getAuthors'),
    await this.$store.dispatch('admin_getSocialsNameList')
  },
  computed: {
    ...mapGetters(['releaseTags', 'authorsArray', 'socialsNameList'])
  },
  methods: {
    // Добавляем новый релиз в базу данных
    async addNewRelease() {
      
      try {
        await this.$store.dispatch('admin_addRelease', {
          name: this.name,
          permalink: this.permalink,
          cover: this.cover,
          tags: this.tags,
          duration: this.duration,
          number_of_tracks: this.number_of_tracks,
          authors: this.authors,
          date: this.dateRel,
          links: this.socialsNameListObj
        })

        // После добавления нового автора очищаем инпуты
        this.name = ''
        this.dateRel = ''
        this.permalink = ''
        this.cover = ''
        this.tags = []
        this.duration = ''
        this.number_of_tracks = 0
        this.authors = []
        this.socialsNameListObj = {}


      } catch(errow) {
        console.log(errow)
      }
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