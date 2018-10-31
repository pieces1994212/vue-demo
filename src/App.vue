<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { initMenu } from './utils/menu'
export default {
  name: 'app',
  data: function () {
    return {
      userId: 10086
    }
  },
  created: function () {
    let _this = this
    let username = window.sessionStorage.getItem('user')
    // 刷新浏览器时判断当前用户是否登陆
    if (username && username !== '') {
      // 是则重新加载菜单权限(刷新页面后整个Vue实例初始化，store已刷新，防止用户修改权限菜单，所以不存储在sessionStorage中，每次初始化重新加载菜单权限
      _this.$axios.post('/pfpfunction/queryMenu').then(resp => {
        if (resp.status === 200 && resp.data) {
          // 这里模拟后台接口返回的菜单权限列表
          let routes = [{
            path: 'view/Welcome',
            name: 'welcome',
            url: '/'
          }, {
            path: 'view/Data',
            name: 'data',
            url: 'data'
          }]
          // 加载动态路由
          initMenu(_this.$store, _this.$router, routes)
          // 重新加载登陆信息
          _this.$store.commit({ type: 'base/loginSuccess', name: username })
          // 加载用户信息
          _this.$store.dispatch('base/loadUserInfo')
          // store加载枚举
          _this.$store.dispatch('base/loadItem')
          // 获取刷新时用户访问组件的path，有则加载到其位置
          let curPath = window.sessionStorage.getItem('curPath')
          _this.$router.push({ path: curPath || '/home' })
        } else {
          // 因为登陆超时加载失败则重新登陆
          _this.$router.push({ path: '/' })
        }
      }).catch(function (error) {
        console.log(error)
        _this.$router.push({ path: '/' })
      })
    } else {
      _this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
