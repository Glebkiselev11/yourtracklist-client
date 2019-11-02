<template>
  <div class="home-wrap">

    <!-- Промо блок в самом верху сайта, там мы показываем новости, и 3 рандомных релиза -->
    <Hero />

    <!-- Промо блок с архивом релизов, где выводим 4 последний релиза -->
    <ReleaseArchiveHome />

    <!-- Промо блок с видео записями, где выводим 3 последних видоса -->
    <ViedeoHome />

    <!-- Промо блок с миксами, где выводим 4 рандомных микса -->
    <MixesHome />

    <!-- Промо блок с лейблом, где выводим 4 рандомных релиза лейбла -->
    <LabelHome />
  </div>
</template>

<script>
import Hero from '@/components/home/Hero.vue'
import ReleaseArchiveHome from '@/components/home/ReleaseArchiveHome.vue'
import ViedeoHome from '@/components/home/VideoHome.vue'
import MixesHome from '@/components/home/MixesHome.vue'
import LabelHome from '@/components/home/LabelHome.vue'

export default {
  name: 'Home',
  components: {
    Hero, ReleaseArchiveHome, ViedeoHome, MixesHome, LabelHome
  }
}
</script>

<style scoped>
  .home-wrap {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
