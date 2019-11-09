<template>
  <!-- Страница автора, где все его ссылки, его аудио и видео-->
  <h1 class="">Страница автора</h1>
</template>

<script>
export default {
  name: 'Author-page',
  async mounted() {
    await this.$store.dispatch('getAuthorById', this.$route.params.id)
  },
}
</script>