import axios from 'axios'
import authorReleases from './authorReleases'
import authorVideo from './authorVideo'

// Основной модуль, под Авторов
export default {
  modules: {
    authorReleases, 
    authorVideo
  },

  state: {
    localNameAuthor: null, // Локальное название автора, для которого мы ищем релизы / видео (нужно в архивах в заголовке)
    authorInfo: null, // Информация об авторе, котору мы выводим на страницу authorPage
  },

  getters: {
    authorInfo(s) {
      return s.authorInfo
    },
    localNameAuthor: state => state.localNameAuthor
  },

  mutations: {
    setAuthorInfo(state, data) {
      state.authorInfo = data
    },
    // При закрытие окна автора мы чистим инфу из стейта
    clearAuthorInfo(state) {
      state.authorInfo = null
    },

    // Вычисляет локальное имя для автора
    // authors - массив авторов первого релиза / видео
    // authorPermalink - пермалинк конкретного автора, в этом методе мы должны будем вытащить локальное имя для автора,
    // чтобы установить его в заголовок страницы
    setLocalNameAuthor(state, { authors,  authorPermalink}) {
      // Проходимся циклом, потому что у релиза/видео может быть несколько авторов, собственно для этого этот метод и был нужен
      for (let i = 0; i < authors.length; i++) {
        // Находим нужного артиста, для которого мы искали релизы
        if (authors[i]['permalink'] === authorPermalink) {
          // И устанавливаем в стейт его локальное имя (оригинальное, может быть на любом языке)
          state.localNameAuthor = authors[i]['name']
        }
      }
    },
    clearLocalNameAuthor(state) {
      state.localNameAuthor = null
    },
  },

  actions: {
    // Получаем автора по ID, а так же 4 последних его релиза и 4 последних его видео
    async getAuthorById({commit}, permalink) {
      const {data : {author, releases, releasesCount, videos, videosCount}} = await axios.post('/api/get-author-by-id', { permalink })

      commit('setAuthorInfo', author)

      commit('setFourLastReleasesForAuthor', releases)
      commit('setReleasesCountForAuthor', releasesCount)

      commit('setFourLastVideosForAuthor', videos)
      commit('setVideosCountForAuthor', videosCount)
    },

    // Получаем всех возможных авторов из нашей базы (а именно их имена и пермалинки)
    async getAuthors() {
      try {
        const {data} = await axios.post('/api/get-authors-list')
        return data // И данные возвращаем в компонент (AuthorSelectList.vue)
      } catch (error) {
        console.log('Ошибка в запросе /api/get-authors-list', error)
      }
    }
  },
  
  
}