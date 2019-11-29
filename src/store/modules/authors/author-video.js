// В этом модуле храним 4 последних видео записи автора
export default {

  mutations: {
    setFourLastVideosForAuthor(state, videos) {
      state.fourLastVideosForAuthor = videos
    },

    clearFourLastVideosForAuthor(state) {
      state.fourLastVideosForAuthor = undefined
    }
  },
  state: {
    fourLastVideosForAuthor: undefined, // Последние четыре видео для автора
  },
  getters: {
    fourLastVideosForAuthor: state => state.fourLastVideosForAuthor,
  },
}