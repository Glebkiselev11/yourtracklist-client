import axios from 'axios'

// Модуль через который мы получаем список видео, для архива
export default {
  actions: {
    // Получает 9 видео с базы
    async getVideo({commit, getters}) {

      // Вытаскиваем из стора метод сортировки видео
      // Теги и количество отображаемых на одной странице записей
      const { 
        pageSize, 
        sortingVideo, 
        pageNum, 
        selectTagsForVideo: tags, 
        authorPermalinkForVideos: authorPermalink,
        searchQueryForVideo,
      
      } = getters

      try {
        const {data : { 
          videos, 
          count, 
          pageCount, 
          tags : videosTags, 
          thereIs,
        }} = await axios.post('/api/get-video', { 
          sortingVideo, 
          tags, 
          pageSize, 
          pageNum, 
          authorPermalink,
          searchQueryForVideo,
        })

        console.log(videos)
        commit('setVideos', videos)
        commit('setCount', count)
        commit('setPageCount', pageCount)
        commit('setVideosTags', videosTags)

        // И если мы получали видео для определнного автора, то ставим в стор его локальное имя
        if (authorPermalink) {
          // Передаем в метод, который лежит в authors/index.js массив авторов (потому что у видео может быть несколько авторов) первого видео
          // И пермалинк автора, который нас интересует, чтобы по нему достать локальное имя автора
          commit('setLocalNameAuthor', { authors : videos[0].authors,  authorPermalink})
          
          // Информация о том, есть ли релизы у автора, для которого мы запрашивали видео
          commit('setThereIsReleases', thereIs)
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
      s.videos = null
    },

    setSortingVideo(s, sorting) {
      s.sortingVideo = sorting || "new"
    },
    clearSortingVideo(s) {
      s.sortingVideo = "new"
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
      s.authorPermalinkForVideos = null
    },

    setThereIsReleases(s, thereIs) {
      s.thereIsReleases = thereIs
    },

    clearThereIsReleases(s) {
      s.thereIsReleases = false
    },

    setSearchQueryForVideo(s, search) {
      s.searchQueryForVideo = search
    },
    clearSearchQueryForVideo(s) {
      s.searchQueryForVideo = null
    },

  },
  state: {
    videosTags: null, // Теги которые доступны для выбора в видео в определенном фильтре или для определенного автора( то бишь не показываем лишние теги, для которых ничего нет)
    selectTagsForVideo: [], // Теги которые используем при получение видео
    sortingVideo: "new", // Тип сортировки видео
    videos: null, // видео записи одной страницы пагинации
    authorPermalinkForVideos: null, // Пермалинк автора, для которого мы ищем видео
    thereIsReleases: false, // Информация, есть ли релизы для автора, для которого мы ищем видео
    searchQueryForVideo: null, // Поисковой запрос для видео, который мы получаем из квери параметров
  },
  getters: {
    videosTags: s => s.videosTags,
    selectTagsForVideo: s => s.selectTagsForVideo,
    sortingVideo: s => s.sortingVideo,
    videos: s => s.videos,
    authorPermalinkForVideos: s => s.authorPermalinkForVideos,
    thereIsReleases: s => s.thereIsReleases,
    searchQueryForVideo: s => s.searchQueryForVideo,
  },
}