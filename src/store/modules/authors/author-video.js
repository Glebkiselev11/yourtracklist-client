// Через этот модуль получаем видео записи которые относятся к определенному автору
export default {
  actions: {
    // Последние 4 видео записи автора для предпоказа
    getFourLatesVideoForAuthorById() {

    },

    // Основной метод получения видео записей, определенного автора по ID
    getVideoForAuthorById() {

    }
  },
  mutations: {
    
  },
  state: {
    fourLastVideoForAuthor: undefined, // Последние четыре видео для автора
    videoForAuthor: undefined, // Одна страница пагинации видео автора (9 релизов)
  },
  getters: {
    fourLastVideoForAuthor: state => state.fourLastVideoForAuthor,
    videoForAuthor: state => state.videoForAuthor
  },
}