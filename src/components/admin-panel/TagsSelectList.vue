<template>
  <!-- Компонент для выбора возможных тегов (используется в админ панелях, для добавления релиза/видео -->
  <div class="input-item">
    <!-- Здесь мы вводим нужный тег в поиск -->
    <input 
      type="text" 
      placeholder="Теги"
      list="tagslist" 
      v-model="tag" 
      @change="setTag"
    >

    <!-- Удобный поиск тегов в списке -->
    <datalist id="tagslist" >
      <option 
        v-for="(tag, index) in tags" 
        :key="index" 
        :value="tag.name"
      ></option>
    </datalist>

    <div class="tags-chips-wrap">
      <!-- Сюда мы чипсами будем выводить выбранные теги -->
      <Chip
        v-for="(tag, index) in enterTags" 
        :key="index"
        :chip="tag.name"
        :buttonTitleMessage="'Убрать тег'"
        @destroy="clearTag(index)"
      />

    </div>
    
  </div>
</template>

<script>
import Chip from '@/components/app/Chip.vue'

export default {
  name: 'Tags-select-list',
  data: () => ({
    enterTags: [], // Массив выбранных тегов
    tag: '', // Выбранный тег
    tags: null, // Возможные теги (которые у нас есть в базе)
  }),
  components: {
    Chip
  },
  methods: {
    // Вносим выбранный тег в массив выбранных тегов :)
    setTag() {
      // Находим в нашем массиве возможных тегов по названию
      const findTag = this.tags.find((e) => {
        if( e.name === this.tag) 
          return e
        }) 

      this.enterTags.push(findTag) // И вносим результат в массив выбранных авторов
      
      // Удаляем из массива возможных тегов, тот тег который выбрали
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i].name === this.tag) {
          this.tags.splice(i, 1)
          break;
        }
      }

      this.tag = '' // После очищаем выбранный тег
    },
    // Удаляем выбранный тег
    clearTag(index) {
      this.tags.push(this.enterTags[index]) // Сначала возвращаем в массив возможных тегов
      this.enterTags.splice(index, 1) // А после удаляем из выбранных тегов
    }
  },

  // Получаем список возможных тегов
  async created() {
    // И вношу их в локальную переменную
    this.tags = await this.$store.dispatch('getTags')
  },
  watch: {
    // Передает родителю выбранные теги
    enterTags(enterTags) {
      this.$emit('selected', enterTags)
    }
  },

}
</script>

<style scoped>
  .tags-chips-wrap {
    margin-top: 2px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

</style>