import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: ''
    },
    {
      path: '/login',
      component: () => import('@/views/Login'),
      name: 'login'
    }
  ]
})

export default router
