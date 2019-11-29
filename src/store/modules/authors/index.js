import axios from 'axios'
import authorReleases from './author-releases'
import authorVideo from './author-video'

// Основной модуль, под Авторов
export default {
  actions: {
    // ! Получаем автора по ID, а так же 4 последних его релиза и 4 последних его видео
    // ! Остановились мы тут, нужно переделать базу данных
    async getAuthorById({commit}, permalink) {
      
      const {data : {author, releases}} = await axios.post('/api/get-author-by-id', { permalink })

      console.log(author)

      for (let link in author.links) {

        // Если поле ссылки пришло пустым, то мы удаляем его из массива
        if (!author.links[link]) {
          delete author.links[link]
        }
      }

      commit('setAuthorInfo', author)
      commit('setFourLastReleasesForAuthor', releases)
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

    // При закрытие окна автора мы чистим инфу из стейта
    clearAuthorInfo(state) {
      state.authorInfo = undefined
    }
  },
  state: {
    authorInfo: undefined, // Информация об авторе, котору мы выводим на страницу authorPage
    authorsArray: undefined, // Массив всех авторов которых мы нашли, содержит в себе только название и пермалинки
  },
  getters: {
    authorInfo(s) {
      return s.authorInfo
    },
    authorsArray(s) {
      return s.authorsArray
    }
  },

  modules: {
    authorReleases, authorVideo

  }
}