import Login from '../components/Login'
import VueRouter from 'vue-router'
import N404 from '../components/404'
import Vue from 'vue'
// 启用路由
Vue.use(VueRouter)
const routes = [{
  path: '/',
  name: 'login',
  component: Login
}, {
  path: '/404',
  name: '404',
  component: N404
}]

// 获取路径
const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
