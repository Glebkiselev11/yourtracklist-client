import axios from 'axios'

// Модуль через который мы получаем список видео, для архива
export default {
  actions: {
    // Получает 9 видео с базы
    async getVideo({commit, getters}) {

      console.log(commit)
      // Вытаскиваем из стора метод сортировки видео
      // Теги и количество отображаемых на одной странице записей
      const {pageSize, sortingVideo, pageNum , selectTagsForVideo: tags} = getters

      try {
        const data = await axios.post('/api/get-video', {sortingVideo, tags, pageSize, pageNum})
        console.log(data)

      } catch (error) {
        
        console.log(error)
      }

    }
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
    video: s => s.video,
    selectTagsForVideo: s => s.selectTagsForVideo
  },
}