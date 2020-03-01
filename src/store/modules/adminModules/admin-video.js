// Админский модуль для добавления видео записей в базу данных
import axios from 'axios'
import errorHelper from '@/store/errorHelper'

export default {
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
  },

  mutations: {
    setStatusForVideo(s, statusMessage) {
      s.statusForVideo = statusMessage
    },

    setVideoDuration(s, duration) {
      s.videoDuration = duration
    },

    setReleaseDateOfVideo(s, date) {
      s.releaseDateOfVideo = date.substring(0, 10)
    },

    setVideoName(s, videoName) {
      s.videoName = videoName
    },

    setUrlVideo(s, urlVideo) {
      s.urlVideo = urlVideo
    },

    clearDuration(s) {
      s.duration = ''
    },

    clearVideoName(s) {
      s.videoName = ''
    },

    clearReleaseDateOfVideo(s) {
      s.releaseDateOfVideo = ''
    },

    clearUrlVideo(s) {
      s.urlVideo = ''
    },
    
  },

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
        throw new Error(errorHelper(error))
      }
    },
    
    // Получает информацию о видео с ютуба, которое хотим добавить в нашу базу данных
    async getInfoVideoForUpload({getters, commit}) {
      const videoId = getters.videoId

      try {
        const {duration, date, name} = await axios.post('/api/admin/get-youtube-video-info', {videoId})
        commit('setVideoName', name)
        commit('setReleaseDateOfVideo', date)
        commit('setVideoDuration', duration)
      } catch (error) {
        throw new Error(errorHelper(error))
      }
      
    }

  },

  

  
}