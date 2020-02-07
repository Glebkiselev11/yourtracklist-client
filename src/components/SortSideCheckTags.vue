<template>
  <!-- Компонент для выбора доступных тегов в сортировках, используется в архивах релизов, видео, миксов -->
  <div class="checkbox-tags-wrap">
    <h3 class="sorting-title" >Сортировать по тегам</h3>

    <!-- Итерируем с базы данных теги -->
    <div class="checkbox-tag-item" 
      v-for="(tag, index) of tags"
      :key="index"
    > 
      <input type="checkbox" :id="tag.name" :value="tag.name" v-model="changeTags">
      <label :for="tag.name">{{tag.name}}</label>
      
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Check-tags',

  props: {
    tags: Array,
    selectTags: Array,
  },

  computed: {
    changeTags: {
      set(tags) {
        this.$emit('tags', tags)
      },
      get() {
        return this.selectTags
      }
    }
    
  },
}
</script>

<style scoped>

  .checkbox-tags-wrap {
    margin-top: 50px;
  }

  .sorting-title {
    font-size: 20px;
    font-weight: 500;
    display: block; 
    margin-bottom: 20px;
  }

  .checkbox-tag-item {
    margin-top: 5px;
  }

  .checkbox-tag-item label {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 300;
  }

</style>