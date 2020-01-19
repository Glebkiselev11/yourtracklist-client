import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Paginate from 'vuejs-paginate'

import youtube from '@justinribeiro/lite-youtube'
import { directive as onClickaway } from 'vue-clickaway' // Нужен для клика вне компонента
import Loader from '@/components/app/Loader'
import ArrowButton from '@/components/app/ArrowButton'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.component('Paginate', Paginate)
Vue.component('Loader', Loader)
Vue.component('ArrowButton', ArrowButton)
Vue.use('youtube', youtube)


// Директивы
Vue.directive('onClickaway', onClickaway) // v-on-clickaway нужна, чтобы отслеживать клик вне элемента

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
