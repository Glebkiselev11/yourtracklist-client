import axios from 'axios'
import errorHelper from '@/store/errorHelper'

// ! Это Новый стор на добавление релизов в телеграм
export default {
  state: {
    tracks: [], // Массив сформированных треков с информацией, которые отравляем уже на бэк
  },
  getters: {
    tracks: s=> s.tracks,
  },

  mutations: {
    // Добавляет 1 трек в массив
    pushTrack(s, track) {
      // Если нету нумерации трека (теги не проставлены в альбоме, то ставим номер исходя из кол-ва значений в массиве)
      if (track.ordinalNumber == 0) {
        track.ordinalNumber = s.tracks.length + 1
      }
      s.tracks.push(track)
    },

    // Синхронизирует новую информацию с треком по номеру в релизе
    syncTracksOfNumber(s, track) {
      for (let i = 0; i < s.tracks.length; i++) {
        if (track.ordinalNumber === s.tracks[i].ordinalNumber) {
          s.tracks[i] = track
        }
      }
    },

    clearTracks(s) {
      s.tracks = []
    },
  },

  actions: {
    // Добавляет релиз в нашу коллекцию через телеграм
    async addRelease(_, formData) {
      try {
        const {data} = await axios.post('/api/add-release-telegram', formData)

        let response = {}

        console.log(data)

        // TODO: Унести эту обработку на бэкенд
        // Обрабатываем ошибки базы данных
        if (data.code === '23505') {response.message = 'Такой релиз уже есть в базе'; response.status = 'error'}
        // if (data.code === '42P18') {statusMessage.message = 'Обязательно укажите хотя бы одну ссылку и тег'; statusMessage.status = 'error'}
        if (data === 'ok') {response.message = 'Релиз успешно добавлен'; response.status = 'ok'}

        return response

      } catch(error) {
        console.log('Ошибка в отправке релиза на бэкенд / Error on submit release on backend', error)
        throw new Error(errorHelper(error))
      }

    },

    
  },
  

  
}