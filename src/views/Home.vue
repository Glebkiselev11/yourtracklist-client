<template>
  <div class="home-wrap">

    <!-- Промо блок в самом верху сайта, там мы показываем новости, и 3 рандомных релиза -->
    <Hero />

    <!-- Промо блок с архивом релизов, где выводим 4 последний релиза -->
    <ReleaseArchiveHome />

    <!-- Промо блок с видео записями, где выводим 3 последних видоса -->
    <ViedeoHome />
  </div>
</template>

<script>
import Hero from '@/components/home/Hero.vue'
import ReleaseArchiveHome from '@/components/home/ReleaseArchiveHome.vue'
import ViedeoHome from '@/components/home/VideoHome.vue'

export default {
  name: 'Home',
  components: {
    Hero, ReleaseArchiveHome, ViedeoHome
  }
}
</script>

<style scoped>
  .home-wrap {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
