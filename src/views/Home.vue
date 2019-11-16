<template>
  <div class="home-wrap">

    <!-- Промо блок в самом верху сайта, там мы показываем новости, и 3 рандомных релиза -->
    <!-- <Hero /> -->

    <!-- Промо блок с архивом релизов, где выводим 4 последних релиза -->
    <ReleaseArchivePrev 
      :four-latest-releases="this.fourLatestReleases"
    />

    <!-- Промо блок с видео записями, где выводим 3 последних видоса -->
    <ViedeoHome />

    <!-- Промо блок с миксами, где выводим 4 рандомных микса -->
    <MixesHome />

    <!-- Промо блок с лейблом, где выводим 4 рандомных релиза лейбла -->
    <LabelHome />
  </div>
</template>

<script>
// import Hero from '@/components/home/Hero.vue'
import ReleaseArchivePrev from '@/components/ReleaseArchivePrev.vue'
import ViedeoHome from '@/components/home/VideoHome.vue'
import MixesHome from '@/components/home/MixesHome.vue'
import LabelHome from '@/components/home/LabelHome.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  components: {
    // Hero, 
    ReleaseArchivePrev, ViedeoHome, MixesHome, LabelHome
  },
  async mounted() {
    await this.$store.dispatch('getFourLatesReleases')
  },
  computed: {
    ...mapGetters(['fourLatestReleases'])
  },
  beforeDestroy() {
    // После закрытия главной страницы мы очищаем из стора загруженные данные, чтобы избежать утечки памяти
    this.$store.commit('setFourLatesReleases', undefined) // Релизы
  }
}
</script>

<style scoped>
  .home-wrap {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
