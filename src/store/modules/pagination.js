export default {
  // здесь у нас хранятся данные о пагинации, она у нас общая для всего,
  // главное во время отсюда очищать данные
  state: {
    count: null, // Количество найденых релизов / видео / миксов
    pageSize: 9, // Количество релизов / миксов которое отображаем на 1 странице пагинации
    pageCount: null, // Количество страниц пагинации
    pageNum: 1, // Номер текущей страницы (по умолчанию 1)
  },

  getters: {
    pageCount: s => s.pageCount,
    pageSize: s => s.pageSize,
    count: s => s.count,
    pageNum: s => s.pageNum,
  },
  
  mutations: {
    setPageCount(s, pageCount) {
      s.pageCount = pageCount
    },

    // Количество найденых релизов / миксов
    setCount(s, count) {
      s.count = count
    },

    setPageNum(s, num) {
      s.pageNum = num
    },


    // Ниже методы для очистки стора
    clearPageCount(s) {
      s.pageCount = null
    },

    clearCount(s) {
      s.pageCount = null
    }
  },

  
}