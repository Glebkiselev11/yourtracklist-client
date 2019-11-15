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
          <label for="author-permalink">Ссылка на аватарку артиста (необязательно)</label>
          <input type="text" id="author-permalink" v-model="avatar">
        </div>
      </div>
      

      <!-- Социальные сети -->
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
    
    <!-- Отображаем здесь статус о том добавился ли пользователь или нет -->
    <p v-if="statusForAuthor" :class="statusForAuthor.status === 'ok' ? 'status-ok' : 'status-error' ">{{statusForAuthor.message}}</p>

    <button type="submit">Добавить</button>
  </form>

</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Add-new-author',
  data: () => ({
    name: '',
    avatar: '', // Ссылка на картинку автора
    tags: [], // Теги автора
    socialsNameListObj: {},
  }),
  methods: {
    async addNewAuthor() {

      // Отправляем данные о авторе на бэкенд
      try {
        await this.$store.dispatch('admin_addAuthor', {
          name: this.name,
          avatar: this.avatar,
          tags: this.tags,
          links: this.socialsNameListObj
        })

        // После добавления нового автора очищаем инпуты, если не было ошибки
        if (this.statusForAuthor.status === 'ok') {
          this.name = ''
          this.avatar = ''
          this.tags = []
          this.socialsNameListObj = {}
        }
        
      } catch(errow) {
        console.log(errow)
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('getReleaseTags')
  },
  computed: {
    ...mapGetters(['releaseTags', 'socialsNameList', 'statusForAuthor'])
  },
}
</script>


<style scoped>
  .form-wrap {
    margin-bottom: 50px;
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