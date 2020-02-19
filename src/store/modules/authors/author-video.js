// В этом модуле храним 4 последних видео записи автора
export default {
  state: {
    fourLastVideosForAuthor: undefined, // Последние четыре видео для автора
    videosCountForAuthor: 0, // Информация о том, сколько видео у автора всего, чтобы если их 4 или меньше не показывать кнопку "показать больше"
  },
  
  getters: {
    fourLastVideosForAuthor: s => s.fourLastVideosForAuthor,
    videosCountForAuthor: s => s.videosCountForAuthor,
  },
  
  mutations: {
    setFourLastVideosForAuthor(s, videos) {
      s.fourLastVideosForAuthor = videos
    },
    clearFourLastVideosForAuthor(s) {
      s.fourLastVideosForAuthor = undefined
    },

    setVideosCountForAuthor(s, count) {
      s.videosCountForAuthor = count
    },
    clearVideosCountForAuthor(s) {
      s.videosCountForAuthor = 0
    },
  },

  
}