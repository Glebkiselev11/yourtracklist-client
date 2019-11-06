<template>
  <!-- Подвал сайта, который присутствует на всех страницах -->
  <div class="wrap">
    <img src="@/../public/img/logo/yt-logo.svg" alt="">

    <div class="nav-wrap">

      <div class="menu-wrap">
        <ul>
          Меню
          <li>Архив релизов</li>
          <li>Видео</li>
          <li>Миксы</li>
          <li>Лейбл</li>
        </ul>
      </div>


      <div class="social-wrap">
        <ul>
          Соц сети
          <li>Telegram</li>
          <li>Vkontakte</li>
          <li>Bandcamp</li>
          <li>Soundcloud</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 202px;
    border-top: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 200px;
    margin-bottom: 50px;
  }

  .nav-wrap {
    width: 416px;
    display: flex;
    justify-content: space-between;
  }

  ul {
    font-size: 18px;
    font-weight: 500;
    line-height: 30px;
  }

  li {
    font-size: 16px;
    font-weight: 300;
    
  }
</style>