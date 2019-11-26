import {mapGetters} from 'vuex'

// Миксин в котором вся логика о пагинации, ну почти вся, еще есть логика в pagination.js в сторе
// Там мы храним данные о пагинации
export default {
  // Как только прогружается пагинация, мы в стор устанавливаем страницу из query параметров, если там ничего нету, то ставим 1
  created() {
    this.$store.commit('setPageNum', this.$route.query.page || 1)
  },
  
  
  computed: {
    ...mapGetters(['pageCount', 'pageSize',]),

    // Это двухстороння привязка для v-model="pageNum" - забираем и устанавливаем значение из стора
    pageNum: {
      set(pageNum) {
        this.$store.state.pagination.pageNum = pageNum
        this.$router.push({ query: { ...this.$route.query, page: pageNum }})
      },

      get() {
        return this.$store.state.pagination.pageNum
      }
    }
  },
  // Чистим инфу о текущей пагинации (возможно оно и не нужно)
  beforeDestroy() {
    this.$store.commit('clearPageCount')
    this.$store.commit('clearCount')
  },


}