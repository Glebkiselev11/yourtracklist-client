import axios from 'axios'

// Модуль для главной страницы, где мы с бэкенда подгружаем 4 последних видео
export default {
  actions: {
    async getFourLatesVideos({commit}) {
      try {
        const {data} = await axios.post('/api/get-four-lates-videos')
        commit('setFourLatesVideos', data)
      } catch(error) {
        console.log(error)
      }
    }
  },
  mutations: {
    setFourLatesVideos(state, videos) {
      state.fourLatestVideos = videos
    },

    clearFourLatesVideos(state) {
      state.fourLatestVideos = undefined
    }
  },
  state: {
    // 3 последних видео, которые мы отображаем на главной странице
    fourLatestVideos: undefined,
  },
  getters: {
    fourLatestVideos(state) {
      return state.fourLatestVideos
    }
  }
}

