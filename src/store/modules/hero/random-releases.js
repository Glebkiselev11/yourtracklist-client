// Блок на главной, где мы выводим 3 рандомных релиза
export default {
  actions: {
  },
  mutations: {
  },
  state: {
    // Три рандомных артиста, которых мы выводим на главную
    // Пока только как фейковое api
    threeRandomArtistsArray: [
        { 
          cover: 'https://sun9-51.userapi.com/c856036/v856036734/148c14/aNaufG1zQQ0.jpg',
          date: 'October 30, 2019',
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
        }
    ] 
  },
  getters: {
    threeRandomArtistsArray(state) {
      return state.threeRandomArtistsArray
    }
  }
}
