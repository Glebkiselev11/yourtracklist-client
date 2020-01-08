<template>
  <!-- Страница через которую мы будем добавлять новый релиз -->
  <!-- ! Тестовый компонент, на котором мы тестируем добавление через телеграм -->
  <form class="form-wrap" @submit.prevent="addNewRelease">
    
      <!-- Стандартные поля -->
      <div class="input-wrap">

        <div class="input-item">
          <label for="name">Название релиза</label>
          <input type="text" id="name" v-model="name" required>
        </div>

      </div>

    

      <CoverPrev class="cover-wrap"
        @cover="setCover"
      
      />
      


    <button type="submit">Добавить</button>
  </form>
</template>

<script>
import CoverPrev from '@/components/admin-panel/CoverPrev.vue'

export default {
  name: 'Add-release',
  components: {
    CoverPrev, // Компонент для предпросмотра обложки перед тем  как залить альбом
  },
  data: () => ({
    name: '', // Название релиза
    cover: null, // Сам файл обложки
  }),
  methods: {

    // Добавляем новый релиз в базу данных
    async addNewRelease() {

      let formData = new FormData();

      // Добавляем обложку релиза
      formData.append('cover', this.cover)
      formData.append('name', this.name);

      await this.$store.dispatch('addRelease', formData)

      // После добавления нового автора очищаем инпуты, если нету ошибки
      if (this.statusForRelease.status === 'ok') {
        this.name = ''
        this.cover = ''
      }

    },

    // Получаем с дочернего компонента обложку
    setCover(c) {
      this.cover = c
    }
  },
}
</script>

<style scoped>
  .form-wrap {
    display: grid;
    grid-template-areas: 
      "input cover"
      "button cover";
    grid-template-rows: 3fr 1fr;
    grid-template-columns: 1fr 2ыfr;
    grid-gap: .5em;
  }

  .input-wrap {
    grid-area: input;
  }

  .cover-wrap {
    grid-area: cover;
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