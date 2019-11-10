<template>
  <!-- Компонент для шапки тегов, которая отображается над обложкой релиза, 
  микса в предпросмотрева, то есть на главной, или же в поиске  -->
  <div class="release-tags">
    <span 
      v-for="(tag, index) in this.tagsArray"
      :key="index"
    >
    <span v-if="index !== 0"> / </span>
    <router-link :to="linkTo + 'tags/'+ tag">{{tag}}</router-link>
  </span>

  </div>
  
</template>

<script>

  export default {
    name: 'Prev-tags-header',
    props: ['tagsArray', 'linkTo']
  }
</script>

<style scoped>

  .release-tags {
    display: inline-block;
    margin-top: 7px;
    margin-bottom: 12px;
    margin-right: 5px;
    font-size: 14px;
    font-weight: 300;
  }
</style>


