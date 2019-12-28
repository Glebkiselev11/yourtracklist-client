import axios from 'axios'

// Основной модуль, под поиск по сайту
export default {
  actions: {
    async submitSearchQuery({commit}, searchQuery) {
      console.log(commit)
      try {
        const {data} = await axios.post('/api/search-query', {searchQuery})

        console.log(data)

      } catch (error) {
        console.log(error)
      }
    }

  },
  mutations: {

  },
  state: {
    
  },
  getters: {

  }
}