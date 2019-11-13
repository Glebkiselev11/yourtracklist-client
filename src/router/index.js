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
      meta: {layout: 'main'}, // Обертка под наше приложение
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/releases-archive',
      name: 'Releases-archive',
      meta: {layout: 'main'}, // Обертка под наше приложение
      component: () => import('@/views/ReleasesArchive')
    },
    {
      path: '/release-cart',
      name: 'Release-cart',
      meta: {layout: 'main'}, // Обертка под наше приложение
      component: () => import('@/views/ReleaseCart.vue')
    },
    {
      path: '/author/:permalink',
      name: 'Author-page',
      meta: {layout: 'main'},
      component: () => import('@/views/AuthorPage.vue')
    },
    {
      path: '/video-archive',
      name: 'Video-archive',
      meta: {layout: 'main', auth: true},
      component: () => import('@/views/VideoArchive.vue')
    },
    {
      path: '/admin--panel',
      name: 'Admin-panel',
      meta: {layout: 'main', auth: true},
      component: () => import('@/views/AdminPanel.vue')
    }

    // {
    //   path: '/authorization',
    //   name: 'Authorization',
    //   meta: {layout: 'empty'},
    //   component: () => import('./views/Authorization.vue')
    // }, 

  ]
})

export default router
