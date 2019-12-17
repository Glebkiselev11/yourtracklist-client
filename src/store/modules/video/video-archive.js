// Получаем видео записи с бэкенда
export default {
  actions: {
  },
  mutations: {
    setSortingVideo(state, sorting) {
      state.sortingVideo = sorting
    },
    clearSortingVideo(state) {
      state.sortingVideo = undefined
    },

    setSelectTagsForVideo(state, tags) {
      if (typeof tags === 'string') {
        state.selectTagsForVideo.push(tags)
      } else if (typeof tags === 'object'){
        state.selectTagsForVideo = tags
      }
    },

    clearSelectTagsForVideo(state) {
      state.selectTagsForVideo = []
    },

  },
  state: {
    selectTagsForVideo: [], // Теги которые используем при получение видео
    sortingVideo: undefined, // Тип сортировки видео
    video: undefined, // видео одной страницы пагинации
  },
  getters: {
    sortingVideo: s => s.sortingVideo,
    video: s => s.video
  },
}