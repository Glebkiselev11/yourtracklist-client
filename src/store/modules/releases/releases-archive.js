import axios from 'axios'

// Модуль через который мы получаем список релизов, для архива
export default {
  actions: {
    // Получает 9 релизов с базы
    async getReleases({commit, getters}) {

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
        }} = await axios.post('/api/get-release', {
          sortingReleases, 
          tags, 
          pageSize, 
          pageNum, 
          authorPermalink, 
          minTracksOfReleases, 
          maxTracksOfReleases,
        })

        // Вносим релизы
        commit('setReleases', releases)
        // И количество найденых релизов
        commit('setCount', count)
        // И количество страниц пагинации
        commit('setPageCount', pageCount)
        // Устанавливаем возможные теги для релизов
        commit('setReleasesTags', releasesTags)
        // Вносим минимальное и максимальное кол-во треков в выбранных релизах
        commit('setMinTracksOfReleases', minTracks)
        commit('setMaxTracksOfReleases', maxTracks)

        // И если мы получали релизы для определнного автора, то ставим в стор его локальное имя
        if (authorPermalink) {
          // Передаем в метод, который лежит в authors/index.js массив авторов (потому что у релиза может быть несколько авторов) первого релиза
          // И пермалинк автора, который нас интересует, чтобы по нему достать локальное имя автора
          commit('setLocalNameAuthor', { authors : releases[0].authors,  authorPermalink})
          // Информация о том, есть ли видео у автора, для которого мы запрашивали релизы
          commit('setThereIsVideos', thereIs)
        }
        
      } catch (error) {
        console.log(error)
      }
    }
  },
  mutations: {
    setReleases(s, releases) {
      s.releases = releases
    },
    clearReleases(s) {
      s.releases = undefined
    },

    setSortingReleases(s, sorting) {
      s.sortingReleases = sorting
    },
    clearSortingReleases(s) {
      s.sortingReleases = undefined
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
      s.authorPermalinkForReleases = undefined
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
      s.minTracksOfReleases = undefined
    },

    setMaxTracksOfReleases(s, max) {
      s.maxTracksOfReleases = max
    },
    clearMaxTracksOfReleases(s) {
      s.maxTracksOfReleases = undefined
    }


  },
  
  state: {
    releases: undefined, // релизы одной страницы пагинации, у нас там пока только 9 релизов на одной страница, возможно в будущем
    sortingReleases: undefined, // Тип сортировки, которую используем
    selectTagsForReleases: [], // Теги которые используем при получение релизов
    releasesTags: undefined, // Теги которые доступны для выбора в релизах в определенном фильтре или для определенного автора( то бишь не показываем лишнее)
    minTracksOfReleases: undefined, // Минимальное количество треков в релизах
    maxTracksOfReleases: undefined, // Максимальное количество треков в релизах
    authorPermalinkForReleases: undefined, // Пермалинк автора, для которого мы ищем релизы
    thereIsVideos: false, // Информация, есть ли видео для автора, для которого мы ищем релизы
  },

  getters: {
    minTracksOfReleases: s => s.minTracksOfReleases,
    maxTracksOfReleases: s => s.maxTracksOfReleases,
    releasesTags: s => s.releasesTags,
    releases: s => s.releases,
    sortingReleases: s => s.sortingReleases,
    selectTagsForReleases: s => s.selectTagsForReleases,
    authorPermalinkForReleases: s => s.authorPermalinkForReleases,
    thereIsVideos: s => s.thereIsVideos,
    
  }
}