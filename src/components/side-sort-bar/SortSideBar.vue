<template>
  <!-- Компонент боковой панели, где у нас будет соритровака релизов / миксов -->
  <div class="sort-side-bar-wrap">
    
    <!-- Выбираем тип сортировки -->
    <select v-model="sorting" >
      <option value="new">Сначала новые</option>
      <option value="old">Сначала старые</option>
      <option value="random">В случайном порядке</option>
      <option value="artist">По исполнителю</option>
    </select>

    <!-- Выбираем Теги -->
    <div class="checkbox-tags-wrap">
      <p>Сортировать по тегам</p>

      <!-- Итерируем с базы данных теги -->
      <div class="checkbox-tag-item" 
        v-for="(tag, index) of releaseTags"
        :key="index"
      > 
        <input type="checkbox" :id="tag.tag_name"  :value="tag.tag_name" v-model="changeTags">
        <label :for="tag.tag_name">{{tag.tag_name}}</label>
        
      </div>
      
    </div>
    

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Sort-side-bar',
  
  async mounted() {
    // Здесь мы вызываем подгрузку тегов с бэкенда
    await this.$store.dispatch('getReleaseTags')
  },

  computed: {
    ...mapGetters(['releaseTags']),

    // Двухнапрявленная привязка сортировки
    sorting: {
      set(sorting) {
        // А так же сразу ставим выбранное значение в роутер
        this.$router.push({ query: { ...this.$route.query, sorting }})
        // И коммитим в стор выбранный метод фильтрации
        this.$store.commit('setSorting', sorting)
      },
      get() {
        return this.$store.state.releases.releases.sorting
      }
    },

    // Двухнапрявленная привязка смены тегов
    changeTags: {
      set(tag) {
        // А так же сразу ставим выбранное значение в роутер
        this.$router.push({ query: { ...this.$route.query, tag }})
        // И коммитим в стор выбранные теги
        this.$store.commit('setSelectTags', tag)
      },

      get() {
        // Забирает из стора теги, которые у нас там лежат, а вносим мы их туда из родителя, когда загружаем страницу
        return this.$store.state.releases.releases.selectTags
      }
    }

  },


}
</script>

<style scoped>

  .sort-side-bar-wrap {
    height: 100%;
    width: 280px;
  }

  select {
    border: none;
    font-size: 20px;
    font-weight: 500;
    margin-left: -4px;

  }
  select:focus {
    outline: none;
  }


  /* Стили для тегов */

  .checkbox-tags-wrap {
    margin-top: 50px;
  }

  .checkbox-tags-wrap p {
    font-size: 20px;
    font-weight: 500;
    
    display: block; 
    margin-bottom: 20px;
  }

  .checkbox-tag-item {
    margin-top: 5px;
  }

  .checkbox-tag-item label {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 300;
  }
  
</style>