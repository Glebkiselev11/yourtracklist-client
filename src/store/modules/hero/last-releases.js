import axios from 'axios'

// Методы для блока на главной странице, куда мы выводим 4 последних релиза
export default {
  actions: {
    async getFourLatesReleases({commit}) {
      try {
        const {data} = await axios.post('http://localhost:3000/get-four-lates-releases')
        commit('setFourLatesReleases', data)
      } catch(error) {
        console.log(error)
      }


    }
  },
  mutations: {
    setFourLatesReleases(state, data) {
      state.fourLatestReleases = data
    }
  },
  state: {
    // 4 Последних релиза, которые мы показывам на главной странице
    fourLatestReleases: undefined, 
  },
  getters: {
    fourLatestReleases(state) {
      return state.fourLatestReleases
    }
  }
}
