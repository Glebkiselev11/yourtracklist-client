<template>
  <div class="home-wrap">

    <!-- Промо блок в самом верху сайта, там мы показываем новости -->
    <Hero />

    <!-- Промо блок с архивом релизов, где выводим 4 последних релиза -->
    <ReleaseArchivePrev 
      :four-latest-releases="this.fourLatestReleases"
    />

    <!-- Промо блок с видео записями, где выводим 3 последних видоса -->
    <VideoArchivePrev 
      :fourLatestVideo="this.fourLatestVideos"
    />

    <!-- Промо блок с миксами, где выводим 4 рандомных микса -->
    <MixesHome />

    <!-- Промо блок с лейблом, где выводим 4 рандомных релиза лейбла -->
    <!-- <LabelHome /> -->
  </div>
</template>

<script>
import Hero from '@/components/home/Hero.vue'
import ReleaseArchivePrev from '@/components/app/music/ReleaseArchivePrev.vue'
import VideoArchivePrev from '@/components/app/video/VideoArchivePrev.vue'
import MixesHome from '@/components/home/MixesHome.vue'
// import LabelHome from '@/components/home/LabelHome.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  components: {
    // LabelHome,
    ReleaseArchivePrev, VideoArchivePrev, MixesHome, Hero
  },
  async mounted() {
    // При загрузке компонента вызываем релизы, видео для главной страницы
    await this.$store.dispatch('getFourLatesReleases')
    await this.$store.dispatch('getFourLatesVideos')
  },
  computed: {
    // Забираем значения из стора
    ...mapGetters(['fourLatestReleases', 'fourLatestVideos'])
  },
  beforeDestroy() {
    // После закрытия главной страницы мы очищаем из стора загруженные данные, чтобы избежать утечки памяти
    this.$store.commit('clearFourLatesReleases') // Релизы
    this.$store.commit('clearFourLatesVideos') // Видео
  }
}
</script>

<style scoped>
  .home-wrap {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
