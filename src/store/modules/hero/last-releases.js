// Блок на главной, где мы выводим 4 последний релиза
export default {
  actions: {
  },
  mutations: {
  },
  state: {
    // 4 Последних релиза, которые мы показывам на главной странице
    fourLatestReleases: [
        { 
          cover: 'https://sun9-51.userapi.com/c856036/v856036734/148c14/aNaufG1zQQ0.jpg',
          date: 'October 30, 2019',
          tags: ['808', 'ambient'],
          releaseName: {
            name : 'Love',
            href: '/release-cart/Kuroi-Ame--love'
          },
          artists: [
            {
              artist: 'Kuroi Ame',
              href: '/Kuroi-Ame'
            }
          ],  
        },
        { 
          cover: 'https://sun9-45.userapi.com/c836630/v836630028/b76e/Z7m-LXxoqt0.jpg',
          date: 'November 1, 2016',
          tags: ['ambient'],
          releaseName: {
            name : 'uaudé°',
            href: '/release-cart/seng-evryn-havec--uaud'
          },
          artists: [
              {
                artist: 'seng°',
                href: '/seng°'
              },
              {
                artist: ' & ',
                href: '/'
              },
              {
                artist: 'evryn',
                href: '/evryn'
              },
              {
                artist: ' & ',
                href: '/'
              },
              {
                artist: 'havec',
                href: '/havec'
              }
          ],  
        },
        {
          cover: 'https://sun9-56.userapi.com/c626427/v626427028/17d4f/9JwRqYv8CHs.jpg',
          date: 'July 1, 2016',
          tags: ['witch house'],
          releaseName: {
            name : 'flyugrom',
            href: '/release-cart/rflc--flyugrom'
          },
          artists: [
              {
                artist: 'rflc',
                href: '/rflc'
              }
          ],  
        },
        {
          cover: 'https://sun9-46.userapi.com/c857320/v857320198/da1c/GqYJSqC-O5c.jpg',
          date: 'July 1, 2018',
          tags: ['witch house'],
          releaseName: {
            name : 'sad',
            href: '/release-cart/tsumetai--sad'
          },
          artists: [
              {
                artist: 'tsumetai',
                href: '/tsumetai'
              }
          ],  
        }
    ] 
  },
  getters: {
    fourLatestReleases(state) {
      return state.fourLatestReleases
    }
  }
}
