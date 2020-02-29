<template>
  <div class="home-wrap">

    <!-- Промо блок в самом верху главной страницы -->
    <TheHero />

    <!-- Промо блок с архивом релизов, где выводим 4 последних релиза -->
    <ReleasePrevArchive 
      :four-latest-releases="fourLatestReleases"
      :count="5" 
    />
    <!-- :count="5" потому что мы знаем что всего релизов всегда больше 4 (и 5 нам позволяет принудительно включить кнопку "показать больше") -->

    <!-- Промо блок с видео записями, где выводим 3 последних видоса -->
    <VideoPrevArchive 
      :fourLatestVideo="fourLatestVideos"
      :count="5"
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

  computed: {
    ...mapGetters([
      'fourLatestReleases', 
      'fourLatestVideos'
    ])
  },

  async mounted() {
    // При загрузке компонента вызываем релизы, видео для главной страницы
    await this.getFourLatesReleases()
    await this.getFourLatesVideos()
  },

  beforeDestroy() {
    // После закрытия главной страницы мы очищаем из стора загруженные данные, чтобы избежать утечки памяти
    this.clearFourLatesReleases()
    this.clearFourLatesVideos()
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
