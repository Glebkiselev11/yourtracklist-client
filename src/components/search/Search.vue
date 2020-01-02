<template>
  <!-- Модальное окно с поиском по сайту -->
  <div class="wrap">
    <div class="search-wrap" v-on-clickaway="away">
      <div class="container search-input-wrap">
        <!-- Кнопка которая закрывает модальное окно поиска -->
        <button class="search-close-btn" @click="$emit('close')">
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1.35355" y1="0.859703" x2="22.5668" y2="22.0729" stroke="black"/>
            <line x1="0.646447" y1="21.8597" x2="21.8596" y2="0.6465" stroke="black"/>
          </svg>
        </button>

        <input 
          v-on:keyup="keyHandler"
          v-model="searchQuery"  
          ref="search" 
          class="search-input" 
          type="text"
          placeholder="Введите имя исполнителя или название релиза / видео"
        >

        <!-- Сообщение об ошибке поиска -->
        <span 
          v-if="searchResult === 2"
          class="search-errors"
        >Ничего не найдено</span>

      
      </div>

      <!-- Нижнее окно куда выводим найденые релизы, авторов, видео -->
      <SearchResult 
        v-if="searchResult === 1"
        @close="$emit('close')"
        :searchQuery="this.searchQuery"
      />
      

    </div>
    
  </div>
</template>


<script>
import SearchResult from '@/components/search/Search-result.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'search',
  data: () => ({
    searchQuery: '', // Поисковой запрос по которому мы в базе ищем нужные данные
  }),
  components: {
    SearchResult
  },
  computed: {
    ...mapGetters(['searchResult'])
  },
  created() {
    // Как тольк открываем поиск - сразу ставим фокус на поле ввода
    setTimeout(() => this.$refs.search.focus(), 200);
    
  },
  methods: {
    ...mapActions(['submitSearchQuery']),
    ...mapMutations(['clearSearchResult']),

    // По клику на черный фон - закрывает модальное окно поиска
    away() {
      this.$emit('close');
    },

    // Отслеживаем нажатия на кнопки
    keyHandler(event) {
      switch(true) {
        case event.key === 'Escape' && this.searchQuery.length !== 0 :
          this.searchQuery = '';
          break;
        case event.key === 'Escape' && this.searchQuery.length === 0 :
          this.$emit('close');
          break;
        case event.key === 'Enter' && this.searchQuery.length !== 0 :
          this.searchSubmit()
          break;
      }   
    },

    // Отправляет наш запрос на бэкенд
    async searchSubmit() {
      await this.submitSearchQuery(this.searchQuery)
    }
  },

  beforeDestroy() {
    this.clearSearchResult()
  },
  
}
</script>


<style scoped>
  /* Все окно */
  .wrap {
    width: 100%;
    height: 100vh;
    position: fixed;
    overflow-y: scroll;
    visibility: visible;
    top: 0; left: 0;
    background: rgba(0, 0, 0, 0.91);
    z-index: 1;
  }

  /* Фон поиска (белый на всю ширину) */
  .search-wrap {
    margin: auto;
    width: 100%;
    background: var(--primary-background-color);
  }

  /* Ограничение для поля поиска и кнопки закрытия */
  .search-input-wrap {
    display: flex;
    flex-direction: column;
    padding-top: 80px;
    height: 235px;
  }

  .search-close-btn {
    margin-left: auto;
    margin-bottom: 20px;
  }

  .search-close-btn:focus {
    outline: none;
  }

  .search-input {
    border: none;
    outline: none;
    border-bottom: 1px solid var(--primary-color);
    font-size: 1.4rem;
    font-weight: 300;
    padding: 0 10px;
  }

  .search-errors {
    margin: 25px 10px 10px;
  }
</style>