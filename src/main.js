import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Paginate from 'vuejs-paginate'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.component('Paginate', Paginate)
Vue.component('Loader', Loader)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
