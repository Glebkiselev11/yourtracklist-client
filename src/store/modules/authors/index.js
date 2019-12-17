import axios from 'axios'
import authorReleases from './author-releases'
import authorVideo from './author-video'

// Основной модуль, под Авторов
export default {
  actions: {
    // Получаем автора по ID, а так же 4 последних его релиза и 4 последних его видео
    async getAuthorById({commit}, permalink) {
      const {data : {author, releases, videos}} = await axios.post('/api/get-author-by-id', { permalink })

      commit('setAuthorInfo', author)
      commit('setFourLastReleasesForAuthor', releases)
      commit('setFourLastVideosForAuthor', videos)
    },

    // Получаем всех авторов (а именно их имена и пермалинки)
    async getAuthors({commit}) {
      const {data} = await axios.post('/api/get-authors-list')

      commit('setAuthors', data)
    }
  },
  mutations: {
    setAuthorInfo(state, data) {
      state.authorInfo = data
    },

    setAuthors(state, data) {
      state.authorsArray = data
    },

    // Вычисляет локальное имя для автора
    // releases - релизы которые мы получили с бэкенда, для конкретного автора
    // releasesForAuthor - permalink конкретного автора, в этом методе мы должны будем вытащить локальное имя для автора,
    // чтобы установить его в заголовок страницы
    // ! Нужно будет отрефакторить этот код, как только у нас появться видео записи для конкретного автора
    setLocalNameAuthor(state, { releases,  releasesForAuthor}) {
      const authors = releases[0].authors
      // Проходимся циклом, потому что у релиза может быть несколько авторов, собственно для этого этот метод и был нужен
      for (let i = 0; i < authors.length; i++) {
        // Находим нужного артиста, для которого мы искали релизы
        if (authors[i]['permalink'] === releasesForAuthor) {
          // И устанавливаем в стейт его локальное имя (оригинальное, может быть на любом языке)
          state.localNameAuthor = authors[i]['name']
        }
      }
    },

    clearLocalNameAuthor(state) {
      state.localNameAuthor = undefined
    },

    // При закрытие окна автора мы чистим инфу из стейта
    clearAuthorInfo(state) {
      state.authorInfo = undefined
    }
  },
  state: {
    localNameAuthor: undefined, // Локальное название автора, для которого мы ищем релизы / видео (нужно в архивах в заголовке)
    authorInfo: undefined, // Информация об авторе, котору мы выводим на страницу authorPage
    authorsArray: undefined, // Массив всех авторов которых мы нашли, содержит в себе только название и пермалинки
  },
  getters: {
    authorInfo(s) {
      return s.authorInfo
    },
    authorsArray(s) {
      return s.authorsArray
    },

    localNameAuthor: state => state.localNameAuthor
  },

  modules: {
    authorReleases, authorVideo

  }
}