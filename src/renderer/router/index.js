import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/loading',
      name: 'loading-page',
      component: require('@/components/LoadingPage')
    },
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/IndexPage')
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
