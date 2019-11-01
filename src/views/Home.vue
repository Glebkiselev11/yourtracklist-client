<template>
  <div class="home-wrap">

    <!-- Промо блок в самом верху сайта, там мы показываем новости, и 3 рандомных релиза -->
    <Hero />

    <!-- Промо блок с архивом релизов, где выводим 4 последний релиза -->
    <ReleaseArchiveHome />

  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import ReleaseArchiveHome from '@/components/ReleaseArchiveHome.vue'
export default {
  name: 'Home',
  components: {
    Hero, ReleaseArchiveHome
  }
}
</script>

<style scoped>
  .home-wrap {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
