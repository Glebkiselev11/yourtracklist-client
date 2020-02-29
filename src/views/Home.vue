<template>
  <div class="home-wrap">

    <!-- Промо блок в самом верху главной страницы -->
    <TheHero />

    <!-- Промо блок с архивом релизов, где выводим 4 последних релиза -->
    <ReleasePrevArchive 
      :four-latest-releases="fourLatestReleases"
      :error="errorOnReleases"
    />

    <!-- Промо блок с видео записями, где выводим 3 последних видоса -->
    <VideoPrevArchive 
      :four-latest-video="fourLatestVideos"
      :error="errorOnVideos"
    />

  </div>
</template>

<script>
import TheHero from '@/components/TheHero.vue'
import ReleasePrevArchive from '@/components/ReleasePrevArchive.vue'
import VideoPrevArchive from '@/components/VideoPrevArchive.vue'
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: 'Home',
  components: {
    ReleasePrevArchive, 
    VideoPrevArchive, 
    TheHero,
  },

  data: () => ({
    errorOnReleases: null,
    errorOnVideos: null,
  }),

  computed: {
    ...mapGetters([
      'fourLatestReleases', 
      'fourLatestVideos'
    ])
  },

  async mounted() {
    // При загрузке компонента вызываем релизы, видео для главной страницы
    try {
      await this.getFourLatesReleases()
      this.errorOnReleases = null
    } catch (error) {
      this.errorOnReleases = error
    }

    try {
      await this.getFourLatesVideos()
      this.errorOnVideos = null
    } catch (error) {
      this.errorOnVideos = error
    }
  },

  beforeDestroy() {
    // После закрытия главной страницы мы очищаем из стора загруженные данные, чтобы избежать утечки памяти
    this.clearFourLatesReleases()
    this.clearFourLatesVideos()

    this.errorOnReleases = null
    this.errorOnVideos = null
  },

  methods: {
    ...mapActions([
      'getFourLatesReleases',
      'getFourLatesVideos'
    ]),

    ...mapMutations([
      'clearFourLatesReleases',
      'clearFourLatesVideos'
    ]),

  }
}
</script>

<style scoped>
  .home-wrap {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
