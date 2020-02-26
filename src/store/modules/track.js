export default {
  // Глобальные настройки для треков
  state: {
    trackVolume: localStorage.getItem('volume') || 70
  },

  getters: {
    trackVolume: s => s.trackVolume
  },

  mutations: {
    setTrackVolume(s, volume) { // Одновременно устанавливает в стейт и локалстейт
      s.trackVolume = volume
      localStorage.setItem('volume', volume)
    }
  }
}