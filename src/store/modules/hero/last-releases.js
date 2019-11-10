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
          tags: ['808', 'ambient', 'post-internet'],
          nameInfo: {
            name : 'Love',
            href: '/release-cart/Kuroi-Ame--love'
          },
          authors: [
            {
              author: 'Kuroi Ame',
              href: '/Kuroi-Ame'
            }
          ],  
        },
        { 
          cover: 'https://sun9-45.userapi.com/c836630/v836630028/b76e/Z7m-LXxoqt0.jpg',
          date: 'November 1, 2016',
          tags: ['ambient'],
          nameInfo: {
            name : 'uaudé°',
            href: '/release-cart/seng-evryn-havec--uaud'
          },
          authors: [
              {
                author: 'seng°',
                href: '/seng°'
              },
              {
                author: ' & ',
                href: '/'
              },
              {
                author: 'evryn',
                href: '/evryn'
              },
              {
                author: ' & ',
                href: '/'
              },
              {
                author: 'havec',
                href: '/havec'
              }
          ],  
        },
        {
          cover: 'https://sun9-56.userapi.com/c626427/v626427028/17d4f/9JwRqYv8CHs.jpg',
          date: 'July 1, 2016',
          tags: ['witch house'],
          nameInfo: {
            name : 'flyugrom',
            href: '/release-cart/rflc--flyugrom'
          },
          authors: [
              {
                author: 'rflc',
                href: '/rflc'
              }
          ],  
        },
        {
          cover: 'https://sun9-46.userapi.com/c857320/v857320198/da1c/GqYJSqC-O5c.jpg',
          date: 'July 1, 2018',
          tags: ['witch house'],
          nameInfo: {
            name : 'sad',
            href: '/release-cart/tsumetai--sad'
          },
          authors: [
              {
                author: 'tsumetai',
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
