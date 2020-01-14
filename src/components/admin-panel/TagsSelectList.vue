<template>
  <!-- Компонент для выбора возможных тегов (используется в админ панелях, для добавления релиза/видео -->
  <div class="input-item">
    <!-- Здесь мы вводим нужный тег в поиск -->
    <input 
      type="text" 
      placeholder="Теги"
      list="tagslist" 
      v-model="tag" 
      @change="setTag"
    >

    <!-- Удобный поиск тегов в списке -->
    <datalist id="tagslist" >
      <option 
        v-for="(tag, index) in tagsArray" 
        :key="index" 
        :value="tag.name"
      ></option>
    </datalist>

    <!-- Сюда мы чипсами будем выводить выбранных авторов -->
    <div class="tags-chips-wrap">
      <span
        v-for="(tag, index) in enterTags" 
        :key="index" 
        class="tag-chip-item"
        :style="`flex-grow: ${tag.name.length < 5 ? 1 : tag.name.length < 10 ? 2 : tag.name.length < 15 ? 3 : 4}`"
        @click="clearTag(index)"
      >{{tag.name}}</span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Tags-select-list',

}
</script>

<style scoped>
  .tag-chips-wrap {
    margin-top: 2px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .tag-chip-item {
    background-color: var(--primary-color);
    color: var(--primary-background-color);
    height: 20px;
    margin: 2px;
    padding: 0 4px 0 2px;
    white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis;
    font-size: .8rem;
    border: 1px solid var(--primary-color);
    position: relative;
  }
  /* Кнопка удаления автора */
  .tag-chip-item::after {
    position: absolute;
    content: 'X';
    right: 0;
    color: white;
    height: 100%;
    width: 10px;
    text-align: center;
    font-weight: 300;
    background: rgba(128, 128, 128, 0.589);
  }

  .tag-chip-item:hover {
    cursor: pointer;
  }

</style>