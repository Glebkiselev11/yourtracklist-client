// Все Админские переменные начинаются с admin_
// Основной админский модуль
import axios from 'axios'
import admitVideo from './admin-video.js'

export default {
  actions: {
    // Добавляет автора в нашу коллекцию, доступно только для администратора
    async admin_addAuthor({commit}, formData) {
      try {
        const {data} = await axios.post('/api/add-author', {formData})

        console.log(data)
        let statusMessage = {}

        // Обрабатываем ошибки базы данных
        if (data.code === '23505') {statusMessage.message = 'Такой исполнитель уже есть в базе'; statusMessage.status = 'error'}
        if (data.code === '42P18') {statusMessage.message = 'Обязательно укажите хотя бы одну ссылку и тег'; statusMessage.status = 'error'}
        if (data === 'ok') {statusMessage.message = 'Автор успешно добавлен'; statusMessage.status = 'ok'}

        commit('setStatusForAuthor', statusMessage)
      } catch(error) {
        console.log(error)
      }
      
      
    },

    // Добавляет релиз в нашу коллекицию
    async admin_addRelease({commit}, formData) {
      try {
        const {data} = await axios.post('/api/add-release', {formData})

        let statusMessage = {}

        // Обрабатываем ошибки базы данных
        if (data.code === '23505') {statusMessage.message = 'Такой релиз уже есть в базе'; statusMessage.status = 'error'}
        if (data.code === '42P18') {statusMessage.message = 'Обязательно укажите хотя бы одну ссылку и тег'; statusMessage.status = 'error'}
        if (data === 'ok') {statusMessage.message = 'Релиз успешно добавлен'; statusMessage.status = 'ok'}

        commit('setStatusForRelease', statusMessage)
      } catch(error) {
        console.log(error)
      }

    },


    // Возвращает список всех возможных социальных сетей, пока нужен только для админ кабинета, чтобы не пладить кучу инпутов в шаблоне
    async admin_getSocialsNameList({commit}) {
      try {
        const {data} =  await axios.post('/api/get-socials')

        // Полученный массив названий социальных сетей устанавливаем в стейт
        commit('setSocialsNameList', data)
      } catch(error) {
        console.log(error)
      }
    },




  },
  mutations: {
    setSocialsNameList(state, data) {
      state.socialsNameList = data
    },


    setStatusForAuthor(state, statusMessage) {
      state.statusForAuthor = statusMessage
    },

    setStatusForRelease(state, statusMessage) {
      state.statusForRelease = statusMessage
    }
  },
  state: {
    statusForAuthor: undefined, // Статус о добавлении нового пользователя
    statusForRelease: undefined, // Статус о добавление нового релиза
    socialsNameList: [], // Список всех возможных социальных сетей
  },
  getters: {
    statusForAuthor: s => s.statusForAuthor,
    socialsNameList: s => s.socialsNameList,
    statusForRelease: s => s.statusForRelease

  },
  modules: {
    admitVideo
  }
}