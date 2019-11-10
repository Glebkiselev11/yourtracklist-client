// Модуль через который мы получаем список релизов, для архива
export default {
  actions: {
  },
  mutations: {
  },
  state: {
    // Пока используем фейковое api
    releases: [
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
      }
    ]
  },
  getters: {
    releases(state) {
      return state.releases
    }
  }
}