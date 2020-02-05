import axios from 'axios'

// Через этот метод мы получаем карточку релиза с бэкенда
export default {
  actions: {
    async getReleaseInfo({commit}, formData) {
      try {
        // С бэкенда получаем информацию о релизе и массив с треками (пока без сами файлов треков)
        const {data : {release, tracks}} = await await axios.post('/api/get-release-card', {formData})

        console.log(tracks)
        commit('setReleaseInfo', release)
        commit('setReleaseTracks', tracks)

      } catch (error) {
        console.log(error)
      }

    }
  },
  mutations: {
    setReleaseInfo(state, releaseInfo) {
      state.releaseInfo = releaseInfo
    },
    clearReleaseInfo(state) {
      state.releaseInfo = null
    },

    setReleaseTracks(state, tracks) {
      state.releaseTracks = tracks
    },
    clearReleaseTracks(state) {
      state.releaseTracks = null
    }
  },
  state: {
    releaseInfo: null, // Текущая информация о релизе
    releaseTracks: null, // Массив треков для релиза
  },

  getters: {
    releaseInfo: state => state.releaseInfo,
    releaseTracks: state => state.releaseTracks
  }
  
}