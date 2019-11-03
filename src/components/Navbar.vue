<template>
  <!-- Компонент навигационной панели, которая отображается на всех страницах приложения -->
  <div class="navbar-wrap">
    <img src="@/../public/img/logo/yt-logo.svg" alt="">

    <!-- Сама навигация -->
    <ul class="navbar-link-list">
      <li class="navbar-link-item"> 
        <router-link to="#">Архив релизов</router-link> 
      </li>
      <li class="navbar-link-item"> 
        <router-link to="#">Видео</router-link> 
      </li>
      <li class="navbar-link-item"> 
        <router-link to="#">Миксы</router-link> 
      </li>
      <li class="navbar-link-item"> 
        <router-link to="#">Лейбл</router-link> 
      </li>
    </ul>

    <!-- Тут будет поиск -->
    <div class="search-wrap">
      Поиск
    </div>

  </div>
</template>

<script>
export default {
  name: 'navbar'
  
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
  }
    
  .navbar-link-list {
    display: flex;
    margin-left: 152px;
    width: 600px;
    justify-content: space-between;
  }
  .navbar-link-item a {
    opacity: 0.5;
    font-size: 25px;
  }

  .navbar-link-item a:hover {
    opacity: 1;
  }

  .search-wrap {
    margin-left: auto;
  }
    

</style>