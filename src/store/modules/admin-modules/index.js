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



    setTags(s, tags) {
      s.tags = tags
      console.log(tags)
    },
    clearTags(s) {
      s.tags = null
    },

    // Этот метод нужен для удаления из массива возможных тегов, тот тег, который мы выбрали уже, чтобы лишний раз он не мешался нам
    clearSelectedTag(s, tag) {
      for (let i = 0; i < s.tags.length; i++) {
        if (s.tags[i].name === tag) {
          s.tags.splice(i, 1)
          break;
        }
      }
    },
    // А через этот метод мы возвращаем удаленный тег (если мы вдруг его выбрали случайно, 
    // а потом удалили из выбранных(ведь в методе выше мы его очищаем из возможных тегов, а тут вовзращаем обратно))
    returnSelectedTag(s, tag) {
      s.tags.push(tag)
    }
  },
  state: {
    statusForAuthor: null, // Статус о добавлении нового автора

    tags: null, // Все возможные теги
  },
  getters: {
    statusForAuthor: s => s.statusForAuthor,
    tags: s => s.tags,

  },
  modules: {
    admitVideo,
    addRelease,
  }
}