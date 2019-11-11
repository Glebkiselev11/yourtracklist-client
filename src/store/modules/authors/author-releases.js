// import axios from 'axios'

// Через этот модуль мы получаем релизы для автора по ID
export default {
  actions: {
    // Последние 4 релиза автора для предпоказа
    getFourLatesReleasesForAuthorById() {

    },

    // Основной метод получения релизов, определенного автора по ID
    getReleasesForAuthorById() {

    }
  },
  mutations: {
    
  },
  state: {
    fourLastReleasesForAuthor: undefined, // Последние четыре релиза для автора
    releasesForAuthor: undefined, // Одна страница пагинации релизов автора (9 релизов)
  },
  getters: {
    
  },
}