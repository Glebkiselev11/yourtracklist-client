import axios from 'axios'

// Через этот модуль мы получаем релизы для автора по ID
export default {
  actions: {
    // Последние 4 релиза автора для предпоказа
    async getFourLatesReleasesForAuthorById({commit}, authorPermalink) {
      try {
        const {data} = await axios.post('/api/get-four-lates-releases-for-author', {authorPermalink})
        commit('setFourLastReleasesForAuthor', data)
      } catch(error) {
        console.log(error)
      }
    },

    // Основной метод получения релизов, определенного автора по ID
    getReleasesForAuthorById() {
      
    }
  },
  mutations: {
    setFourLastReleasesForAuthor(state, releases) {
      state.fourLastReleasesForAuthor = releases
    },

    clearFourLastReleasesForAuthor(state) {
      state.fourLastReleasesForAuthor = undefined
    },
  },
  state: {
    fourLastReleasesForAuthor: undefined, // Последние четыре релиза для автора
    releasesForAuthor: undefined, // Одна страница пагинации релизов автора (9 релизов)
  },
  getters: {
    fourLastReleasesForAuthor: state => state.fourLastReleasesForAuthor
  },
}