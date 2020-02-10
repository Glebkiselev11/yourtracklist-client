<template>
  <!-- Страница автора, где все его ссылки, его аудио и видео-->
  <div class="autor-wrap">

    <!-- Прелоадер -->
    <Loader v-if="loading" />

    <!-- Если данные загрузились об артисте, то отображаем их -->
    <div
      v-else 
      class="author-info-wrap"
    >
      <h1 class="author-title">{{authorInfo.name}}</h1>

      <!-- Обертка для тегов и ссылок -->
      <div class="tags-soc-wrap">

        <!-- Сюда выводим теги -->
        <div class="author-tags">
          <h4 class="second-title">Теги</h4>
          
          <!-- Итерируем теги -->
          <a 
            v-for="(tag, index) in authorInfo.tags" 
            :key="index"
            class="tag-item"
            @click.prevent="routerTo('/releases-archive', tag)"
          >{{tag}}
          </a>
        </div>

        <!-- А сюда социальный ссылки артиста -->
        <div class="author-social">
          <h4 class="second-title">Ссылки артиста</h4>

          <div class="author-social-links">
            <a 
              v-for="(link, linkName) of authorInfo.socials_links" 
              :key="linkName" 
              :href="link"
              target="_blank"
            >{{linkName}}
            </a>
          </div>
        </div>
      </div>
      

    <!-- Здесь показываем 4 релиза автора -->
    <ReleasePrevArchive
      v-show="this.fourLastReleasesForAuthor.length" 
      :author-permalink="authorInfo.permalink"
      :four-latest-releases="this.fourLastReleasesForAuthor"
      :count="this.releasesCountForAuthor"
    />

    <!-- А тут 4 последних видео автора -->
    <VideoPrevArchive 
      v-show="this.fourLastVideosForAuthor.length" 
      :author-permalink="authorInfo.permalink"
      :fourLatestVideo="this.fourLastVideosForAuthor"
      :count="this.videosCountForAuthor"
    />

    </div>
    
  </div>
</template>

<script>
import VideoPrevArchive from '@/components/VideoPrevArchive.vue'
import ReleasePrevArchive from '@/components/ReleasePrevArchive.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'Author-page',

  components: {
    ReleasePrevArchive, VideoPrevArchive
  },

  data: () => ({
    loading: true,
    fakeLastFourRel: []
  }),

  computed: {
    ...mapGetters([
      'authorInfo', // Информация о авторе, теги, ссылки
      'fourLastReleasesForAuthor', // Превью 4 релизов автора (их может быть и меньше 4)
      'releasesCountForAuthor', // Количество сколько всего релизов у автора
      'fourLastVideosForAuthor', // Превью 4 видео автора (их может быть и меньше 4)
      'videosCountForAuthor', // Количество сколько всего видео у автора
    ])
  },

  async created() {
    await this.$store.dispatch('getAuthorById', this.$route.params.permalink)
    this.loading = false
  },

  // Вызывается когда маршрут, что рендерит этот компонент изменился
  async beforeRouteUpdate(to, from, next) {
    // Вот эти все манипуляции в этом хуке нужны для того чтобы, если ты находясь на странице автора, выбрал из релизов другого
    // совместного автора и корректно к нему перешел, там был некий баг, но благодаря этой штуке все окич
    this.loading = true

    this.$store.commit('clearAuthorInfo') // Инфа об авторе
    this.$store.commit('clearFourLastReleasesForAuthor') // Чистим из стора инфу о релизах
    this.$store.commit('clearFourLastVideosForAuthor') // Чистим инфу о видосах

    // Подгружаем нового автора
    await this.$store.dispatch('getAuthorById', to.params.permalink)

    // Отключаем лоадинг
    this.loading = false
    // И пускаем на страницу
    next()
  },
  
  beforeDestroy() {
    // После закрытия страницы автора, мы очищаем инфу о нем из стейта
    this.$store.commit('clearAuthorInfo') // Инфа об авторе
    this.$store.commit('clearFourLastReleasesForAuthor') // Чистим из стора инфу о релизах
    this.$store.commit('clearFourLastVideosForAuthor') // Чистим инфу из стора о видео
  },

  methods: {
    // Перекидывает в архив (релизов, или миксов, и там ставит нужный тег в фильтр)
    routerTo(linkTo, tag) {
      this.$router.push({ path: linkTo , query: { ...this.$route.query, tag }})
    }
  },

}

</script>

<style scoped>
  .autor-wrap {
    border-top: 1px solid black;
    padding-top: 20px; 
  }

  .author-title {
    font-size: 40px;
    font-weight: 800;
  }
  

  .tags-soc-wrap {
    margin-top: 50px;
    display: flex;
  }

  /* Заголовок для тегов и соц-ссылок */
  .second-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 25px;
    margin-right: 238px;
    display: block;
  }

  .tag-item {
    display: block;
    margin-top: 10px;
    font-size: 18px;
    font-weight: 300;
  }


  /* Сюда выводим ссылки */
  .author-social-links {
    height: 70px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .author-social-links a {
    margin-right: 80px;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 300;
  }
</style>