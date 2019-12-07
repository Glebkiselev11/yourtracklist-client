<template>
  <!-- Карточка релиза -->
  <div class="wrap">
    
    <!-- Пока нет инфы, отображаем загрузку -->
    <Loader v-if="!releaseInfo" />

    <!-- Обертка под сам релиз (обложка и информация) -->
    <div v-else class="release-wrap">
      <!-- Обложка -->
      <img class="release-cover" :src="releaseInfo.cover" alt="cover">

      <!-- Информация о релизе, которая располагается справа от обложки -->
      <div class="release-info-wrap">
        
        <!-- Обертка под название и дату релиза -->
        <div class="release-info--name-date-wrap">
          <h1>{{releaseInfo.name}}</h1>

          <!-- Здесь выводим ссылку на дискографию артиста, если он не один, то через цикл -->
          <h2 class="author"  
            v-for="(author, index) in this.releaseInfo.authors"
            :key="index"
          >
            
            <router-link class="active-link"
              :to="'/author/' + author.permalink"
            >{{author.name}}</router-link>
            
            <!-- Добавляем & знак между артистами если их несколько -->
            <span class="author" v-if="releaseInfo.authors.length > 1 && (index !== releaseInfo.authors.length - 1)">&</span>
          </h2>


          <!-- Здесь преобразуем формат времени в ISO в более привлекательный формат -->
          <span class="release-info--date">{{new Date(releaseInfo.date).toLocaleDateString('ru-RU', {month: 'long', day: 'numeric', year: 'numeric'})}}</span>
        </div>

        <!-- Здесь отображаем длительность релиза и сколько треков -->
        <div class="release-duration--wrap">
          <div class="duration-item">
            <p>Количество треков</p>
            <div class="duration-value">
              <span>{{releaseInfo.number_of_tracks}}</span>
            </div>
          </div>

          <div class="duration-item">
            <p>Продолжительность</p>
            <div class="duration-value">
              <span v-if="releaseInfo.duration.hours">{{releaseInfo.duration.hours + ':' + releaseInfo.duration.minutes + ':' + releaseInfo.duration.seconds}}</span>
              <span v-else>{{releaseInfo.duration.minutes + ':' + releaseInfo.duration.seconds}}</span>
            </div>  
            
          </div>
          
          
        </div>

        <div class="link-and-tags-wrap">
          <!-- Обертка под ссылки, где можно прослушать этот релиз -->
          <div class="release-listen-wrap">
            <h3 class="link-and-tags-title">Послушать релиз</h3>
            <ul>
              <li class="link-and-tags-item"
                v-for="(link, name) of releaseInfo.socials_links" 
                :key="name"
              ><a target="_blank" :href="link">{{name}}</a></li>
            </ul>
            

          </div>

          <!-- Теги релиза -->
          <div class="release-tags">
            <h4 class="link-and-tags-title">Теги</h4>
            <ul>
              <li class="link-and-tags-item"
                v-for="(tag, index) of releaseInfo.tags"
                :key="index"
            
              ><a @click.prevent="routerTo('/releases-archive', tag)">{{tag}}</a></li>
            
            </ul>
          </div>
        </div>
        


      </div>

    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Release-cart',

  async mounted() {
    // При загрузке карточки релиза, мы из адресной строки вытаскиваем ссылку автора и ссылку релиза
    const author = this.$route.params.author_permalink
    const release = this.$route.params.release_permalink

    // и по ним запрашиваем с бэкенда нужный релиз
    await this.$store.dispatch('getReleaseInfo', {author, release})
  },
  computed: {
    // Тут мы его получаем
    ...mapGetters(['releaseInfo'])
  },
  methods: {
    // Перекидывает в архив (релизов, или миксов, и там ставит нужный тег в фильтр)
    routerTo(linkTo, tag) {
      this.$router.push({ path: linkTo , query: { ...this.$route.query, tag }})
    }
  },
  beforeDestroy() {
    // ! После закрытия мы очищаем стор от загруженного релиза
    this.$store.commit('clearReleaseInfo') // Релиз
  }
}
</script>

<style scoped>

  .wrap {
    width: 100%;
    min-height: 550px;
    margin-top: 110px;
    margin-bottom: 200px;
    display: flex;
    box-sizing: content-box;
  }

 
  .release-wrap {
    margin-top: 82px;
    margin-left: 130px;
    width: 100%;
    display: flex;
    
  }

  .release-cover {
    width: 348px;
    height: 348px;
  }


  /* Информация о релизе */
  .release-info-wrap {
    position: relative;
    height: 100%;
    width: 100%;
    margin-left: 109px;
  }


  /* Обертка под название и дату релиза */
  .release-info--name-date-wrap {
    padding-bottom: 20px;
    border-bottom: 1px solid grey;
  }
  .release-info--name-date-wrap h1 {
    font-size: 35px;
    font-weight: 800;
    margin-bottom: 10px;
  }  
  .author {
    display: inline;
    font-weight: 600;
    font-size: 25px;
  }
  .author span {
    margin: 0 7px;
  } 
  .active-link:hover {
    border-bottom: 1px solid black;
  }
  .release-info--date{
    font-size: 16px;
    font-weight: 400;
    display: block;
    margin-top: 30px;
  }


  /* Информация о продолжительности релиза */
  .release-duration--wrap {
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100px;
    border-bottom: 1px solid black;
  }
  /* То место где отображаем значения */
  .duration-item {
    display: flex;
    justify-content: space-between;
    width: 300px;
  }
  .duration-value {
    display: flex;
    width: 70px;
  }


  /* Обертка под ссылки и теги */
  .link-and-tags-wrap {
    margin-top: 40px;
    display: flex;
    width: 100%;
  }

  /* Общий класс для заголовков ссылок и тегов */
  .link-and-tags-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px; 
  }

  /* li в котором лежит ссылка */
  .link-and-tags-item {
    font-size: 18px;
    margin-bottom: 10px;
  }

  /* Теги */
  .release-tags {
    margin-left: 65px;
  }


</style>