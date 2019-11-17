<template>
  <!-- Компонент информации о релизе / видео которая распологается в предпросмотре (дата/ название и автор )-->
  <div>
    <!-- Здесь преобразуем формат времени в ISO в более привлекательный формат -->
    <span v-if="date" class="date">{{new Date(date).toLocaleDateString('ru-RU', {month: 'long', day: 'numeric', year: 'numeric'})}}</span>
    
    <!-- Если есть permalink то показываем его, это переход по приложению -->
    <router-link v-if="permalink" :to="permalink" class="name">{{name}}</router-link>
    
    <!-- А если нету, то тогда должен быть url это уже внешний переход -->
    <a v-else :href="url" class="name" target="_blank">{{name}}</a>

    <!-- Здесь выводим ссылку на дискографию артиста, если он не один, то через цикл -->
    <p class="author"  
      v-for="(author, index) in this.authors"
      :key="index"
    >
      
      <router-link class="active-link"
        :to="'/author/' + author.permalink"
      >{{author.name}}</router-link>
      
      <!-- Добавляем & знак между артистами если их несколько -->
      <span v-if="authors.length > 1 && (index !== authors.length - 1)">&</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Prev-info',
  props: ['date', 'permalink', 'name', 'authors', 'url']
}
</script>

<style scoped>

  .date {
    font-size: 14px;
    font-weight: 400;
    display: block;
    margin-bottom: 8px;
  }

  .name {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
    display: block;
  }

  .author {
    font-size: 16px;
    font-weight: 500;
    display: inline-flex;
  }


  .author span {
    margin: 0 5px;
  }  
  .active-link:hover {
    border-bottom: 1px solid black;
  }

  .not-active-link {
    cursor: default;
  }
</style>