import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'// 首页
import Login from '../views/login/login.vue'// 登录页

Vue.use(VueRouter)

const routes = [
  // 默认跳转页面
  {
    path: '/',
    redirect: '/login'
  },
  // 首页
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  // 登录页
  {
    path: '/login',
    name: 'login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
