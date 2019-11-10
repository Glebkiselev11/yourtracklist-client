// Получаем видео записи с бэкенда
export default {
  actions: {
  },
  mutations: {
  },
  state: {
    // ! пока как фейковое api, но в будущем мы естественно будем получать это все с бэкенда
    video: [
      { 
        cover: 'https://img.youtube.com/vi/gumHp7sXnMY/hqdefault.jpg',
        url: 'https://youtu.be/QjMME7LGoJw',
        platform: 'YouTube',
        duration: '2:26',
        date: 'October 30, 2019',
        nameInfo: {
          name : 'Love',
          href: 'https://youtu.be/QjMME7LGoJw'
        },
        authors: [
          {
            author: 'Cat soup',
            href: '/Cat-soup'
          }
        ],  
      },
      { 
        cover: 'https://img.youtube.com/vi/gumHp7sXnMY/hqdefault.jpg',
        url: 'https://youtu.be/QjMME7LGoJw',
        platform: 'YouTube',
        duration: '2:26',
        date: 'October 30, 2019',
        nameInfo: {
          name : 'Love',
          href: 'https://youtu.be/QjMME7LGoJw'
        },
        authors: [
          {
            author: 'Cat soup',
            href: '/Cat-soup'
          }
        ],  
      },
      { 
        cover: 'https://img.youtube.com/vi/gumHp7sXnMY/hqdefault.jpg',
        url: 'https://youtu.be/QjMME7LGoJw',
        platform: 'YouTube',
        duration: '2:26',
        date: 'October 30, 2019',
        nameInfo: {
          name : 'Love',
          href: 'https://youtu.be/QjMME7LGoJw'
        },
        authors: [
          {
            author: 'Cat soup',
            href: '/Cat-soup'
          }
        ],  
      },
      { 
        cover: 'https://img.youtube.com/vi/gumHp7sXnMY/hqdefault.jpg',
        url: 'https://youtu.be/QjMME7LGoJw',
        platform: 'YouTube',
        duration: '2:26',
        date: 'October 30, 2019',
        nameInfo: {
          name : 'Love',
          href: 'https://youtu.be/QjMME7LGoJw'
        },
        authors: [
          {
            author: 'Cat soup',
            href: '/Cat-soup'
          }
        ],  
      },
      { 
        cover: 'https://img.youtube.com/vi/gumHp7sXnMY/hqdefault.jpg',
        url: 'https://youtu.be/QjMME7LGoJw',
        platform: 'YouTube',
        duration: '2:26',
        date: 'October 30, 2019',
        nameInfo: {
          name : 'Love',
          href: 'https://youtu.be/QjMME7LGoJw'
        },
        authors: [
          {
            author: 'Cat soup',
            href: '/Cat-soup'
          }
        ],  
      }
    ]
  },
  getters: {
    video(s) {
      return s.video
    }
  },
}