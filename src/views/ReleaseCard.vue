<template>
  <!-- Карточка релиза -->
  <div class="wrap">
    
    <!-- Пока нет инфы, отображаем загрузку -->
    <Loader v-if="!releaseInfo" />

    <!-- Обертка под сам релиз (обложка и информация) -->
    <div 
      v-else 
      class="release-wrap"
    >
      <!-- Обложка -->
      <img 
        v-show="releaseInfo"
        :src="releaseInfo.original_cover"
        alt="cover"
        class="release-cover" 
      >

      <!-- Информация о релизе, которая располагается справа от обложки -->
      <div class="release-info-wrap">
        
        <!-- Обертка под название и дату релиза -->
        <div class="release-info--name-date-wrap">
          <h1>{{releaseInfo.name}}</h1>

          <!-- Здесь выводим ссылку на дискографию артиста, если он не один, то через цикл -->
          <h2   
            v-for="(author, index) in releaseInfo.authors"
            :key="index"
            class="author"
          >
            
            <router-link 
              :to="'/author/' + author.permalink"
              class="active-link"
            >{{author.name}}
            </router-link>{{releaseInfo.authors.length > 1 && (index !== releaseInfo.authors.length - 1) ? " & " : ""}}
            <!-- Добавляем & знак между артистами если их несколько -->
            <!-- FIXME: Создать отдельный метод для добавления амперсанта между авторами -->

          </h2>


          <!-- Здесь преобразуем формат времени в ISO в более привлекательный формат -->
          <span class="release-info--date">{{releaseInfo.date | ConvertedDate}}</span>

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
              <span>{{ computedDuration(releaseInfo.duration) }}</span>
            </div>  
          
          </div>
          
          
          
        </div>

        <div class="link-and-tags-wrap">
          <!-- Обертка под ссылки, где можно прослушать этот релиз -->
          <div class="release-listen-wrap">
            <h3 class="link-and-tags-title">Послушать релиз</h3>
            <ul>

              <li 
                v-for="(link, name) of releaseInfo.socials_links" 
                :key="name"
                class="link-and-tags-item"
              >
                <a 
                  :href="link"
                  target="_blank" 
                >{{name}}
                </a>
              </li>

            </ul>
            

          </div>

          <!-- Теги релиза -->
          <div class="release-tags">
            <h4 class="link-and-tags-title">Теги</h4>
            <ul>
              <li 
                v-for="(tag, index) of releaseInfo.tags"
                :key="index"
                class="link-and-tags-item"
              >
                <a 
                  @click.prevent="routerTo('/releases-archive', tag)"
                >{{tag}}
                </a>
              </li>
            
            </ul>
          </div>
        </div>
        
        <!-- Треки для релиза -->
        <div class="release-tracks-wrap">

          <!-- Компонент 1 трека -->
          <AppTrackItem 
            v-for="(track, i) of releaseTracks"
            :key="i"
            :track="track"
            class="release-track-item"
          />

    
        </div>
        
      </div>

    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AppTrackItem from '@/components/AppTrackItem'
import duration from '@/mixins/duration.mixin.js'

export default {
  name: 'ReleaseCard',

  components: {
    AppTrackItem, // Циклом передаем туда информацию о 1 треке
  },

  mixins: [
    duration, // Внутри computedDuration он превращает секунды например 90 в 01:30
  ],

  computed: {
    // Тут мы его получаем
    ...mapGetters([
      'releaseInfo', // Информация о релизе
      'releaseTracks', // Треки релиза (пока только информация о треках, без файлов)
    ]),
  },

  
  watch: {
    // Следит за изменениями роутера (нужно если ссылка изменилась (из поиска) открыть новый альбом)
    async '$route' () {
      // Cначала удаляем из стора релиз который был до этого
      this.$store.commit('clearReleaseInfo')

      // После вытаскиваем из роутера данные, по которым получим релиз
      const author = this.$route.params.author_permalink
      const releasePermalink = this.$route.params.release_permalink

      // и по ним запрашиваем с бэкенда нужный релиз
      await this.$store.dispatch('getReleaseInfo', {author, releasePermalink})
    }
  },

  async created() {
    // При загрузке карточки релиза, мы из адресной строки вытаскиваем ссылку автора и ссылку релиза
    const author = this.$route.params.author_permalink
    const releasePermalink = this.$route.params.release_permalink

    // и по ним запрашиваем с бэкенда нужный релиз
    await this.$store.dispatch('getReleaseInfo', {author, releasePermalink})
  },

  beforeDestroy() {
    // После закрытия мы очищаем стор от загруженного релиза
    this.$store.commit('clearReleaseInfo') // Релиз
  },

  methods: {
    // Перекидывает в архив (релизов, или миксов, и там ставит нужный тег в фильтр)
    routerTo(linkTo, tag) {
      this.$router.push({ path: linkTo , query: { ...this.$route.query, tag }})
    },
  },
  
}
</script>

<style scoped>
  
  .wrap {
    width: 100%;
    min-height: 550px;
    margin-top: 110px;
    margin-bottom: 200px;
    box-sizing: content-box;
  }

 
  .release-wrap {
    margin-top: 82px;
    width: 100%;
    display: flex;
    
  }

  .release-cover {
    min-width: 348px;
    height: 348px;
    background: grey;
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



  /* Обертка под треки релиза */
  .release-tracks-wrap {
    margin-top: 50px;
    border-top: 1px solid black;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
  }

  .release-track-item {
    line-height: 2em;
    display: flex;
    justify-content: space-between;

  }

</style>