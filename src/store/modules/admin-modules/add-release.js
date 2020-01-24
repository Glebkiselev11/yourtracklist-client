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


    // Добавляет 1 трек в массив
    pushTrack(s, track) {

      // Если нету нумерации трека (теги не проставлены в альбоме, то ставим номер исходя из кол-ва значений в массиве)
      if (track.number == 0) {
        track.number = s.tracks.length + 1
      }

      s.tracks.push(track)
    },


    

    // Синхронизирует новую информацию с треком по номеру в релизе
    // ! В будущем надо будет поработать над оптимизиацией
    syncTracksOfNumber(s, track) {
      for (let i = 0; i < s.tracks.length; i++) {
        if (track.number === s.tracks[i].number) {
          console.log('aga')
          s.tracks[i] = track
        }
      }
    },

    clearTracks(s) {
      s.tracks = []
    },

  },

  state: {
    statusForRelease: null, // Статус о добавление нового релиза
    tracks: [], // Массив сформированных треков с информацией, которые отравляем уже на бэк
  },
  getters: {
    statusForRelease: s => s.statusForRelease,
    tracks: s=> s.tracks,
  }
}