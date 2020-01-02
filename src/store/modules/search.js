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

        // Активируем окно результата, если что то найдено
        if (releasesCount || videosCount || authors.length) {
          commit('setSearchResult', 1) // 1 если что то найдено
        } else {
          commit('setSearchResult', 2) // 2 если ничего не было найдено
        }

        // console.log(releases, videos, authors, releasesCount, videosCount)

      } catch (error) {
        console.log(error)
      }
    }

  },
  mutations: {
    // Переключатели для модального окна
    openSearchWindow(s) {
      s.searchWindow = true
    },
    closeSearchWindow(s) {
      s.searchWindow = false
    },

    // num = 1 Что то найдено, показываем компонент куда выводим результаты
    // num = 2 Ничего не было найдено по поисковому запросу (показываем сообщение что ничего не найдено)
    setSearchResult(s, num) {
      s.searchResult = num
    },
    clearSearchResult(s) {
      s.searchResult = 0
    },

    setSearchReleases(s, releases) {
      s.searchReleases = releases
    },
    clearSearchReleases(s) {
      s.searchReleases = null
    },

    setSearchReleasesCount(s, releasesCount) {
      console.log(releasesCount)
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
      console.log(videosCount)
      s.searchVideosCount = videosCount
    },
    clearSearchVideosCount(s) {
      s.searchVideosCount = 0
    },

    setSearchAuthors(s, authors) {
      console.log(authors.length)
      s.searchAuthors = authors
    },
    clearSearchAuthors(s) {
      s.searchAuthors = null
    },

  },
  state: {
    searchWindow: false, // Отвечает за показ модального окна поиска
    searchResult: 0, // Отвечает за то найдено ли что то или нет
    searchReleases: null, // 3 Найденых релиза
    searchReleasesCount: 0, // Кол-во найденых релизов всего (то что выше это только то что показываем)
    searchVideos: null, // 3 Найденых видео
    searchVideosCount: 0, // Кол-во найденхы видео всего
    searchAuthors: null, // Найденые автора, их мы пока без ограничния показываем всех найденых
  },
  getters: {
    searchWindow: s => s.searchWindow,
    searchResult: s => s.searchResult,
    searchReleases: s => s.searchReleases,
    searchReleasesCount: s => s.searchReleasesCount,
    searchVideos: s => s.searchVideos,
    searchVideosCount: s => s.searchVideosCount,
    searchAuthors: s => s.searchAuthors,
    
  }
}