import axios from 'axios'

// Основной модуль, под поиск по сайту
export default {
  actions: {
    async submitSearchQuery({commit}, searchQuery) {
      
      try {
        const {data : {
          releases, 
          videos,
          authors, 
          releasesCount, // Кол-во всего найденых релизов
          videosCount, // кол-во всего найденых видеозаписей
        }} = await axios.post('/api/search-query', {searchQuery})

        commit('setSearchReleases', releases)
        commit('setSearchVideos', videos)
        commit('setSearchAuthors', authors)
        commit('setSearchReleasesCount', releasesCount)
        commit('setSearchVideosCount', videosCount)

        console.log(releases, videos, authors, releasesCount, videosCount)

      } catch (error) {
        console.log(error)
      }
    }

  },
  mutations: {
    setSearchReleases(s, releases) {
      s.searchReleases = releases
    },
    clearSearchReleases(s) {
      s.searchReleases = null
    },

    setSearchReleasesCount(s, releasesCount) {
      s.searchReleasesCount = releasesCount
    },
    clearSearchReleasesCount(s) {
      s.searchReleasesCount = 0
    },

    setSearchVideos(s, videos) {
      s.searchVideos = videos
    },
    clearSearchVideos(s) {
      s.searchVideos = null
    },

    setSearchVideosCount(s, videosCount) {
      s.searchVideosCount = videosCount
    },
    clearSearchVideosCount(s) {
      s.searchVideosCount = 0
    },

    setSearchAuthors(s, authors) {
      s.searchAuthors = authors
    },
    clearSearchAuthors(s) {
      s.searchAuthors = null
    },

  },
  state: {
    searchReleases: null, // 3 Найденых релиза
    searchReleasesCount: 0, // Кол-во найденых релизов всего (то что выше это только то что показываем)
    searchVideos: null, // 3 Найденых видео
    searchVideosCount: 0, // Кол-во найденхы видео всего
    searchAuthors: null, // Найденые автора, их мы пока без ограничния показываем всех найденых
  },
  getters: {
    searchReleases: s => s.searchReleases,
    searchReleasesCount: s => s.searchReleasesCount,
    searchVideos: s => s.searchVideos,
    searchVideosCount: s => s.searchVideosCount,
    searchAuthors: s => s.searchAuthors,
  }
}