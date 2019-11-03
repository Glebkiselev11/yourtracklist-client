<template>
  <!-- Компонент информации о релизе / видео которая распологается в предпросмотре (дата/ название и автор )-->
  <div class="wrap">
    <span class="release-date">{{date}}</span>
    <router-link :to="releaseName.href" class="release-name">{{releaseName.name}}</router-link>

    <p class="release-artist">by
      <!-- Здесь выводим ссылку на дискографию артиста, если он не один, то через цикл -->
      <router-link 
        v-for="(element, index) in this.releaseArtist"
        :key="index"
        :to="element.href"
        :class="element.href !== '/' ? 'active-link': 'not-active-link'"
      >{{element.artist}}</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Prev-info',
  props: ['date', 'releaseName', 'releaseArtist']
}
</script>

<style scoped>

  .release-date {
    font-size: 14px;
    font-weight: 400;
    display: block;
    margin-bottom: 8px;
  }

  .release-name {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .release-artist {
    font-size: 16px;
    font-weight: 500;
  }

  .active-link:hover {
    border-bottom: 1px solid black;
  }

  .not-active-link {
    cursor: default;
  }
</style>