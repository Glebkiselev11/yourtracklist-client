import Vue from 'vue'
import Vuex from 'vuex'

// Модули
import hero from './modules/hero/index.js'
import authors from './modules/authors/index.js'
import releases from './modules/releases/index.js'
import video from './modules/video/index.js'
import releaseCart from './modules/release-cart/index.js'
import adminModules from './modules/admin-modules/index.js'
import pagination from './modules/pagination.js'
import search from './modules/search.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    hero, 
    authors, 
    releases, 
    video, 
    releaseCart, 
    adminModules, 
    pagination, 
    search,
  }
})
