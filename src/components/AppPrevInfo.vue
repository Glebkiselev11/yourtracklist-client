<template>
  <!-- Компонент информации о релизе / видео которая распологается в предпросмотре (дата/ название и автор )-->
  <div class="prev-info-wrap">
    
    <!-- Дата выхода релиза / видео -->
    <span 
      v-if="date" 
      class="date"
    >{{date | ConvertedDate}}
    </span>
    
    <!-- Название релиза / видео -->
    <a 
      v-html="name"
      @click.prevent="routerGo" 
      class="name" 
    ></a>
    

    <!-- Здесь выводим ссылку на дискографию артиста, если он не один, то через цикл -->
    <div class="author-name-wrap">
      
      <span 
        v-for="(author, index) in authors"
        :key="index"
        class="author"
      >
        <router-link 
          :to="'/author/' + author.permalink"
          class="active-link"
        >{{author.name}}
        </router-link>{{authors.length > 1 && (index !== authors.length - 1) ? ' & ' : ''}}
        <!-- Добавляем & знак между артистами если их несколько -->
        <!-- TODO: в будущем надо будет создать универсальный метод для подобных нужд -->

      </span >
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'AppPrefInfo',

  props: {
    date: String, // Дата выпуска
    name: String, // Название релиза / видео
    authors: Array, // Массив авторов
    type: String, // Тип для которого мы используем этот компонент  (release / video)
    permalink: String, // Cсылка внутри приложения
  },

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