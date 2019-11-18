import axios from 'axios'

// Через этот метод мы получаем карточку релиза с бэкенда
export default {
  actions: {
    async getReleaseInfo({commit}, formData) {


      try {
        const {data} = await await axios.post('http://localhost:3000/api/get-release-cart', {formData})

        // ! Получили данные, но нужно их доработать, например продолжительность релиза
        // ? /release-cart/88b+niur/stages для теста пока у нас такой запрос
        console.log(data)
        commit('setReleaseInfo', data)
      } catch (error) {
        console.log(error)
      }

    }
  },
  mutations: {
    setReleaseInfo(state, releaseInfo) {
      state.releaseInfo = releaseInfo
    }
  },
  state: {
    releaseInfo: undefined, // Текущая информация о релизе
  },

  getters: {
    releaseInfo: state => state.releaseInfo
  }
  
}