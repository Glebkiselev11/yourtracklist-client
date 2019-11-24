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
        <input type="checkbox" :id="tag.tag_name"  :value="tag.tag_name" v-model="checkedTags">
        <label :for="tag.tag_name">{{tag.tag_name}}</label>
        
      </div>
      
    </div>
    

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Sort-side-bar',
  data: () => ({
    sorting: undefined, // Тип сортировки берется из роутера, если там нет ничего, то ставится 'new'
    checkedTags: [], // Массив тегов, которые выбраны
  }),
  
  async mounted() {
    // Здесь мы вызываем подгрузку тегов с бэкенда
    await this.$store.dispatch('getReleaseTags')
  },
  created() {
    // При открытие в первый раз сортировки, мы смотрим что у нас есть в роуторе
    // Нужно чтобы селектор, где мы выбираем тип сортировки - синхронизировался с адресной строкой
    switch(this.$route.query.sorting) {
      case 'old' : 
        this.sorting = 'old'
        break
      case 'random' :
        this.sorting = 'random'
        break
      case 'artist' :
        this.sorting = 'artist'
        break
      // Если там что то другое, иили вообще нет типа сортировки, то по умолчанию ставим как new
      default:
        this.sorting = 'new'
        break
    }

    // Тут синхронизируем теги с адресной строкой, если там 1 тег, то он как строка
    if(typeof this.$route.query.tag === 'string') {
      this.checkedTags.push(this.$route.query.tag)

      // А если их несколько то он массив (object)
    } else if (typeof this.$route.query.tag === 'object') {
      this.checkedTags = this.$route.query.tag
    }
    
  },

  computed: {
    ...mapGetters(['releaseTags']),
  },
  watch: {
    // ! Тут важный момент, они отвечают за то чтобы загрузить с беэкенда релизы.
    // ! То есть только когда загрузиться этот компонент и выставяться нужные фильтры, идет команда в 
    // ! Родительский компонент и он уже загружает релизы с бэкенда по выбранным фильтрам, это важно, так как это может сбить с толку

    // Отправляет в родителя выбранную сортировку
    sorting(sorting) {
      this.$emit('selected', sorting)
    },

    // Следит за выбранными тегами и отравляет их в родителя, оттуда мы делаем уже запрос на получение релизов по тегам
    checkedTags(tags) {
      this.$emit('checkedTags', tags)
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