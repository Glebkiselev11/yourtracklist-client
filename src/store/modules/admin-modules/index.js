// Все Админские переменные начинаются с admin_
// Основной админский модуль
import axios from 'axios'
import admitVideo from './admin-video.js'
import addRelease from './add-release.js'

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


    // Получает с бэкенда список всех доступных тегов
    // Используем этот метод при добавлении автора, релиза, видео, трека
    async getTags({commit}) {
      try {
        const {data : tags} = await axios.post('/api/get-tags')
        commit('setTags', tags)
      } catch (error) {
        console.log(error)
      }
    }


  },
  mutations: {
    setSocialsNameList(state, data) {
      state.socialsNameList = data
    },

    setStatusForAuthor(state, statusMessage) {
      state.statusForAuthor = statusMessage
    },

    

    setTags(s, tags) {
      s.tags = tags
    },
    clearTags(s) {
      s.tags = null
    }
  },
  state: {
    statusForAuthor: null, // Статус о добавлении нового автора
    socialsNameList: null, // Список всех возможных социальных сетей
    tags: null, // Все возможные теги
  },
  getters: {
    statusForAuthor: s => s.statusForAuthor,
    socialsNameList: s => s.socialsNameList,
    tags: s => s.tags,

  },
  modules: {
    admitVideo,
    addRelease,
  }
}