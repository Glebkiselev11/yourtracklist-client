<template>
  <!-- Страница автора, где все его ссылки, его аудио и видео-->
  <div class="autor-wrap">

    <!-- Прелоадер -->
    <p v-if="!authorInfo">Загрузка...</p>

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
          <router-link  class="tag-item"
            v-for="(tag, index) in authorInfo.tags" 
            :key="index"
            :to="'/releases-archive/tags/' + tag"
          >{{tag}}</router-link>
        </div>

        <!-- А сюда социальный ссылки артиста -->
        <div class="author-social">
          <h4 class="second-title">Ссылки артиста</h4>

          <div class="author-social-links">
            <a 
              v-for="(link, linkName) of authorInfo.links" 
              :key="linkName" 
              :href="link"
              target="_blank"
            >{{linkName}}</a>
          </div>
        </div>
      </div>
      

    <!-- Здесь показываем 4 релиза, пока используем тот же компонент что и на главной -->
    <ReleaseArchivePrev 
      :four-latest-releases="this.fourLastReleasesForAuthor"
    />

    <VideoPrevAuthor 
      
    />

    </div>
    
  </div>
</template>

<script>
import VideoPrevAuthor from '@/components/VideoPrevAuthor.vue'
import ReleaseArchivePrev from '@/components/ReleaseArchivePrev.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'Author-page',
  data: () => ({
    fakeLastFourRel: []
  }),
  components: {
    ReleaseArchivePrev, VideoPrevAuthor
  },
  async created() {
    await this.$store.dispatch('getAuthorById', this.$route.params.permalink)
    await this.$store.dispatch('getFourLatesReleasesForAuthorById', this.$route.params.permalink)
  },
  computed: {
    ...mapGetters(['authorInfo', 'fourLastReleasesForAuthor'])
  },
  beforeDestroy() {
    // ! После закрытия страницы автора, мы очищаем инфу о нем из стейта
    this.$store.commit('clearAuthorInfo') // Инфа об авторе
    this.$store.commit('clearFourLastReleasesForAuthor') // Чистим из стора инфу о релизах
    // ! После тут еще добаваться методы на очистку видосов
  },

  // Вызывается когда маршрут, что рендерит этот компонент изменился
  async beforeRouteUpdate(to, from, next) {
    
    // Вот эти все манипуляции в этом хуке нужны для того чтобы, если ты находясь на странице автора, выбрал из релизов другого
    // совместного автора и корректно к нему перешел, там был некий баг, но благодаря этой штуке все окич

    this.$store.commit('clearAuthorInfo') // Инфа об авторе
    this.$store.commit('clearFourLastReleasesForAuthor') // Чистим из стора инфу о релизах

    console.log(from)
    await this.$store.dispatch('getAuthorById', to.params.permalink)
    await this.$store.dispatch('getFourLatesReleasesForAuthorById', to.params.permalink)
    
    next()
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