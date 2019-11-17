<template>
  <!-- Это блок который отображается на главной странице в самом верху, у нас тут будет заголовок
  и сбоку рандомно три релиза / микса генерироваться -->
  <div class="hero-wrap">
    <h1 class="hero-title">
      Yourtracklist — это дискография одноименного паблика vk.com. <br>
      Здесь собрана вся информация о релизах и ссылки <br>
      на альтернативные источники
      
    </h1>

    <img class="hero-logo" src="@/assets/yt3_white.png" alt="yourtracklist-logo">

  </div>
</template>

<script>
export default {
  name: 'Hero',

  components: {
  },
  computed: {},
  
}
</script>

<style scoped> 

  .hero-wrap {
    margin-top: 50px;
    height: 250px;
    width: 100%;
    display: flex;
    background: #1E1E1E;
    position: relative;
  }

  .hero-title {
    color: white;
    padding: 51px 0 0 130px;
    font-size: 25px;
    font-weight: 400;
  }

  .hero-logo {
    position: absolute;
    right: 130px;
    bottom: -70px;
  }


</style>