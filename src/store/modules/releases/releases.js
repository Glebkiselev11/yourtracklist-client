import axios from 'axios'

// Модуль через который мы получаем список релизов, для архива
export default {
  actions: {
    // Получает пока 9 релизов с базы
    async getReleases({commit, state}) {

      // Вытаскиваем из стора метод сортировки релиза
      const {sorting, selectTags: tags} = state

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

    setSorting(state, sorting) {
      state.sorting = sorting
    },

    setSelectTags(state, tags) {
      if (typeof tags === 'string') {
        state.selectTags.push(tags)
      } else if (typeof tags === 'object'){
        state.selectTags = tags
      }
    },

    clearReleases(state) {
      state.releases = undefined
    },

    clearSorting(state) {
      state.sorting = undefined
    },

    clearSelectTags(state) {
      state.selectTags = []
    }
  },
  state: {
    releases: undefined, // релизы одной страницы пагинации, у нас там пока только 9 релизов на одной страница, возможно в будущем
    sorting: undefined, // Тип сортировки, которую используем
    selectTags: [], // Теги которые используем при получение релизов
    count: undefined, // Количество найденых релизов
  },
  getters: {
    releases: state => state.releases,
    count: state => state.count,
    sorting: state => state.sorting,
    selectTags: state => state.selectTags,
  }
}