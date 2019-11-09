import axios from 'axios'

// Основной модуль, под Авторов
export default {
  actions: {
    // Получаем автора по ID
    async getAuthorById(context, id) {
      

      const {data} = await axios.post('http://localhost:3000/get-author-by-id', { id })

      console.log(data) 
      

    }
  },
  mutations: {
  },
  state: {
  },
  modules: {
    
  }
}