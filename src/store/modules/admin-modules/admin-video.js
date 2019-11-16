// Админский модуль для добавления видео записей в базу данных

import axios from 'axios'

export default {
  actions: {

    // Добавляет новое видео в базу данных
    async addNewVideo({commit}, formData) {

      try {
        const {data} = await axios.post('http://localhost:3000/add-video', {formData})
        
        let statusMessage = {}

        // Обрабатываем ошибки базы данных
        if (data.code === '23505') {statusMessage.message = 'Такое видео уже есть в базе'; statusMessage.status = 'error'}
        if (data === 'ok') {statusMessage.message = 'Видео успешно добавлено'; statusMessage.status = 'ok'}

        commit('setStatusForVideo', statusMessage)
      } catch (error) { 
        console.log(error)
        
      }
    }
  },

  mutations: {
    setStatusForVideo(state, statusMessage) {
      state.statusForVideo = statusMessage
    }
  },

  state: {
    statusForVideo: undefined, // Здесь храним статус ответа (загрузиллось ли оно в базу или нет)
  },

  getters: {
    statusForVideo: s => s.statusForVideo
  }
}