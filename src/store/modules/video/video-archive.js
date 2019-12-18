import axios from 'axios'

// Модуль через который мы получаем список видео, для архива
export default {
  actions: {
    // Получает 9 видео с базы
    async getVideo({commit, getters}) {

      // Вытаскиваем из стора метод сортировки видео
      // Теги и количество отображаемых на одной странице записей
      const {pageSize, sortingVideo, pageNum , selectTagsForVideo: tags} = getters

      try {
        const {data : {videos, count, pageCount, tags : videosTags}} = await axios.post('/api/get-video', {sortingVideo, tags, pageSize, pageNum})

        commit('setVideos', videos)
        commit('setCount', count)
        commit('setPageCount', pageCount)
        commit('setVideosTags', videosTags)

      } catch (error) {
        
        console.log(error)
      }

    }
  },
  mutations: {
    setVideos(s, videos) {
      s.videos = videos
    },

    clearVideos(s) {
      s.videos = undefined
    },

    setSortingVideo(s, sorting) {
      s.sortingVideo = sorting
    },
    clearSortingVideo(s) {
      s.sortingVideo = undefined
    },

    setSelectTagsForVideo(s, tags) {
      if (typeof tags === 'string') {
        s.selectTagsForVideo.push(tags)
      } else if (typeof tags === 'object'){
        s.selectTagsForVideo = tags
      }
    },
    clearSelectTagsForVideo(s) {
      s.selectTagsForVideo = []
    },

    setVideosTags(s, tags) {
      s.videosTags = tags
    },

  },
  state: {
    videosTags: undefined, // Теги которые доступны для выбора в видео в определенном фильтре или для определенного автора( то бишь не показываем лишние теги, для которых ничего нет)
    selectTagsForVideo: [], // Теги которые используем при получение видео
    sortingVideo: undefined, // Тип сортировки видео
    videos: undefined, // видео записи одной страницы пагинации
  },
  getters: {
    videosTags: s => s.videosTags,
    selectTagsForVideo: s => s.selectTagsForVideo,
    sortingVideo: s => s.sortingVideo,
    videos: s => s.videos,
  },
}