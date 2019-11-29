// В этом модуле мы храним 4 последних релиза автора
export default {
  mutations: {
    setFourLastReleasesForAuthor(state, releases) {
      state.fourLastReleasesForAuthor = releases
    },

    clearFourLastReleasesForAuthor(state) {
      state.fourLastReleasesForAuthor = undefined
    },
  },
  state: {
    fourLastReleasesForAuthor: undefined, // Последние четыре релиза для автора
  },
  getters: {
    fourLastReleasesForAuthor: state => state.fourLastReleasesForAuthor
  },
}