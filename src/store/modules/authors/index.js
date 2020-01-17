import axios from 'axios'
import authorReleases from './author-releases'
import authorVideo from './author-video'

// Основной модуль, под Авторов
export default {
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

    // Получаем всех авторов (а именно их имена и пермалинки)
    async getAuthors({commit}) {
      const {data} = await axios.post('/api/get-authors-list')

      commit('setAuthorsArray', data)
    }
  },
  mutations: {
    setAuthorInfo(state, data) {
      state.authorInfo = data
    },
    // При закрытие окна автора мы чистим инфу из стейта
    clearAuthorInfo(state) {
      state.authorInfo = null
    },

    setAuthorsArray(state, data) {
      state.authorsArray = data
    },
    clearAuthorsArray(state) {
      state.authorsArray = null
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

    
    // Этот метод нужен для удаления из массива возможных авторов, того автора, которого мы выбрали уже, чтобы лишний раз он не мешался нам
    clearSelectedAuthor(s, selectPermalink) {
      for (let i = 0; i < s.authorsArray.length; i++) {
        if (s.authorsArray[i].permalink === selectPermalink) {
          s.authorsArray.splice(i, 1)
          break;
        }
      }
    },
    // А через этот метод мы возвращаем удаленного автора (если мы вдруг его выбрали случайно, 
    // а потом удалили из выбранных(ведь в методе выше мы его очищаем из возможных авторов, а тут вовзращаем обратно))
    returnSelectedAuthor(s, authorObj) {
      s.authorsArray.push(authorObj)
    }
  },
  state: {
    localNameAuthor: null, // Локальное название автора, для которого мы ищем релизы / видео (нужно в архивах в заголовке)
    authorInfo: null, // Информация об авторе, котору мы выводим на страницу authorPage
    authorsArray: null, // Массив всех авторов которых мы нашли, содержит в себе только название и пермалинки
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