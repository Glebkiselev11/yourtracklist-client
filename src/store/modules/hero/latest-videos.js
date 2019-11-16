import axios from 'axios'

// Модуль для главной страницы, где мы с бэкенда подгружаем 3 последних видео
export default {
  actions: {
    async getThreeLatesVideos({commit}) {
      try {
        const {data} = await axios.post('http://localhost:3000/get-tree-lates-videos')
        console.log(data)
        commit('setThreeLatesVideos', data)
      } catch(error) {
        console.log(error)
      }
    }
  },
  mutations: {
    setThreeLatesVideos(state, videos) {
      state.threeLatestVideos = videos
    }
  },
  state: {
    // 3 последних видео, которые мы отображаем на главной странице
    threeLatestVideos: [
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
          cover: 'https://img.youtube.com/vi/LxZLBs5oZSA/hqdefault.jpg',
          url: 'https://youtu.be/QjMME7LGoJw',
          date: 'November 1, 2016',
          duration: '4:36',
          platform: 'YouTube',
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
          duration: '1:56',
          platform: 'YouTube',
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

