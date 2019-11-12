<template>
  <!-- Компонент предпросмотра 4 видео, который используется пока только на странице автора -->
  <div class="prev-video-wrap">
    <TopBar 
      title="Видео"
    />

    <!-- Обертка под релизы, который мы будем итерировать циклом -->
    <div class="releases-wrap">
      
      <!-- Итерируем карточку релиза -->
      <div class="release-item" 
        v-for="(release, index) in fourLatestVideo"
        :key="index"
        >

        <img class="release-image" :src="release.cover" alt="cover">
        <PrevInfo 
          :date="release.date"
          :nameInfo="release.nameInfo"
          :releaseAuthors="release.authors"
        />
      </div>

    </div>
  </div>
</template>

<script>
import PrevInfo from '@/components/app/PrevInfo.vue'
import TopBar from '@/components/app/TopBar.vue'
export default {
  name: 'Video-prev-author',
  props: ['fourLatestVideo'],
  components: {
    TopBar, PrevInfo
  }
}
</script>