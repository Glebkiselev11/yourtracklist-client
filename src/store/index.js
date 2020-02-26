import Vue from 'vue'
import Vuex from 'vuex'

// Модули
import hero from './modules/hero'
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
    hero, 
    authors, 
    releasesArchive, 
    videoArchive, 
    releaseCard, 
    adminModules, 
    pagination, 
    search,
    track
  }
})
