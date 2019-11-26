import axios from 'axios'

// Модуль через который мы получаем список релизов, для архива
export default {
  actions: {
    // Получает пока 9 релизов с базы
    async getReleases({commit, getters}) {

      // Вытаскиваем из стора метод сортировки релиза
      // Теги и количество отображаемых на одной странице записей
      const {pageSize, sorting, pageNum ,selectTags: tags} = getters

      try {
        const {data : {releases, count, pageCount}} = await axios.post('/api/get-release', {sorting, tags, pageSize, pageNum})

        // Вносим релизы
        commit('setReleases', releases)

        // И количество найденых релизов
        commit('setCount', count)

        // И количество страниц пагинации
        commit('setPageCount', pageCount)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mutations: {
    setReleases(state, releases) {
      state.releases = releases
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
    
  },
  getters: {
    releases: state => state.releases,
    sorting: state => state.sorting,
    selectTags: state => state.selectTags,
  }
}