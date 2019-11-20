<template>
  <!-- Компонент информации о релизе / видео которая распологается в предпросмотре (дата/ название и автор )-->
  <div>
    <!-- Здесь преобразуем формат времени в ISO в более привлекательный формат -->
    <span v-if="date" class="date">{{new Date(date).toLocaleDateString('ru-RU', {month: 'long', day: 'numeric', year: 'numeric'})}}</span>
    
    <!-- Если есть permalink то показываем его, это переход по приложению -->
    <a  v-if="permalink" @click.prevent="goToReleaseCart" class="name">{{name}}</a>
    
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
  props: ['date', 'permalink', 'name', 'authors', 'url'],
  methods: {
    // Через этот метод мы переходим к карточке релиза
    goToReleaseCart() {
      // Возможно это костыль, но по сути у нас не бывает больше 4 авторов в одном релизе
      if (this.authors.length === 1) {
        this.$router.push(`/release-cart/${this.authors[0]['permalink']}/${this.permalink}`)
      } else if (this.authors.length === 2) {
        this.$router.push(`/release-cart/${this.authors[0]['permalink']}+${this.authors[1]['permalink']}/${this.permalink}`)
      } else if (this.authors.length === 3) {
        this.$router.push(`/release-cart/${this.authors[0]['permalink']}+${this.authors[1]['permalink']}+${this.authors[2]['permalink']}/${this.permalink}`)
      } else {
        this.$router.push(`/release-cart/${this.authors[0]['permalink']}+${this.authors[1]['permalink']}+${this.authors[2]['permalink']}+${this.authors[3]['permalink']}/${this.permalink}`)
      }
      
    }
  }
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
    cursor: pointer;
  }

  .author {
    font-size: 16px;
    font-weight: 500;
    display: inline;
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