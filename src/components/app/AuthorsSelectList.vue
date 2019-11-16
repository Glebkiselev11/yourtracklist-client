<template>
  <!-- Инпут с списком возможных авторов, который у нас есть 
  в формах добаления релизов и видео -->
  <div class="input-item">
    <label for="authors">Автор(ы)</label>
    <select v-model="authors" id="authors" multiple>
      <option 
        v-for="(author, index) in authorsArray" 
        :key="index" 
        :value="author.permalink"
      >{{author.name}}</option>
    </select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Authors-select-list',
  data: () => ({
    authors: []
  }),
  computed: {
    ...mapGetters(['authorsArray'])
  },
  async mounted() {
    await this.$store.dispatch('getAuthors')
  },
  watch: {
    // Передает родителю выбранного автора
    authors(authors) {
      this.$emit('selected', authors)
    }
  },
}
</script>

