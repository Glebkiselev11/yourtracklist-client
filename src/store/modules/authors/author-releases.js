// В этом модуле мы храним 4 последних релиза автора
export default {
  mutations: {
    setFourLastReleasesForAuthor(s, releases) {
      s.fourLastReleasesForAuthor = releases
    },
    clearFourLastReleasesForAuthor(s) {
      s.fourLastReleasesForAuthor = undefined
    },

    setReleasesCountForAuthor(s, count) {
      s.releasesCountForAuthor = count
    },
    clearReleasesCountForAuthor(s) {
      s.releasesCountForAuthor = 0
    }
  },
  state: {
    fourLastReleasesForAuthor: undefined, // Последние четыре релиза для автора
    releasesCountForAuthor: 0, // Информация о том, сколько релизов у автора всего, чтобы если их 4 или меньше не показывать кнопку "показать больше"
  },
  getters: {
    fourLastReleasesForAuthor: s => s.fourLastReleasesForAuthor,
    releasesCountForAuthor: s => s.releasesCountForAuthor,
  },
}