<template>  
  <!-- Компонент релизов, который показывает 4 релиза, которые мы ему передаем как пропсы,
  используется на главной странице и в дискографии автора одновременно -->
  <div class="wrap">

    <!-- Верхняя шапка с заголовком и кнопкой -->
    <TopBar 
      title="Релизы"
      @click="routerTo"
      :count="this.count"
    />

    <!-- Обертка под релизы, который мы будем итерировать циклом -->
    <div class="releases-wrap">
      
      <!-- Итерируем карточку релиза -->
      <ReleaseItem 
        v-for="(release, index) of fourLatestReleases"
        :key="index"
        :release="release"
      />
      

    </div>
  </div>
</template>

<script>
import TopBar from '@/components/app/TopBar.vue'
import ReleaseItem from '@/components/app/music/ReleasePrevCartItem.vue'

export default {
  name: 'ReleaseArchivePrev',
  props: [
    'fourLatestReleases', // Четыре релиза (их может быть меньше, если например тут релизы для определенного автора а у автора всего их 3 например)
    // * Нижние пропсы нужны только в том случае когда мы этот компонент используем на странице автора
    'authorPermalink', // Ссылка на автора
    'count', // Сколько релизов всего у автора
  ],
  components: {
    TopBar, ReleaseItem
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

