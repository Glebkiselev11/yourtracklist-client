import Vue from 'vue'
import Vuex from 'vuex'

// Модули
import hero from './modules/hero/index.js'
import authors from './modules/authors/index.js'
import releases from './modules/releases/index.js'
import video from './modules/video/index.js'
import releaseCard from './modules/release-card/index.js'
import adminModules from './modules/admin-modules/index.js'
import pagination from './modules/pagination.js'
import search from './modules/search.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hero, 
    authors, 
    releases, 
    video, 
    releaseCard, 
    adminModules, 
    pagination, 
    search,
  }
})
