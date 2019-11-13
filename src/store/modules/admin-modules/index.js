// Все Админские переменные начинаются с admin_
// Основной админский модуль
import axios from 'axios'

export default {
  actions: {
    // Добавляет автора в нашу коллекцию, доступно только для администратора
    async admin_addAuthor({commit}, formData) {
      try {
        await axios.post('http://localhost:3000/add-author', {formData})
      } catch(error) {
        console.log(error)
      }
      console.log(commit)
    }
  },
  mutations: {
  },
  state: {
    
  },
  getters: {
    
  },
  modules: {

  }
}