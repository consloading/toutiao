import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'// 导入路由
import ElementUI from 'element-ui'// 导入element-ui
import 'element-ui/lib/theme-chalk/index.css'// 导入element-ui样式
import './assets/style/index.less'// 导入本地样式初始化
import axios from 'axios'// 导入axios
import 'nprogress/nprogress.css' // 加载nprogress 顶部进度条效果
import JSONbig from 'json-bigint' // 导入处理id过长 解析出现问题
// axios默认会把后端返回的数据使用json.parse转换为对象给我们使用，同时也提供了转换的方法给我们使用
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'// 设置接口基地址
// axios请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求拦截器函数中的 config 是本次请求相关的配置对象
  // config 就是最后要发给后端的那个配置对象
  // 我们可以在拦截器中对 config 进行统一配置定制
  console.log('请求拦截器', config)
  const token = window.localStorage.getItem('wmy-token')
  // 添加统一的token值  如果有token给请求头添加
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config // 是通行的规则
}, function (error) {
  return Promise.reject(error)
})
// 路由拦截器
axios.defaults.transformResponse = [function (data) {
  // 这里使用 JSONbig.parse 转换原始数据类似于 JSON.parse
  // 但是它会处理其中超出安全整数范围的整数问题。
  // 严谨一点，如果 data 不是 json 格式字符串就会报错
  try {
    // 如果是 json 格式字符串，那就转换并返回给后续使用
    return JSONbig.parse(data)
  } catch (err) {
    // 报错就意味着 data 不是 json 格式字符串，这里就直接原样返回给后续使用
    return data
  }
}]
Vue.prototype.$axios = axios // axios赋值给全局属性，使得全局可以访问的到
Vue.use(ElementUI)// 使用elementui
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
