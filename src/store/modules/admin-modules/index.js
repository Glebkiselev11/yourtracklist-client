// Все Админские переменные начинаются с admin_
// Основной админский модуль
import axios from 'axios'
import admitVideo from './admin-video.js'
import addRelease from './add-release.js'

export default {
  modules: {
    admitVideo,
    addRelease,
  },

  state: {
    statusForAuthor: null, // Статус о добавлении нового автора
  },
  
  getters: {
    statusForAuthor: s => s.statusForAuthor,
  },

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

    // Проверяет есть ли такая соц сеть в нашей базе, исходя из ссылки
    async checkSocialLink ({commit}, link) {
      
      try {
        const {data : {socialDefined}} = await axios.post('/api/check-social', {link})
        
        return { socialDefined, link}
      } catch (error) {
        console.log(error)
        console.log(commit)
      }
    },

    // Получает с бэкенда список всех доступных тегов
    // Используем этот метод при добавлении автора, релиза, видео, трека
    async getTags() {
      try {
        const {data : tags} = await axios.post('/api/get-tags')
        return tags // И возвращаю их сразу в компонент (TagsSelectList.vue)
      } catch (error) {
        console.log(error)
      }
    }

  },

  
}