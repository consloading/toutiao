import Vue from 'vue'
import App from './App.vue'
import router from './router'// 导入路由
import ElementUI from 'element-ui'// 导入element-ui
import 'element-ui/lib/theme-chalk/index.css'// 导入element-ui样式
import './assets/style/index.less'// 导入本地样式初始化
import axios from 'axios'// 导入axios

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'// 设置接口基地址
Vue.prototype.$axios = axios // axios赋值给全局属性，使得全局可以访问的到
Vue.use(ElementUI)// 使用elementui
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
