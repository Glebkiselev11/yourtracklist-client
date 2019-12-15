import axios from 'axios'

// Модуль через который мы получаем список релизов, для архива
export default {
  actions: {
    // Получает пока 9 релизов с базы
    async getReleases({commit, getters}) {

      // Вытаскиваем из стора метод сортировки релиза
      // Теги и количество отображаемых на одной странице записей
      const {pageSize, sortingReleases, pageNum , releasesForAuthor, selectTagsForReleases: tags} = getters

      try {
        const {data : {releases, count, pageCount, tags : releasesTags}} = await axios.post('/api/get-release', {sortingReleases, tags, pageSize, pageNum, releasesForAuthor})

        // Вносим релизы
        commit('setReleases', releases)

        // И количество найденых релизов
        commit('setCount', count)

        // И количество страниц пагинации
        commit('setPageCount', pageCount)

        // Устанавливаем возможные теги для релизов
        console.log(releasesTags)
        commit('setReleasesTags', releasesTags)

        // И если мы получали релизы для определнного автора, то ставим в стор его локальное имя
        if (releasesForAuthor) {
          commit('setLocalNameAuthorForRelease', { releases,  releasesForAuthor})
        }
        
      } catch (error) {
        console.log(error)
      }
    }
  },
  mutations: {
    setReleases(state, releases) {
      state.releases = releases
    },

    setSortingReleases(state, sorting) {
      state.sortingReleases = sorting
    },

    setReleasesTags(state, tags) {
      state.releasesTags = tags
    },

    setSelectTagsForReleases(state, tags) {
      if (typeof tags === 'string') {
        state.selectTagsForReleases.push(tags)
      } else if (typeof tags === 'object'){
        state.selectTagsForReleases = tags
      }
    },

    setReleasesForAuthor(state, author) {
      state.releasesForAuthor = author
    },

    // Вычисляет локальное имя для автора
    // releases - релизы которые мы получили с бэкенда, для конкретного автора
    // releasesForAuthor - permalink конкретного автора, в этом методе мы должны будем вытащить локальное имя для автора,
    // чтобы установить его в заголовок страницы
    setLocalNameAuthorForRelease(state, { releases,  releasesForAuthor}) {
      const authors = releases[0].authors
      // Проходимся циклом, потому что у релиза может быть несколько авторов, собственно для этого этот метод и был нужен
      for (let i = 0; i < authors.length; i++) {
        // Находим нужного артиста, для которого мы искали релизы
        if (authors[i]['permalink'] === releasesForAuthor) {
          // И устанавливаем в стейт его локальное имя (оригинальное, может быть на любом языке)
          state.localNameAuthorForRelease = authors[i]['name']
        }
      }
    },

    clearLocalNameAuthorForRelease(state) {
      state.localNameAuthorForRelease = undefined
    },

    clearReleases(state) {
      state.releases = undefined
    },

    clearSortingReleases(state) {
      state.sortingReleases = undefined
    },

    clearSelectTagsForReleases(state) {
      state.selectTagsForReleases = []
    },

    clearReleasesForAuthor(state) {
      state.releasesForAuthor = undefined
    }
  },
  state: {
    releases: undefined, // релизы одной страницы пагинации, у нас там пока только 9 релизов на одной страница, возможно в будущем
    sortingReleases: undefined, // Тип сортировки, которую используем
    selectTagsForReleases: [], // Теги которые используем при получение релизов
    releasesTags: undefined, // Теги которые доступны для выбора в релизах в определенном фильтре или для определенного автора( то бишь не показываем лишнее)
    releasesForAuthor: undefined, // Релизы конкретного атвора
    localNameAuthorForRelease: undefined, // Локальное название автора, для которого мы ищем релизы
  },
  getters: {
    releasesTags: state => state.releasesTags,
    releases: state => state.releases,
    sortingReleases: state => state.sortingReleases,
    selectTagsForReleases: state => state.selectTagsForReleases,
    releasesForAuthor: state => state.releasesForAuthor,
    localNameAuthorForRelease: state => state.localNameAuthorForRelease
  }
}