import axios from 'axios'

// Модуль через который мы получаем список видео, для архива
export default {
  actions: {
    // Получает 9 видео с базы
    async getVideo({commit, getters}) {

      // Вытаскиваем из стора метод сортировки видео
      // Теги и количество отображаемых на одной странице записей
      const {pageSize, sortingVideo, pageNum , selectTagsForVideo: tags, authorPermalinkForVideos: authorPermalink} = getters

      try {
        const {data : {videos, count, pageCount, tags : videosTags}} = await axios.post('/api/get-video', {sortingVideo, tags, pageSize, pageNum, authorPermalink})

        commit('setVideos', videos)
        commit('setCount', count)
        commit('setPageCount', pageCount)
        commit('setVideosTags', videosTags)


        // И если мы получали релизы для определнного автора, то ставим в стор его локальное имя
        if (authorPermalink) {
          // Передаем в метод, который лежит в authors/index.js массив авторов (потому что у релиза может быть несколько авторов) первого релиза
          // И пермалинк автора, который нас интересует, чтобы по нему достать локальное имя автора
          commit('setLocalNameAuthor', { authors : videos[0].authors,  authorPermalink})
        }

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

    setAuthorPermalinkForVideos(s, author) {
      s.authorPermalinkForVideos = author
    },

    clearAuthorPermalinkForVideos(s) {
      s.authorPermalinkForVideos = undefined
    }

  },
  state: {
    videosTags: undefined, // Теги которые доступны для выбора в видео в определенном фильтре или для определенного автора( то бишь не показываем лишние теги, для которых ничего нет)
    selectTagsForVideo: [], // Теги которые используем при получение видео
    sortingVideo: undefined, // Тип сортировки видео
    videos: undefined, // видео записи одной страницы пагинации
    authorPermalinkForVideos: undefined, // Пермалинк автора, для которого мы ищем видео
  },
  getters: {
    videosTags: s => s.videosTags,
    selectTagsForVideo: s => s.selectTagsForVideo,
    sortingVideo: s => s.sortingVideo,
    videos: s => s.videos,
    authorPermalinkForVideos: s => s.authorPermalinkForVideos,
  },
}