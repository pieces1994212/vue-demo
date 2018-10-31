import Vue from 'vue'
import Vuex from 'vuex'
import {
  Axios
} from '../utils/customAxios'

// 启用Vuex
Vue.use(Vuex)

// 基础模块
const baseModule = {
  namespaced: true,
  state: {
    loginName: null,
    orgNo: null,
    roleName: null,
    extendsRoutes: [],
    pfpItem: []
  },
  mutations: {
    loginSuccess (state, payload) {
      state.loginName = payload.name
      state.orgNo = 101
      window.sessionStorage.setItem('user', payload.name)
    },
    loginOut (state, payload) {
      state.loginName = null
      state.orgNo = null
      state.roleName = null
      state.extendsRoutes = []
      window.sessionStorage.removeItem('user')
    },
    setUserInfo (state, payload) {
      state.orgNo = payload.user.orgNo
      state.roleName = payload.user.roleName
    },
    addRoutes (state, payload) {
      state.extendsRoutes = payload.list
    },
    addItem (state, payload) {
      state.pfpItem = payload.list
    }
  },
  actions: {
    loadItem ({
      commit
    }) {
      // 获取系统枚举
      Axios.post('/pfpcode/loadItem').then(resp => {
        commit({
          type: 'addItem',
          list: resp.data
        })
        resp.data.forEach(ele => {
          window.localStorage.setItem('pfpitem_' + ele.no, ele.name)
        })
      })
    },
    loadUserInfo ({
      commit
    }) {
      // 加载用户信息，组织号等
      Axios.post('/pfpfunction/queryCurrentUserInfo').then(resp => {
        commit({
          type: 'setUserInfo',
          user: resp.data
        })
      })
    }
  },
  getters: {
    getItemByNo: (state) => (no) => {
      let item = state.pfpItem.find(item => item.no === no)
      return item
    }
  }
}

// 创建一个stroe
const store = new Vuex.Store({
  modules: {
    base: baseModule
  }
})

export default store
