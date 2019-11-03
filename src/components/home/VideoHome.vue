<template>
  <!-- Секция на главной странице, где выводим последние видео -->
  <div class="wrap">
    <!-- Верхняя шапка с заголовком и кнопкой -->
    <TopBar 
      title="Видео"
    />

    <!-- Здесь выводим видео -->
    <div class="video-wrap">

      <div class="video-item">
        <iframe width="747" height="525" 
          src="https://www.youtube.com/embed/QjMME7LGoJw?controls=0" 
          frameborder="0" 
          allowfullscreen>
        </iframe>
        <p class="video-name">cat soup - wiretapped [video]</p>
      </div>
      
      <div class="video-item">
        <iframe width="392" height="210" 
          src="https://www.youtube.com/embed/QjMME7LGoJw?controls=0" 
          frameborder="0" 
          allowfullscreen>
        </iframe>
        <p class="video-name">cat soup - wiretapped [video]</p>
      </div>
      
      <div class="video-item">
        <iframe width="392" height="210" 
          src="https://www.youtube.com/embed/QjMME7LGoJw?controls=0" 
          frameborder="0"
          allowfullscreen>
        </iframe>
        <p class="video-name">cat soup - wiretapped [video]</p>
      </div>
      
    </div>

  </div>
</template>

<script>
import TopBar from '@/components/home/TopBar.vue'
export default {
  name: 'ViedeoHome',
  components: {
    TopBar
  }

}
</script>

<style scoped>
  .wrap {
    margin-top: 150px;
    width: 100%;
  }

  .video-wrap {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: space-between;
    justify-content: space-between;
    height: 578px;
    width: 100%;
  }

  .video-name {
    font-size: 25px;
    font-weight: 600;
    margin-top: 10px;
  } 
</style>