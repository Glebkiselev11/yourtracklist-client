import releases from './releases'
import axios from 'axios'
// Основной модуль, под получения релизов с бэкенда, для поиска, архива и тд
export default {
  actions: {
    // Получает с бэкенда список всех доступных тегов
    async getReleaseTags({commit}) {
      try {
        const {data : tags} = await axios.post('/api/get-release-tags')
        commit('setReleaseTags', tags)
      } catch (error) {
        console.log(error)
      }
      
    }
  },
  mutations: {
    setReleaseTags(state, tags) {
      state.releaseTags = tags
    }
  },
  state: {
    // Все возможные теги
    releaseTags: []
  },
  getters: {
    releaseTags(s) {
      return s.releaseTags
    }
  },
  modules: {
    releases
  }
}