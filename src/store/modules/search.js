import axios from 'axios'
import errorHelper from '@/store/errorHelper'

// Основной модуль, под поиск по сайту
export default {
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

  actions: {
    async submitSearchQuery({commit, dispatch}, searchQuery) {
      
      try {
        const {data : {
          releases, 
          videos,
          authors, 
          releasesCount, // Кол-во всего найденых релизов
          videosCount, // кол-во всего найденых видеозаписей
        }} = await axios.post('/api/search-query', {searchQuery})

        commit('setSearchReleasesCount', releasesCount)
        commit('setSearchVideosCount', videosCount)

        // Пропускаем через обрамления тегами, букв / слов по которым мы искали
        dispatch('letterMark', { dataArray : authors, searchQuery, commitName : 'setSearchAuthors'})
        dispatch('letterMark', { dataArray : releases, searchQuery, commitName : 'setSearchReleases'})
        dispatch('letterMark', { dataArray : videos, searchQuery, commitName : 'setSearchVideos'})
        
        // Активируем окно результата, если что то найдено
        if (releasesCount || videosCount || authors.length) {
          commit('setSearchResult', 1) // 1 если что то найдено
        } else {
          commit('setSearchResult', 2) // 2 если ничего не было найдено
        }

      } catch (error) {
        throw new Error(errorHelper(error))
      }
    },

    // Добавление в название HTML теги выделяя нужные буквы которые использовались для поиска этого автора / релиза / видео
    // dataArray - массив объектов в котором мы дополняем тегами нужные буквы / слова
    // searchQuery - поисковой запрос, по которму мы выделяем нужные буквы / слова
    // commitName - название мутации через которую мы помещаем в нужный стейт
    letterMark({commit}, { dataArray, searchQuery, commitName } ) {
      const reg = new RegExp(searchQuery, 'gi');

      for (let i = 0; i < dataArray.length; i++) {
        const name = dataArray[i]['name']

        // Находит буквы / слова и окрашивает их в желтый цвет
        dataArray[i]['name'] = name.replace(reg, "<mark>" + '$&' + "</mark>")
      }

      commit(commitName, dataArray)
    }

  },
  
  
}