<template>
  <!-- Компонент для шапки тегов, которая отображается над обложкой релиза, 
  видео в предпросмотрева, то есть на главной, или же в поиске  -->
  <div class="release-tags">
    <span 
      v-for="(tag, index) in tagsArray"
      :key="index"
    >
    <span v-if="index !== 0"> / </span>
    <a @click.prevent="routerTo(linkTo, tag)">{{tag}}</a>
  </span>

  </div>
  
</template>

<script>
export default {
  name: 'TagsPrevHeader',
  
  props: {
    tagsArray: Array,
    linkTo: String
  },

  methods: {
    // Перекидывает в архив (релизов, или миксов, и там ставит нужный тег в фильтр)
    routerTo(linkTo, tag) {
      // И перед этим сбрасываем номер текущей страницы, чтобы не было лишних ошибок
      this.$store.commit('setPageNum', 1)
      this.$router.push({ query: { ...this.$route.query, page: 1 } })
      this.$emit('close')

      this.$router.push({ path: linkTo , query: { ...this.$route.query, tag }})
    }
  },
}
</script>

<style scoped>

  .release-tags {
    width: inherit;
    display: inline-block;
    padding: 7px 0;
    font-size: 14px;
    font-weight: 300;
    border-top: 1px solid var(--primary-color);
  }

  .release-tags a:hover {
    cursor: pointer;
  }
</style>


