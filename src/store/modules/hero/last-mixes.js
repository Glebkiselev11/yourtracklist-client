// Блок на главной, где мы выводим 4 последних микса
export default {
  actions: {
  },
  mutations: {
  },
  state: {
    // 4 Последних релиза, которые мы показывам на главной странице
    fourLatestMixes: [
        { 
          cover: 'https://sun9-37.userapi.com/c855632/v855632495/126f60/Ob3bw1S-FoM.jpg',
          date: 'October 13, 2019',
          tags: ['lofi', 'techno'],
          nameInfo: {
            name : 'techno mix #5',
            href: '/mix-cart/Yourtracklist--techno-mix-5'
          },
          authors: [
            {
              author: 'Yourtracklist',
              href: '/Yourtracklist'
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
    fourLatestMixes(state) {
      return state.fourLatestMixes
    }
  }
}
