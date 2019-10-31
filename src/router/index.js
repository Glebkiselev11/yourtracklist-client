import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {layout: 'main', auth: true}, // Обертка под наше приложение
      component: () => import('@/views/Home.vue')
    },
    // {
    //   path: '/authorization',
    //   name: 'Authorization',
    //   meta: {layout: 'empty'},
    //   component: () => import('./views/Authorization.vue')
    // },

  ]
})

export default router
