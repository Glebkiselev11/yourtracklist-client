<template>
  <!-- Компонент навигационной панели, которая отображается на всех страницах приложения -->
  <header class="navbar-wrap">
    <img class="yt-logo" src="@/../public/img/logo/yt-logo.svg" @click="goToHomePage" alt="">

    <!-- Сама навигация -->
    <ul class="navbar-link-list">
      <li class="navbar-link-item"> 
        <router-link to="/releases-archive">Релизы</router-link> 
      </li>
      <li class="navbar-link-item"> 
        <router-link to="/video-archive">Видео</router-link> 
      </li>
    </ul>

    <!-- Поиск по сайту -->
    <button 
      @click="$store.commit('openSearchWindow')" 
      class="search-button" 
      title="Поиск"
    >
      <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9.5" stroke="black"/>
        <line x1="17.3536" y1="16.6464" x2="25.8388" y2="25.1317" stroke="black"/>
      </svg>
    </button>

    <Search 
      v-if="searchWindow"
      @close="$store.commit('closeSearchWindow')"
    
    />

  </header>
</template>

<script>
import Search from '@/components/Search.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'navbar',

  components: {
    Search
  },
  
  computed: {
    ...mapGetters([
      'searchWindow', // Отвечает за отбражение модального окна поиска
    ])
  },
  
  methods: {
    // По нажатию на логотип переходит на главную страницу
    goToHomePage() {
      this.$route.path !== '/' ? this.$router.push('/')  : false
    },

  },
  
}
</script>

<style scoped>
  
  .navbar-wrap {
    max-width: 1200px;
    margin: 0 auto 20px auto;
    padding: 20px 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    background-color: var(--primary-background-color);
  }

  .yt-logo {
    cursor: pointer;
  }
    
  .navbar-link-list {
    display: flex;
    margin-left: 175px;
    width: 230px;
    justify-content: space-between;
  }
  .navbar-link-item a {
    font-size: 1.55rem;
  }

  .navbar-link-item a:hover {
    border-bottom: 1px solid var(--primary-color);
  }

  .search-button {
    margin-left: auto;
  }

  .search-button:focus {
    outline: none;
  }
    

</style>