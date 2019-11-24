import axios from 'axios'

// Модуль через который мы получаем список релизов, для архива
export default {
  actions: {
    // Получает пока 9 релизов с базы
    async getReleases({commit}, params) {

      // Если нету сортировки, то по умолчанию запрашиваем как новые релизы
      const {sorting, tags} = params

      try {
        const {data : {releases, count}} = await axios.post('/api/get-release', {sorting, tags})

        // Вносим релизы
        commit('setReleases', releases)

        // И количество найденых релизов
        commit('setCountReleases', count)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mutations: {
    setReleases(state, releases) {
      state.releases = releases
    },

    setCountReleases(state, count) {
      state.count = count
    },

    clearReleases(state) {
      state.releases = undefined
    }
  },
  state: {
    releases: undefined, // релизы одной страницы пагинации, у нас там пока только 9 релизов на одной страница, возможно в будущем
    count: undefined, // Количество найденых релизов
  },
  getters: {
    releases: state => state.releases,
    count: state => state.count
  }
}