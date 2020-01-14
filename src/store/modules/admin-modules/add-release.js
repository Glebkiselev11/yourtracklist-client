import axios from 'axios'

// ! Это Новый стор на добавление релизов в телеграм
export default {
  actions: {
    // Добавляет релиз в нашу коллекцию через телеграм
    async addRelease({commit}, formData) {
      try {
        const {data} = await axios.post('/api/add-release-telegram', formData)

        let statusMessage = {}

        console.log(data)

        // TODO: Обрабатываем ошибки базы данных
        if (data.code === '23505') {statusMessage.message = 'Такой релиз уже есть в базе'; statusMessage.status = 'error'}
        if (data.code === '42P18') {statusMessage.message = 'Обязательно укажите хотя бы одну ссылку и тег'; statusMessage.status = 'error'}
        if (data === 'ok') {statusMessage.message = 'Релиз успешно добавлен'; statusMessage.status = 'ok'}

        commit('setStatusForRelease', statusMessage)
      } catch(error) {
        console.log('Ошибка в отправке релиза на бэкенд / Error on submit release on backend', error)
      }

    },

    
  },
  mutations: {
    setStatusForRelease(state, statusMessage) {
      state.statusForRelease = statusMessage
    },
  },

  state: {
    statusForRelease: null, // Статус о добавление нового релиза
  },
  getters: {
    statusForRelease: s => s.statusForRelease,
  }
}