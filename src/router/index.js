import Vue from 'vue'
import VueRouter from 'vue-router'// 导入vue-router
import Home from '../views/home/index.vue'// 首页
import Login from '../views/login/login.vue'// 登录页
import layOut from '../views/layout/layout.vue'// 首页框子
import userinfo from '../components/user-info/index.vue'// 账户信息
import NProgress from 'nprogress' // 导入顶部导航条效果

Vue.use(VueRouter)// 使用vuerouter
const router = new VueRouter({
  routes: [
    // 登录页
    {
      path: '/login',
      component: Login
    },
    // 一级路由最外面的壳子
    {
      path: '/',
      component: layOut,
      children: [
        // 首页  默认子路由只能有一个
        { path: '', component: Home },
        // 账户信息
        { path: '/home/userinfo', component: userinfo },
        // 内容管理下的
        // 评论列表
        { path: '/home/commentlist', component: () => import('../components/content-manage/comment-list/index.vue') },
        // 评论列表修改界面
        { path: '/home/commentedit/:id',
          component: () => import('../components/content-manage/comment-list/commentEdit/commentEdit.vue'),
          props: true // 将路由参数映射给组件的props数据，这样获取参数更方便一些
        },

        // 内容列表
        { path: '/home/contentlist', component: () => import('../components/content-manage/content-list/index.vue') },
        // 素材管理
        { path: '/home/materialmanage', component: () => import('../components/content-manage/material-manage/index.vue') },
        // 发布文章
        { path: '/home/publish', component: () => import('../components/content-manage/publish-article/index.vue') },
        // 发布文章 动态id
        { path: '/home/publish/:id', component: () => import('../components/content-manage/publish-article/index.vue') },
        // 粉丝管理
        // 图文数据
        { path: '/home/imgdata', component: () => import('../components/fans-manage/img-data/index.vue') },
        // 粉丝概况
        { path: '/home/fanssituation', component: () => import('../components/fans-manage/fans-situation/index.vue') },
        // 粉丝画像
        { path: '/home/fansportrayal', component: () => import('../components/fans-manage/fans-portrayal/index.vue') },
        // 粉丝列表
        { path: '/home/fanslist', component: () => import('../components/fans-manage/fans-list/index.vue') },
        // 测试组价
        { path: '/demo', component: () => import('../views/demo/index.vue') }
      ]
    }

  ]
})
// 如果当前页面访问当前页面报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// 路由拦截器
// 路有拦截器beforEach方法，该方法接收一个函数作为参数
// 参数1：to表示去哪里
// 参数2：from表示来自哪里
// 参数3：next是一个方法，用于路由放行
router.beforeEach((to, from, next) => {
  // 开启顶部导航进度条效果
  NProgress.start()// 开始
  // console.log('所有页面的访问都需要通过这里')
  if (to.path === '/login') {
    // 如果要跳转到登录页面允许直接通过
    next()
    // 停止代码继续往后运行
    return
  }
  // 非登录页面校验状态
  const token = window.localStorage.getItem('wmy-token')
  // 判断是否有token，有就通过
  if (token) {
    next()
  } else {
    // 没有token跳转到登录页
    console.log('没有token去登录页登录')
    next('/login')
    NProgress.done()// 结束导航条
  }
})
// 路由全局后置钩子中，关闭进度条
router.afterEach((to, from) => {
  // 结束顶部导航进度条
  NProgress.done()// 结束导航条
})
// 导出路由
export default router
