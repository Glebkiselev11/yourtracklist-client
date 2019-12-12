<template>
  <!-- Компонент куда мы выводим видео записи в архиве, либо видео записи артиста -->
  <div class="window-wrap">
     
      <!-- Количество найденых релизов -->
      <span class="number-of-releases" v-if="count > 0">Найден{{count == 1 ? '': 'o'}} {{count}} {{countText}}</span>

      <!-- Сюда итерируем сами релизы / миксы -->
      <div class="archive-wrap">

        <div 
          class="video-item" 
          v-for="(video, index) in videos"
          :key="index"
        >
          <!-- Обложка -->
          <div class="cover-wrap">
            <a 
              :href="`https://www.youtube.com/watch?v=${video.permalink}`" 
              target="_blank"
              class="video-cover" 
              :style="{ 'backgroundImage' : 'url(' + `https://img.youtube.com/vi/${video.permalink}/hqdefault.jpg` + ')' }"
            > 
              <!-- Значок плея -->
              <VideoPlayButton 
                :size="50"
              />


              <!-- Компонент который отображает длительность видео -->
              <PrevVideoInfo 
                :duration="video.duration"
              />
            </a>

          
          </div>
          
          <PrevInfo 
            :date="video.date"
            :name="video.name"
            :authors="video.authors"
            :url="`https://www.youtube.com/watch?v=${video.permalink}`" 
          />
        </div>


      </div>


      <!-- Пагинация (для визуального представления был использован плагин vuejs-paginate, 
          а сама логика для работы с нашей таблицей лежит в @/mixins/pagination.mixin.js) -->
      <Paginate
        v-if="pageCount && (count > pageSize)"
        :page-count="pageCount"
        v-model="pageNum"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :active-class="'page-active'"
      />
    </div>
</template>

<script>
import PrevVideoInfo from '@/components/app/video/PrevVideoInfo.vue'
import VideoPlayButton from '@/components/app/video/VideoPlayButton.vue'
import PrevInfo from '@/components/app/PrevInfo.vue'

import paginationMixin from '@/mixins/pagination.mixin.js'
export default {
  name: 'Video-archive-window',
  props: ['videos'],
  components: {
    PrevVideoInfo, VideoPlayButton, PrevInfo
  },
  mixins: [ paginationMixin ], // Тут мы инициализируем миксин который нужен для пагинации
}
</script>

<style scoped>
  .window-wrap {
    margin-top: 50px;
    margin-bottom: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .top-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
   select {
    border: none;
    font-size: 20px;
    font-weight: 500;
    margin-left: 20px;

  }
  select:focus {
    outline: none;
  }

  .number-of-video {
    margin-left: auto;
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: 300;
  }


  /* Обертка под видео */

  .video-wrap { 
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }

  /* Сам элемент видео */
  .video-item {
    width: 280px;
    height: 280px;
    margin-bottom: 60px;
  }
  .cover-wrap {
    overflow: hidden;
    margin-bottom: 10px;
  }
  .video-cover {
    height: 210px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
</style>