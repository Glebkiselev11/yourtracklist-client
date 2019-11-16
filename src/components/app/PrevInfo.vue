<template>
  <!-- Компонент информации о релизе / видео которая распологается в предпросмотре (дата/ название и автор )-->
  <div>
    <!-- Здесь преобразуем формат времени в ISO в более привлекательный формат -->
    <span v-if="date" class="release-date">{{new Date(date).toLocaleDateString('ru-RU', {month: 'long', day: 'numeric', year: 'numeric'})}}</span>
    <router-link :to="permalink" class="release-name">{{name}}</router-link>

    <!-- Здесь выводим ссылку на дискографию артиста, если он не один, то через цикл -->
    <p class="release-artist"  
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
  props: ['date', 'permalink', 'name', 'authors']
}
</script>

<style scoped>

  .release-date {
    font-size: 14px;
    font-weight: 400;
    display: block;
    margin-bottom: 8px;
  }

  .release-name {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
    display: block;
  }

  .release-artist {
    font-size: 16px;
    font-weight: 500;
    display: inline-flex;
  }


  .release-artist span {
    margin: 0 5px;
  }  
  .active-link:hover {
    border-bottom: 1px solid black;
  }

  .not-active-link {
    cursor: default;
  }
</style>