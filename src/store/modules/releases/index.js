import releases from './releases'
import axios from 'axios'
// Основной модуль, под получения релизов с бэкенда, для поиска, архива и тд
export default {
  actions: {
    // Получает с бэкенда список всех доступных тегов
    async getReleaseTags({commit}) {
      const {data : tags} = await axios.post('http://localhost:3000/get-release-tags')


      commit('setReleaseTags', tags)
    }
  },
  mutations: {
    setReleaseTags(state, tags) {
      state.releaseTags = tags
    }
  },
  state: {
    // Все возможные теги, храним пока тут, в будущем будем получать их из базы данных, а может всегда будут храниться здесь
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