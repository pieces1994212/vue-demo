// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './static/style/common.css'
import './static/js/common.js'
import router from './router/index.js'
import store from './store/store.js'
import axios from 'axios'
import Qs from 'qs'
import baseInput from './components/base-components/baseInput'

// iView
Vue.use(iView)

// 注册全局组件
Vue.component('baseInput', baseInput)

// 全局自定义过滤器
Vue.filter('customfilter', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

router.beforeEach((to, from, next) => {
  if (to) {
    window.sessionStorage.setItem('curPath', to.path)
  }
  next()
})

// baseURL目前通过porxy代理解决
// axios.defaults.baseURL = 'http://127.0.0.1:8080'
// 携带验证信息以通过springsecurity验证
axios.defaults.withCredentials = true

// 将axios与qs挂载到Vue上
Vue.prototype.$axios = axios
Vue.prototype.qs = Qs

// 根实例
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: {
    App
  },
  router
}).$mount('#app')
