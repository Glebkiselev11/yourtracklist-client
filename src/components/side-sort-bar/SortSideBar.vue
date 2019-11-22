<template>
  <!-- Компонент боковой панели, где у нас будет соритровака релизов / миксов -->
  <div class="sort-side-bar-wrap">
    
    <!-- Выбираем тип сортировки -->
    <select v-model="sorting">
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
        <input type="checkbox" :id="tag"  :value="tag" v-model="checkedTags">
        <label :for="tag">{{tag}}</label>
        
      </div>
      
    </div>
    

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Sort-side-bar',
  data: () => ({
    sorting: 'new', // Тип сортировки, по умоланию стоит на новые релизы / миксы
    checkedTags: [], // Массив тегов, которые выбраны
  }),

  computed: {
    ...mapGetters(['releaseTags'])
  },
  watch: {
    // Пушит в адресную строку фильтер
    sorting(sorting) {
      this.$emit('selected', sorting)
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