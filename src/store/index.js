import Vue from 'vue'
import Vuex from 'vuex'

// Модули
import hero from './modules/hero/index.js'
import authors from './modules/authors/index.js'
import releases from './modules/releases/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    hero, authors, releases
  }
})
