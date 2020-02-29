import Vue from 'vue'
import Vuex from 'vuex'

// Модули
import home from './modules/home'
import authors from './modules/authors'
import releasesArchive from './modules/releasesArchive'
import videoArchive from './modules/videoArchive'
import releaseCard from './modules/releaseCard'
import adminModules from './modules/adminModules'
import pagination from './modules/pagination'
import search from './modules/search'
import track from './modules/track'



Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home, // Главная страницы
    authors, // Все что связано с страницами авторов
    releasesArchive, 
    videoArchive, 
    releaseCard, // Карточка релиза
    adminModules, // Админский модуль, который в будущем переедет в другое SPA
    pagination, 
    search, 
    track, // Храним пока только громкость трека
  }
})
