<template>
  <!-- Компонент куда мы выводим видео записи в архиве, либо видео записи артиста -->
  <div class="window-wrap">

    <!-- Верхня шапка видео, где у нас сортировка для видео и количество всего видео -->
    <div class="top-bar">
      <!-- Выбираем тип сортировки -->
      <select v-model="sorting">
        <option value="new">Сначала новые</option>
        <option value="old">Сначала старые</option>
        <option value="random">В случайном порядке</option>
        <option value="artist">По исполнителю</option>
      </select>

      <span class="number-of-video">Всего 200 видео</span>
    </div>

    <!-- Обертка под видео записи -->
    <div class="video-wrap">

      <!-- Итерируем видео записи через цикл -->
      <div class="video-item"
        v-for="(video, index) of videoArray"
        :key="index"
      >

        <!-- Обложка -->
        <div class="cover-wrap">
          <a 
            :href="video.url" 
            target="_blank"
            class="video-cover" 
            :class=" index < 1 ? 'big-video' : 'small-video'"
            :style="{ 'backgroundImage' : 'url(' + video.cover + ')' }"
          > 
            <!-- Значок плея (если первое видео, то 100% размер, если второе и третье то меньше) -->
            <VideoPlayButton 
              :size="50"
            />


            <!-- Компонент который отображает длительность видео и его платформу -->
            <PrevVideoInfo 
              :duration="video.duration"
              :platform="video.platform"
            />
          </a>

          
        </div>
        
        <PrevInfo 
          :date="video.date"
          :nameInfo="video.nameInfo"
          :releaseAuthors="video.authors"
        />

      </div>
    </div>

    <Paginate
      :page-count="5"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :active-class="'page-active'"
      v-model="pageNum"
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
  props: ['videoArray'],
  components: {
    PrevVideoInfo, VideoPlayButton, PrevInfo
  },
  mixins: [ paginationMixin ], // Тут мы инициализируем миксин который нужен для пагинации
  data: () => ({
    sorting: 'new'
  }),
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