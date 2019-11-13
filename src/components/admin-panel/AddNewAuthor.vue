<template>
  <!-- Компонент для добавления нового автора в базу данных -->

  <form class="form-wrap" @submit.prevent="addNewAuthor">
    <h3>Добавить нового артиста</h3>
    
    <div class="input-wrap">

      <!-- Стандартные поля -->
      <div class="">
        <div class="input-item">
          <label for="author-name">Название автора</label>
          <input type="text" id="author-name" v-model="name">
        </div>

        <div class="input-item">
          <label for="author-permalink">Уникальный ник (permalink)</label>
          <input type="text" id="author-permalink" v-model="permalink">
        </div>

        <div class="input-item">
          <label for="author-permalink">Ссылка на аватарку артиста (необязательно)</label>
          <input type="text" id="author-permalink" v-model="avatar">
        </div>
      </div>
      

      <!-- Социальные сети -->
      <div class="social-wrap">
        <div class="input-item">
          <label for="author-permalink">VK</label>
          <input type="text" id="author-permalink" v-model="vk">
        </div>
        <div class="input-item">
          <label for="author-permalink">bandcamp</label>
          <input type="text" id="author-permalink" v-model="bandcamp">
        </div>
        <div class="input-item">
          <label for="author-permalink">spotify</label>
          <input type="text" id="author-permalink" v-model="spotify">
        </div>
        <div class="input-item">
          <label for="author-permalink">youtube</label>
          <input type="text" id="author-permalink" v-model="youtube">
        </div>
        <div class="input-item">
          <label for="author-permalink">twitter</label>
          <input type="text" id="author-permalink" v-model="twitter">
        </div>
        <div class="input-item">
          <label for="author-permalink">itunes</label>
          <input type="text" id="author-permalink" v-model="itunes">
        </div>
        <div class="input-item">
          <label for="author-permalink">soundcloud</label>
          <input type="text" id="author-permalink" v-model="soundcloud">
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
  name: 'Add-new-author',
  data: () => ({
    name: '',
    permalink: '', // Уникальный ник, по нему мы будем получать с базы данных этого артиста
    avatar: '', // Ссылка на картинку автора
    tags: [], // Теги автора
    vk: '',
    bandcamp: '',
    spotify: '',
    youtube: '',
    instagram: '',
    twitter: '',
    soundcloud: '',
    itunes: ''
  }),
  methods: {
    async addNewAuthor() {
      console.log(this.tags)

      // Отправляем данные о авторе на бэкенд
      try {
        await this.$store.dispatch('admin_addAuthor', {
          name: this.name,
          permalink: this.permalink,
          avatar: this.avatar,
          tags: this.tags,
          links: {
            vk: this.vk,
            bandcamp: this.bandcamp,
            spotify: this.spotify,
            youtube: this.youtube,
            instagram: this.instagram,
            twitter: this.twitter,
            soundcloud: this.soundcloud,
            itunes: this.itunes
          }
        })

      } catch(errow) {
        console.log(errow)
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('getReleaseTags')
  },
  computed: {
    ...mapGetters(['releaseTags'])
  },
}
</script>


<style scoped>
  .form-wrap {
    width: 600px;
    max-height: 670px;
    margin-top: 50px;
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