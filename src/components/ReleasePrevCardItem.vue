<template>
  <!-- Компонент одного итема предпросмотра карточки релиза -->
  <div class="release-item">
    <!-- Передаем в компонент отвечающий за отображание тегов - массив с тегами -->
    <TagsPrevHeader
      link-to="/releases-archive/"
      :tags-array="release.tags"
      @close="$emit('close')"
    />

    <img 
      :src="release.prev_cover" 
      alt="cover"
      class="release-image"  
      @click="openRelease(release.authors, release.permalink)"
    >

    <PrevInfo 
      :date="release.date"
      :name="release.name"
      :permalink="release.permalink"
      :authors="release.authors"
      :type="'release'"
      @close="$emit('close')"
    />
  </div>
</template>

<script>
import PrevInfo from '@/components/AppPrevInfo.vue'
import TagsPrevHeader from '@/components/TagsPrevHeader.vue'

export default {
  name: 'ReleasePrevCardItem',
  
  components: {
    PrevInfo, 
    TagsPrevHeader,
  },

  props: {
    release: Object, 
  },
  
  methods: {
    // Открывает релиз (по клику на обложку)
    openRelease(authors, release) {

      // Эмитим (для меню поиска) чтобы при переходе в альбом закрыть страницу поиска
      this.$emit('close')

      let pushString = '/release/'

      for (let i = 0; i < authors.length; i++) {
        const author = authors[i]
        
        // Собираем строку из авторов, чтобы на выходе у нас получилось cat-soup+drip-133, если автора два
        pushString += i < 1 ? `${author['permalink']}` : `+${author['permalink']}`
      }

      // И отправляем результат в роутер (на выходе получиться так: '/release/cat-soup+drip-133/loss-prevention')
      this.$router.push(`${pushString}/${release}`)
      
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
    margin-bottom: 8px;
  }

</style>

