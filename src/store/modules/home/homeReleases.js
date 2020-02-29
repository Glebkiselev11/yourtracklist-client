import axios from 'axios'

// Методы для блока на главной странице, куда мы выводим 4 последних релиза
export default {
  state: {
    fourLatestReleases: null, 
  },

  getters: {
    fourLatestReleases(state) {
      return state.fourLatestReleases
    }
  },

  mutations: {
    setFourLatesReleases(state, data) {
      state.fourLatestReleases = data
    },

    // Обычно эти методы (clear_) мы вызываем когда закрываем компонет, чтобы очистить стор
    clearFourLatesReleases(state) {
      state.fourLatestReleases = null
    }
  },

  actions: {
    async getFourLatesReleases({commit}) {
      try {
        const {data} = await axios.get('/api/get-four-lates-releases')
        commit('setFourLatesReleases', data)
      } catch(error) {
        if (error.response.data.message) {
          throw error.response.data.message
        } else {
          throw 'Ошибка в подключении к серверу'
        }
      }
    }
  },
  
  
}
