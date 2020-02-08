<template>
  <!-- Подвал сайта, который присутствует на всех страницах -->
  <footer class="footer">
    <div class="wrap">

      <div class="nav-wrap">

        <div class="social-wrap">
          <ul>
            Соц сети
            <li>Telegram</li>
            <li>Vkontakte</li>
            <li>Bandcamp</li>
            <li>Soundcloud</li>
          </ul>
        </div>

        <div class="menu-wrap">
          <ul>
            Меню
            <li>Архив релизов</li>
            <li>Видео</li>
            <li>Миксы</li>
          </ul>
        </div>

        <!-- Отзыв -->
        <CallBack />
      </div>
    </div>
  

    <!-- Самая нажняя часть (2 футер) -->
    <div class="footer-description-wrap">
      
      <div class="container footer-descrip">
        <p>©2020 yourtracklist</p>
        <p>designer: Daria Ver</p>
        <p>developer: Gleb kiselev</p>

      </div>

    </div>
    
  </footer>
</template>

<script>
import CallBack from '@/components/CallBack.vue'
export default {
  name: 'Footer',
  components: {
    CallBack
  }

}
</script>

<style scoped>
  .footer {
    /* background-color: var(--primary-background-color); */
  }

  .wrap {
    max-width: 1200px;
    margin: auto;
    height: 460px;
    border-top: 1px solid var(--primary-color);
    display: flex;
    align-content: space-between;
    justify-content: space-between;
    flex-wrap: wrap;
    /* background-color: var(--primary-background-color); */
  }


  .nav-wrap {
    display: flex;
    
    justify-content: space-between;
    margin-left: auto;
    margin-top: 70px;
  }

  .social-wrap {
    margin-right: 108px;
  }

  .menu-wrap {
    margin-right: 195px;
  }

  ul {
    font-size: 18px;
    font-weight: 500;
  }

  li {
    margin-top: 25px;
    font-size: 16px;
    font-weight: 300;
    line-height: 7px;
  }


  /* Нижняя черная часть футера */
  .footer-description-wrap {
    width: 100%;
    height: 100px;
    background: var(--primary-color);
  }

  .footer-descrip {
    height: 100%;
    color: white;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
  }

  .footer-descrip p {
    margin-right: 160px;
  }
</style>