import releases from './releases'

// Основной модуль, под получения релизов с бэкенда, для поиска, архива и тд
export default {
  actions: {
  },
  mutations: {
  },
  state: {
    // Все возможные теги, храним пока тут, в будущем будем получать их из базы данных, а может всегда будут храниться здесь
    releaseTags: ['Witch-house', 'Rave', 'Guitar', 'Wave', 'Vapor-wave', 'Retro-wave', 'Phonk', 'Lo-fi', 'Soviet-wave', 'Drone', 'Post-internet']
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