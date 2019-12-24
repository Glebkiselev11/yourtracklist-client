<template>
  <!-- Компонент одного итема предпросмотра карточки релиза, он много где используется и наверное будет общий и для миксов -->
  <div class="release-item">
    <!-- Передаем в компонент отвечающий за отображание тегов - массив с тегами -->
    <PrevTagsHeader
      link-to="/releases-archive/"
      
      :tags-array="release.tags"
    />

    <img class="release-image" :src="release.cover" alt="cover" @click="openRelease(release.authors, release.permalink)">
    <PrevInfo 
      :date="release.date"
      :name="release.name"
      :permalink="release.permalink"
      :authors="release.authors"
    />
  </div>
</template>

<script>
import PrevInfo from '@/components/app/PrevInfo.vue'
import PrevTagsHeader from '@/components/app/tags/PrevTagsHeader.vue'

export default {
  name: 'Release-prev-card-item',
  props: ['release'],
  components: {
    PrevInfo, PrevTagsHeader
  },
  methods: {
    // Открывает релиз (по клику на обложку)
    openRelease(authors, release) {

      // Возможно это костыль, но по сути у нас не бывает больше 4 авторов в одном релизе
      if (authors.length === 1) {
        this.$router.push(`/release/${authors[0]['permalink']}/${release}`)
      } else if (authors.length === 2) {
        this.$router.push(`/release/${authors[0]['permalink']}+${authors[1]['permalink']}/${release}`)
      } else if (authors.length === 3) {
        this.$router.push(`/release/${authors[0]['permalink']}+${authors[1]['permalink']}+${authors[2]['permalink']}/${release}`)
      } else {
        this.$router.push(`/release/${authors[0]['permalink']}+${authors[1]['permalink']}+${authors[2]['permalink']}+${authors[3]['permalink']}/${release}`)
      }
    },
  },
}
</script>

<style scoped>
  /* Карточка релиза */
  .release-item {
    width: 280px;
    height: 425px;
  }


  .release-image {
    cursor: pointer;
    width: 280px;
    height: 280px;
    margin-bottom: 16px;
  }

</style>

