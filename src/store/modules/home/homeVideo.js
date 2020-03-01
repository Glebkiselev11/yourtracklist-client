import axios from 'axios'
import errorHelper from '@/store/errorHelper'

// Модуль для главной страницы, где мы с бэкенда подгружаем 4 последних видео
export default {
  state: {
    fourLatestVideos: null, // 4 последних видео, которые мы отображаем на главной странице
  },

  getters: {
    fourLatestVideos: s => s.fourLatestVideos
  },

  mutations: {
    setFourLatesVideos(state, videos) {
      state.fourLatestVideos = videos
    },

    clearFourLatesVideos(state) {
      state.fourLatestVideos = null
    }
  },

  actions: {
    async getFourLatesVideos({commit}) {
      try {
        const {data} = await axios.get('/api/get-four-lates-videos')
        commit('setFourLatesVideos', data)
      } catch(error) {
        throw new Error(errorHelper(error))
      }
    }
  },
  
  
}

