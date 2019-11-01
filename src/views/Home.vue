<template>
  <div class="home-wrap">
    <Hero />
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
export default {
  name: 'Home',
  components: {
    Hero
  }
}
</script>

<style scoped>
  .home-wrap {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
