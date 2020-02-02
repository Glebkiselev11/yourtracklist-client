import axios from 'axios'

// Через этот метод мы получаем карточку релиза с бэкенда
export default {
  actions: {
    async getReleaseInfo({commit}, formData) {


      try {
        const {data} = await await axios.post('/api/get-release-card', {formData})
        commit('setReleaseInfo', data)
      } catch (error) {
        console.log(error)
      }

    }
  },
  mutations: {
    setReleaseInfo(state, releaseInfo) {
      state.releaseInfo = releaseInfo
    },

    clearReleaseInfo(state) {
      state.releaseInfo = null
    }
  },
  state: {
    releaseInfo: null, // Текущая информация о релизе
  },

  getters: {
    releaseInfo: state => state.releaseInfo
  }
  
}