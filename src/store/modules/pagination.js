export default {
  // здесь у нас хранятся данные о пагинации, она у нас общая для всего,
  // главное во время отсюда очищать данные
  mutations: {
    setPageCount(state, pageCount) {
      state.pageCount = pageCount
    },

    // Количество найденых релизов / миксов
    setCount(state, count) {
      state.count = count
    },

    setPageNum(state, num) {
      state.pageNum = num
    },


    // Ниже методы для очистки стора
    clearPageCount(state) {
      state.pageCount = undefined
    },

    clearCount(state) {
      state.pageCount = undefined
    }
  },

  state: {
    count: undefined, // Количество найденых релизов
    pageSize: 9, // Количество релизов / миксов которое отображаем на 1 странице пагинации
    pageCount: undefined, // Количество страниц пагинации
    pageNum: 1, // Номер текущей страницы (по умолчанию 1)
  },

  getters: {
    pageCount: state => state.pageCount,
    pageSize: state => state.pageSize,
    count: state => state.count,
    pageNum: state => state.pageNum,
  }
}