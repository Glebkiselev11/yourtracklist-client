import axios from 'axios'

// Модуль для главной страницы, где мы с бэкенда подгружаем 3 последних видео
export default {
  actions: {
    async getThreeLatesVideos({commit}) {
      try {
        const {data} = await axios.post('/api/get-tree-lates-videos')
        commit('setThreeLatesVideos', data)
      } catch(error) {
        console.log(error)
      }
    }
  },
  mutations: {
    setThreeLatesVideos(state, videos) {
      state.threeLatestVideos = videos
    },

    clearThreeLatesVideos(state) {
      state.threeLatestVideos = undefined
    }
  },
  state: {
    // 3 последних видео, которые мы отображаем на главной странице
    threeLatestVideos: undefined,
  },
  getters: {
    threeLatestVideos(state) {
      return state.threeLatestVideos
    }
  }
}

