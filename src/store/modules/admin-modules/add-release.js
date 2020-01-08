import axios from 'axios'

// Тестовый стор на добавление релизов в телеграм
export default {
  actions: {
    // Добавляет релиз в нашу коллекцию через телеграм
    // ! Пока тестируем отправку обложки
    async addRelease({commit}, formData) {


      try {


        const {data} = await axios.post('/api/add-release-telegram', formData)

        let statusMessage = {}

        console.log(data)

        // Обрабатываем ошибки базы данных
        if (data.code === '23505') {statusMessage.message = 'Такой релиз уже есть в базе'; statusMessage.status = 'error'}
        if (data.code === '42P18') {statusMessage.message = 'Обязательно укажите хотя бы одну ссылку и тег'; statusMessage.status = 'error'}
        if (data === 'ok') {statusMessage.message = 'Релиз успешно добавлен'; statusMessage.status = 'ok'}

        commit('setStatusForRelease', statusMessage)
      } catch(error) {
        console.log(error)
      }

    },

  },
  mutations: {

  },

  state: {

  },
  getters: {

  }
}