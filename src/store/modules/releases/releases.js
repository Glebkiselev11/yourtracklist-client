import axios from 'axios'

// Модуль через который мы получаем список релизов, для архива
export default {
  actions: {
    // Получает пока 9 релизов с базы
    async getReleases({commit}, params) {

      // Если нету сортировки, то по умолчанию запрашиваем как новые релизы
      const {sorting} = params

      try {
        const {data} = await axios.post('/api/get-release', {sorting})
        console.log(data)
        commit('setReleases', data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mutations: {
    setReleases(state, releases) {
      state.releases = releases
    },

    clearReleases(state) {
      state.releases = undefined
    }
  },
  state: {
    releases: undefined // релизы одной страницы пагинации, у нас там пока только 9 релизов на одной страница, возможно в будущем
  },
  getters: {
    releases(state) {
      return state.releases
    }
  }
}