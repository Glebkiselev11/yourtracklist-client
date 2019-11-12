import axios from 'axios'

// Через этот метод мы получаем карточку релиза с бэкенда и треки по Api из телеграмма :)
export default {
  actions: {
    async getReleaseInfo() {
      const {data} = await axios.get('https://api.telegram.org/bot844674699:AAF5-xQBxV6FUylUinO45zDBz23fhOSdnX4/Audio')

      console.log(data)
    }
  },
  mutations: {
  },
  state: {
  },
  
}