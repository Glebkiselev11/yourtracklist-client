<template>
  <!-- Карточка релиза -->
  <div class="wrap">
    <!-- Обертка для кнопки, которая будет возвращать нас обратно к релизам -->
    <ArrowButton 
      class="release-back-button"
      title="Вернуться в архив"
      styles="font-size: 14px; font-weight: 300; color: black;"
      arrow-color='black'
    /> 

    <!-- Обертка под сам релиз (обложка и информация) -->
    <div class="release-wrap">
      <!-- Обложка -->
      <img class="release-cover" src="https://sun9-55.userapi.com/c858228/v858228021/49684/fXtEPbVdo2E.jpg" alt="cover">

      <!-- Информация о релизе, которая располагается справа от обложки -->
      <div class="release-info-wrap">
        
        <!-- Обертка под название и дату релиза -->
        <div class="release-info--name-date-wrap">
          <h1>evryn — Vanished</h1>
          <p>released August 16, 2019</p>
        </div>

        <!-- Обертка под ссылки, где можно прослушать этот релиз -->
        <div class="release-listen-wrap">
          <h2>Послушать релиз</h2>
          <ul>
            <li><a href="#">Вконтакте</a></li>
            <li><a href="#">Bandcamp</a></li>
            <li><a href="#">SoundCloud</a></li>
          </ul>
          

        </div>

        <!-- Теги релиза -->
        <div class="release-tags">
          <h2>Теги</h2>
          <ul>
            <li><a href="#">Ambient</a></li>
            <li><a href="#">Experimental</a></li>
            <li><a href="#">Dark</a></li>
          </ul>
        </div>


        <ArrowButton 
          class="release-in-button"
          title="Все релизы исполнителя"
          styles="font-size: 20px; font-weight: 700; color: black;"
          arrow-color='black'
          forward="true"
        /> 

      </div>

    </div>

  </div>
</template>

<script>
import ArrowButton from '@/components/app/ArrowButton.vue'
export default {
  name: 'Release-cart',
  components: {
    ArrowButton
  }
}
</script>

<style scoped>

  .wrap {
    width: 100%;
    height: 658px;
    margin-top: 110px;
    margin-bottom: 200px;
    display: flex;
    position: relative;
  }

  .release-back-button {
    position: absolute;
    left: 70px;
  }


  .release-wrap {
    margin-top: 82px;
    margin-left: 282px;
    width: 100%;
    display: flex;
    
  }

  .release-cover {
    width: 305px;
    height: 305px;
  }

  .release-info-wrap {
    position: relative;
    height: 100%;
    width: 100%;
    margin-left: 73px;
  }

  .release-info-wrap a {
    font-size: 18px;
    font-weight: 300;
  }
  
  .release-info-wrap h2 {
    font-size: 20px;
    font-weight: 600;
  }


  .release-info--name-date-wrap {
    padding-bottom: 40px;
    border-bottom: 1px solid grey;
  }
  .release-info--name-date-wrap h1 {
    font-size: 35px;
    font-weight: 800;
    margin-bottom: 20px;
  }
  .release-info--name-date-wrap p {
    font-size: 18px;
    font-weight: 500;
  }


  .release-listen-wrap, .release-tags  {
    margin-top: 40px;
  }

  .release-tags {
    border-bottom: 1px solid grey;
    padding-bottom: 40px;
  }


  .release-in-button {
    position: absolute;
    left: 80px;
    bottom: 30px;
  }
</style>