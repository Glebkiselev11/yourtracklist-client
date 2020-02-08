export default {
  methods: {
     // Через этот метод превращаем секунды например 90 в 01:30
     computedDuration(duration) {
      let minute = Math.floor(duration / 60)
      let sec = duration % 60
      
      let hour = null
      if (minute > 60) {
        hour = Math.floor(minute / 60)
        minute = minute % 60
      }

      return `${hour ? hour + ':': ''}${minute < 10 ? '0' + minute : minute}:${sec < 10 ? '0' + sec : sec}`
    }
  },
}