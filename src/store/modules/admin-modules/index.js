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
    },

    // Добавляет релиз в нашу коллекицию
    async admin_addRelease({commit}, formData) {
      try {
        await axios.post('http://localhost:3000/add-release', {formData})
      } catch(error) {
        console.log(error)
      }
      console.log(commit)
    },


    // Возвращает список всех возможных социальных сетей, пока нужен только для админ кабинета, чтобы не пладить кучу инпутов в шаблоне
    async admin_getSocialsNameList({commit}) {
      try {
        const {data} =  await axios.post('http://localhost:3000/get-socials')

        // Полученный массив названий социальных сетей устанавливаем в стейт
        commit('setSocialsNameList', data)
      } catch(error) {
        console.log(error)
      }
    }


  },
  mutations: {
    setSocialsNameList(state, data) {
      state.socialsNameList = data
    }
  },
  state: {
    socialsNameList: [], // Список всех возможных социальных сетей
  },
  getters: {
    socialsNameList(s) {
      return s.socialsNameList
    }
  },
  modules: {

  }
}