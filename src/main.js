import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Paginate from 'vuejs-paginate'

import youtube from '@justinribeiro/lite-youtube'
import { directive as onClickaway } from 'vue-clickaway' // Нужен для клика вне компонента
import Loader from '@/components/AppLoader'
import ConvertedDate from '@/filters/ConvertedDate'
import ArrowButton from '@/components/AppArrowButton'
import ErrorMessage from '@/components/AppErrorMessage' // Визуальное отображение ошибок

import './registerServiceWorker'

Vue.config.productionTip = false
Vue.component('Paginate', Paginate)
Vue.component('Loader', Loader)
Vue.component('ArrowButton', ArrowButton)
Vue.component('ErrorMessage', ErrorMessage)
Vue.use('youtube', youtube)

// Фильтры
Vue.filter('ConvertedDate', ConvertedDate)


// Директивы
Vue.directive('onClickaway', onClickaway) // v-on-clickaway нужна, чтобы отслеживать клик вне элемента

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
