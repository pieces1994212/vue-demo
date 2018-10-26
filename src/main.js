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
import baseInput from './components/base-components/baseInput'
import {AxiosPlugin} from './utils/customAxios'

// iView
Vue.use(iView)

// 使用客制化的axios
Vue.use(AxiosPlugin)

// 注册全局组件
Vue.component('baseInput', baseInput)

// 全局自定义过滤器
Vue.filter('customfilter', (value) => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

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
