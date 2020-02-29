<template>  
  <!-- Компонент релизов, который показывает 4 релиза, которые мы ему передаем как пропсы,
  используется на главной странице и в дискографии автора одновременно -->
  <div class="wrap">

    <!-- Верхняя шапка с заголовком и кнопкой -->
    <TopBar 
      title="Релизы"
      :isShowButton="isShowButton"
      @click="routerTo"
    />

    <!-- Сообщение об ошибке -->
    <ErrorMessage 
      v-if="error"
      key="error" 
    >{{error}}
    </ErrorMessage>

    <!-- Обертка под релизы, который мы будем итерировать циклом -->
    <div 
      v-else
      key="releases"
      class="releases-wrap"
    >
      
      <!-- Итерируем карточку релиза -->
      <ReleasePrevCardItem 
        v-for="(release, index) of fourLatestReleases"
        :key="index"
        :release="release"
      />
      
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/AppTopBar.vue'
import ReleasePrevCardItem from '@/components/ReleasePrevCardItem.vue'

export default {
  name: 'ReleaseArchivePrev',

  components: {
    TopBar, 
    ReleasePrevCardItem,
  },

  props: {
    fourLatestReleases: Array, // Четыре релиза (их может быть меньше, если например тут релизы для определенного автора а у автора всего их 3 например)
    error: { // Сообщение об ошибке
      type: String,
      default: null
    },
    
    // * Нижние пропсы нужны только в том случае когда мы этот компонент используем на странице автора
    authorPermalink: String, // Ссылка на автора
    count: { // Сколько всего релизов у автора
      default: 5,
      type: Number
    }, 
  },

  computed: {
    isShowButton() {
      if (this.error || this.count < 4) {
        return false
      } 
      return true
    }
  },
  
  methods: {
    // Переходит к релизам
    routerTo() {
      // Если в компонент был переданана ссылка на автора, то переходим к релизам определенного автора
      if (this.authorPermalink) {
        this.$router.push({ path: '/releases-archive', query: { author: this.authorPermalink }})
      } else {
        // Иначе просто переходим к релизам
        this.$router.push({ path: '/releases-archive'})
      }
    }
    
  },
}
</script>

<style scoped>
  .wrap {
    margin-top: 80px;
    width: 100%;
    min-height: 525px;
  }

  /* Обертка под релизы */
  .releases-wrap {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  .release-item:not(:nth-child(4))  {
    margin-right: 26px;
  }

</style>

