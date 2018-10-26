import Login from '../components/Login'
import VueRouter from 'vue-router'
import N404 from '../components/404'
import Vue from 'vue'

Vue.use(VueRouter)

// 基础路由
const routes = [{
  path: '/',
  name: 'login',
  component: Login
}, {
  path: '/404',
  name: '404',
  component: N404
}]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to) {
    // 将当前访问路径存储到缓存，保证刷新后继续访问
    window.sessionStorage.setItem('curPath', to.path)
  }
  next()
})

export default router
