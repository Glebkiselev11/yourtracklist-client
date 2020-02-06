<template>
  <!-- Компонент информации о релизе / видео которая распологается в предпросмотре (дата/ название и автор )-->
  <div class="prev-info-wrap">
    <!-- Здесь преобразуем формат времени в ISO в более привлекательный формат -->
    <span v-if="date" class="date">{{new Date(date).toLocaleDateString('ru-RU', {month: 'long', day: 'numeric', year: 'numeric'})}}</span>
    
    <!-- FIXME: Если есть permalink то показываем его, это переход по приложению -->
    <a  v-if="permalink" @click.prevent="routerGo" class="name" v-html="name"></a>
    
    <!-- А если нету, то тогда должен быть url это уже внешний переход -->
    <a v-else :href="url" class="name" target="_blank" v-html="name"></a>

    <!-- Здесь выводим ссылку на дискографию артиста, если он не один, то через цикл -->
    <div class="author-name-wrap">
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
    
  </div>
</template>

<script>
export default {
  name: 'Prev-info',

  props: [
    'date', // Дата выпуска
    'name', // Название релиза / видео
    'authors', // Массив авторов
    // Нижние два пропса не могут быть два сразу, поэтому либо один либо другой
    'permalink', // ссылка внутри приложения
    'url', // ссылка на внешний ресурс
    'type', // тип для которого мы используем этот компонент  (release / video)
  ],

  methods: {
    // Через этот метод мы переходим к карточке релиза / видео
    routerGo() {
      // Эмитим (для меню поиска) чтобы при переходе в альбом закрыть страницу поиска
      this.$emit('close')

      // Определяем куда мы переходим в карточку релиза, или в карточку видео
      let pushString = this.type === 'release' ? '/release/' : '/video/'

      for (let i = 0; i < this.authors.length; i++) {
        const author = this.authors[i]
        
        // Собираем строку из авторов, чтобы на выходе у нас получилось cat-soup+drip-133, если автора два
        pushString += i < 1 ? `${author['permalink']}` : `+${author['permalink']}`
      }

      // И отправляем результат в роутер (на выходе получиться так: '/release/cat-soup+drip-133/loss-prevention')
      this.$router.push(`${pushString}/${this.permalink}`)
    }
    
  }
}
</script>

<style scoped>

  .prev-info-wrap {
    width: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .date {
    font-size: 14px;
    font-weight: 400;
    display: block;
    margin-bottom: 5px;
  }

  .name {
    max-width: inherit;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
    white-space: nowrap;
    cursor: pointer;
  }

  .author-name-wrap {
    margin: 2px 0 1px 0;
    max-width: inherit;
  }

  .author {
    font-size: 16px;
    font-weight: 500;
    display: inline;
    line-height: 160%;
    
  }

  .author span {
    margin: 0 5px;
  }  

  .active-link:hover {
    border-bottom: 1px solid var(--primary-color);
  }

  .not-active-link {
    cursor: default;
  }
</style>