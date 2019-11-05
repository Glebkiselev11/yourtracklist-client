// Модуль для главной страницы, где мы с бэкенда подгружаем 3 последних видео
export default {
  actions: {
  },
  mutations: {
  },
  state: {
    // 3 последних видео, которые мы отображаем на главной странице
    threeLatestVideos: [
        { 
          cover: 'https://img.youtube.com/vi/QjMME7LGoJw/hqdefault.jpg',
          url: 'https://youtu.be/QjMME7LGoJw',
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
          cover: 'https://img.youtube.com/vi/QjMME7LGoJw/hqdefault.jpg',
          url: 'https://youtu.be/QjMME7LGoJw',
          date: 'November 1, 2016',
          nameInfo: {
            name : 'uaudé°',
            href: 'https://youtu.be/QjMME7LGoJw'
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
          cover: 'https://img.youtube.com/vi/QjMME7LGoJw/hqdefault.jpg',
          url: 'https://youtu.be/QjMME7LGoJw',
          date: 'July 1, 2016',
          nameInfo: {
            name : 'flyugrom',
            href: 'https://youtu.be/QjMME7LGoJw'
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
    threeLatestVideos(state) {
      return state.threeLatestVideos
    }
  }
}

