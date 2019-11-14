import axios from 'axios'
import authorReleases from './author-releases'
import authorVideo from './author-video'

// Основной модуль, под Авторов
export default {
  actions: {
    // Получаем автора по ID
    async getAuthorById({commit}, permalink) {
      

      const {data} = await axios.post('http://localhost:3000/get-author-by-id', { permalink })

      for (let link in data.links) {

        // Если поле ссылки пришло пустым, то мы удаляем его из массива
        if (!data.links[link]) {
          delete data.links[link]
        }
      }

      commit('setAuthorInfo', data)
    },

    // Получаем всех авторов (а именно их имена и пермалинки)
    async getAuthors({commit}) {
      const {data} = await axios.post('http://localhost:3000/get-authors-list')

      commit('setAuthors', data)
    }
  },
  mutations: {
    setAuthorInfo(state, data) {
      state.authorInfo = data
    },

    setAuthors(state, data) {
      state.authorsArray = data
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