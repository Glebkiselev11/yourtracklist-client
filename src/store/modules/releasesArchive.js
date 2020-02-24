import axios from 'axios'

// Модуль через который мы получаем список релизов, для архива
export default {
  state: {
    releases: null, // релизы одной страницы пагинации, у нас там пока только 9 релизов на одной страница, возможно в будущем
    sortingReleases: 'new', // Тип сортировки, которую используем
    selectTagsForReleases: [], // Теги которые используем при получение релизов
    releasesTags: null, // Теги которые доступны для выбора в релизах в определенном фильтре или для определенного автора( то бишь не показываем лишнее)
    minTracksOfReleases: null, // Минимальное количество треков в релизах
    maxTracksOfReleases: null, // Максимальное количество треков в релизах
    rangeNumberOfTracks: null, // Диапазон доступного кол-ва треков в релизах
    authorPermalinkForReleases: null, // Пермалинк автора, для которого мы ищем релизы
    thereIsVideos: false, // Информация, есть ли видео для автора, для которого мы ищем релизы
    searchQueryForReleases: null, // Поисковой запрос для релизов, который мы получаем из квери параметров
  },

  getters: {
    releases: s => s.releases,
    sortingReleases: s => s.sortingReleases,
    selectTagsForReleases: s => s.selectTagsForReleases,
    releasesTags: s => s.releasesTags,
    minTracksOfReleases: s => s.minTracksOfReleases,
    maxTracksOfReleases: s => s.maxTracksOfReleases,
    rangeNumberOfTracks: s => s.rangeNumberOfTracks,
    authorPermalinkForReleases: s => s.authorPermalinkForReleases,
    thereIsVideos: s => s.thereIsVideos,
    searchQueryForReleases: s => s.searchQueryForReleases,
  },

  mutations: {
    setReleases(s, releases) {
      s.releases = releases
    },
    clearReleases(s) {
      s.releases = null
    },

    setSortingReleases(s, sorting) {
      s.sortingReleases = sorting || 'new'
    },
    clearSortingReleases(s) {
      s.sortingReleases = 'new'
    },

    setReleasesTags(s, tags) {
      s.releasesTags = tags
    },

    setSelectTagsForReleases(s, tags) {
      if (typeof tags === 'string') {
        s.selectTagsForReleases.push(tags)
      } else if (typeof tags === 'object'){
        s.selectTagsForReleases = tags
      }
    },
    clearSelectTagsForReleases(s) {
      s.selectTagsForReleases = []
    },


    setAuthorPermalinkForReleases(s, author) {
      s.authorPermalinkForReleases = author
    },
    clearAuthorPermalinkForReleases(s) {
      s.authorPermalinkForReleases = null
    },

    setThereIsVideos(s, thereIs) {
      s.thereIsVideos = thereIs
    },
    clearThereIsVideos(s) {
      s.thereIsVideos = false
    },

    setMinTracksOfReleases(s, min) {
      s.minTracksOfReleases = min
    },
    clearMinTracksOfReleases(s) {
      s.minTracksOfReleases = null
    },

    setMaxTracksOfReleases(s, max) {
      s.maxTracksOfReleases = max
    },
    clearMaxTracksOfReleases(s) {
      s.maxTracksOfReleases = null
    },

    setRangeNumberOfTracks(s, range) {
      s.rangeNumberOfTracks = range
    },
    clearRangeNumberOfTracks(s) {
      s.rangeNumberOfTracks = null
    },

    setSearchQueryForReleases(s, search) {
      s.searchQueryForReleases = search
    },
    clearSearchQueryForReleases(s) {
      s.searchQueryForReleases = null
    },

  },

  actions: {
    // Получает 9 релизов с базы
    async getReleases({commit, getters, dispatch}) {

      // Вытаскиваем из стора метод сортировки релиза
      // Теги и количество отображаемых на одной странице записей
      const {
        pageSize, 
        sortingReleases, 
        pageNum, 
        authorPermalinkForReleases : authorPermalink, 
        selectTagsForReleases: tags,
        minTracksOfReleases, 
        maxTracksOfReleases,
        searchQueryForReleases,
      } = getters

      try {
        const {data : {
          releases, 
          count, 
          pageCount, 
          tags : releasesTags, 
          thereIs, 
          minTracks,
          maxTracks,
          rangeNumberOfTracks,
        }} = await axios.post('/api/get-release', {
          sortingReleases, 
          tags, 
          pageSize, 
          pageNum, 
          authorPermalink, 
          minTracksOfReleases, 
          maxTracksOfReleases,
          searchQueryForReleases,
        })

        // Вносим полученные релизы (если есть поисковой запрос, то предварительно обрамляем названия тегами)
        if (searchQueryForReleases) {
          dispatch('letterMark', { dataArray : releases, searchQuery: searchQueryForReleases, commitName : 'setReleases'})
        } else {
          commit('setReleases', releases)
        }

        commit('setCount', count) // И количество найденых релизов
        commit('setPageCount', pageCount) // И количество страниц пагинации
        commit('setReleasesTags', releasesTags) // Устанавливаем возможные теги для релизов
        
        // Вносим минимальное и максимальное кол-во треков в выбранных релизах
        commit('setMinTracksOfReleases', minTracks)
        commit('setMaxTracksOfReleases', maxTracks)
        commit('setRangeNumberOfTracks', rangeNumberOfTracks)

        // И если мы получали релизы для определнного автора, то ставим в стор его локальное имя
        if (authorPermalink) {
          // Передаем в метод, который лежит в authors/index.js массив авторов (потому что у релиза может быть несколько авторов) первого релиза
          // И пермалинк автора, который нас интересует, чтобы по нему достать локальное имя автора
          commit('setLocalNameAuthor', { authors : releases[0].authors,  authorPermalink})
          // Информация о том, есть ли видео у автора, для которого мы запрашивали релизы
          commit('setThereIsVideos', thereIs)
        }
        
      } catch (error) {
        console.log('Ошибка в получении релизов с бэкенда / Error on getting releases from backend', error)
      }
    }
  },
  
  
  
}