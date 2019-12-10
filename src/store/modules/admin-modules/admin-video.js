// Админский модуль для добавления видео записей в базу данных

import axios from 'axios'

export default {
  actions: {

    // Добавляет новое видео в базу данных
    async addNewVideo({commit, getters}, formData) {

      formData.duration = getters.videoDuration
      formData.permalink = getters.videoId
      formData.date = getters.releaseDateOfVideo
      formData.name = getters.videoName

      try {
        const {data} = await axios.post('/api/add-video', {formData})
        
        let statusMessage = {}

        // Обрабатываем ошибки базы данных
        if (data.code === '23505') {statusMessage.message = 'Такое видео уже есть в базе'; statusMessage.status = 'error'}
        if (data === 'ok') {statusMessage.message = 'Видео успешно добавлено'; statusMessage.status = 'ok'}

        commit('setStatusForVideo', statusMessage)
      } catch (error) { 
        console.log(error)
        
      }
    },
    
    // Получает информацию о видео с ютуба, которое хотим добавить в нашу базу данных
    async getInfoVideoForUpload({getters, commit}) {
      const videoId = getters.videoId

      try {
        // Получаем название видео и дату его публикации
        const {data : {items : [info1]}} = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyAE-fHuHMXHtztu9xlYb9CWp6e5YyTEZiA&fields=items(snippet(publishedAt, title))&part=snippet`)
        commit('setVideoName', info1.snippet.title)
        commit('setReleaseDateOfVideo', info1.snippet.publishedAt)

        // Тут получаем продолжительность видео
        const {data : {items : [info2]}} = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyAE-fHuHMXHtztu9xlYb9CWp6e5YyTEZiA&fields=items(contentDetails(duration))&part=contentDetails`)
        commit('setVideoDuration', info2.contentDetails.duration)

      } catch (error) {
        console.log(error)
      }
      
    }

  },

  mutations: {
    setStatusForVideo(state, statusMessage) {
      state.statusForVideo = statusMessage
    },

    setVideoDuration(state, duration) {
      state.videoDuration = duration
    },

    setReleaseDateOfVideo(state, date) {
      state.releaseDateOfVideo = date.substring(0, 10)
    },

    setVideoName(state, videoName) {
      state.videoName = videoName
    },

    setUrlVideo(state, urlVideo) {
      state.urlVideo = urlVideo
    },

    clearDuration(state) {
      state.duration = ''
    },

    clearVideoName(state) {
      state.videoName = ''
    },

    clearReleaseDateOfVideo(state) {
      state.releaseDateOfVideo = ''
    },

    clearUrlVideo(state) {
      state.urlVideo = ''
    },
    
  },

  state: {
    releaseDateOfVideo: '', // Дата выхода видео
    videoName: '', // Название видео, которое мы подгружаем с ютуба
    videoDuration: '', // Длительность видео
    urlVideo: '', // Ссылка на видео, введя ее в инпут, мы по api получаем данные по видосу
    statusForVideo: undefined, // Здесь храним статус ответа (загрузиллось ли оно в базу или нет)
  },

  getters: {
    urlVideo: s => s.urlVideo,
    videoDuration: s => s.videoDuration,
    statusForVideo: s => s.statusForVideo,
    videoName: s => s.videoName,
    releaseDateOfVideo: s => s.releaseDateOfVideo,

    // Возвращает id видео, просто обрезав ссылку (работает только с ютуб)
    videoId(s) {
      return s.urlVideo.substr(-11)
    }
  }
}