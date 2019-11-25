export default {
  // data() {
  //   return {
  //     pageNum: +this.$route.query.page || 1, // Здесь если в квери параметрах есть уже страница, то ставит ее
  //     pageSize: 0, // Размер отоброжаемых полей таблицы
  //     pageCount: 0, // Сколько всего страницы
  //   }
  // },
  methods: {
    // Этот метод вызывается когда жмется какая-то кнопка в пагинации
    // собственно он и отвечает за то, чтобы загружать с бекенда нужную страницу
    async pageChangeHandler(pageNum) {
      const tableName = this.$store.state.grid.tableName
      await this.$store.dispatch('getTableForPagination', { tableName, pageNum })

      // Строка ниже нужна, чтобы добавить страницу в квери параметр 
      // (нужно, чтобы по ссылке можно было перейти к нужной странице)
      this.$router.push(`${this.$route.path}?page=${pageNum}`)
      this.pageNum = pageNum || 1

    },
    // // Принимает данные о пагинации с $store
    // getPaginationSetting() {
    //   const {pageCount, pageNum, pageSize} = this.$store.getters.getPaginationSetting
    //   // Прежде чем добавлять их в местные переменные мы их все преводим к числам
    //   this.pageSize = +pageSize
    //   this.pageCount = +pageCount
    //   this.pageNum = +pageNum
    // }
  }

}