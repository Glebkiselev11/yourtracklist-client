import axios from 'axios'
import authorReleases from './author-releases'
import authorVideo from './author-video'

// Основной модуль, под Авторов
export default {
  actions: {
    // Получаем автора по ID
    async getAuthorById({commit}, id) {
      

      const {data} = await axios.post('http://localhost:3000/get-author-by-id', { id })

      for (let link in data.links) {

        // Если поле ссылки пришло пустым, то мы удаляем его из массива
        if (!data.links[link]) {
          delete data.links[link]
        }
      }

      commit('setAuthorInfo', data)
    }
  },
  mutations: {
    setAuthorInfo(state, data) {
      state.authorInfo = data
    }
  },
  state: {
    authorInfo: undefined, // Информация об авторе, котору мы выводим на страницу authorPage
  },
  getters: {
    authorInfo(s) {
      return s.authorInfo
    }
  },

  modules: {
    authorReleases, authorVideo

  }
}