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
          
          <!-- Итерируем ссылки -->
          <a class="tag-item"
            v-for="(tag, index) in authorInfo.tags" 
            :key="index"
            @click.prevent="routerTo('/releases-archive', tag)"
          >{{tag}}</a>
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
            >{{linkName}}</a>
          </div>
        </div>
      </div>
      

    <!-- Здесь показываем 4 релиза, пока используем тот же компонент что и на главной -->
    <ReleaseArchivePrev
      v-show="this.fourLastReleasesForAuthor.length" 
      :author-permalink="authorInfo.permalink"
      :four-latest-releases="this.fourLastReleasesForAuthor"
    />

    <!-- А тут 4 последних видео автора, этот компонент используется пока только на странице автора. (на главной странице у нас другой компонент) -->
    <VideoPrevAuthor 
      v-show="this.fourLastVideosForAuthor.length" 
      :author-permalink="authorInfo.permalink"
      :fourLatestVideo="this.fourLastVideosForAuthor"
    />

    </div>
    
  </div>
</template>

<script>
import VideoPrevAuthor from '@/components/app/video/VideoPrevAuthor.vue'
import ReleaseArchivePrev from '@/components/app/music/ReleaseArchivePrev.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'Author-page',
  data: () => ({
    loading: true,
    fakeLastFourRel: []
  }),
  components: {
    ReleaseArchivePrev, VideoPrevAuthor
  },
  async created() {
    await this.$store.dispatch('getAuthorById', this.$route.params.permalink)

    this.loading = false
  },
  computed: {
    ...mapGetters(['authorInfo', 'fourLastReleasesForAuthor', 'fourLastVideosForAuthor'])
  },
  beforeDestroy() {
    // ! После закрытия страницы автора, мы очищаем инфу о нем из стейта
    this.$store.commit('clearAuthorInfo') // Инфа об авторе
    this.$store.commit('clearFourLastReleasesForAuthor') // Чистим из стора инфу о релизах
    this.$store.commit('clearFourLastVideosForAuthor') // Чистим инфу из стора о видео
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
  methods: {
    // Перекидывает в архив (релизов, или миксов, и там ставит нужный тег в фильтр)
    routerTo(linkTo, tag) {
      // И перед этим сбрасываем номер текущей страницы, чтобы не было лишних ошибок
      this.$store.commit('setPageNum', 1)
      this.$router.push({ query: { ...this.$route.query, page: 1 } })
       
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