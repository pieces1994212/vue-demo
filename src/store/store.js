import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// 启用Vuex
Vue.use(Vuex)

// 基础模块
const baseModule = {
  namespaced: true,
  state: {
    loginName: '',
    orgNo: '',
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
      state.loginName = ''
      state.orgNo = null
      state.extendsRoutes = []
      window.sessionStorage.removeItem('user')
    },
    addRoutes (state, payload) {
      state.extendsRoutes = payload.list
    },
    loadItem (state, payload) {
      // 获取系统枚举
      axios.post('/pfpcode/loadItem').then(resp => {
        state.pfpItem = resp.data
        resp.data.forEach(ele => {
          window.localStorage.setItem('pfpitem_' + ele.no, ele.name)
        })
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  actions: {
    setMerList ({
      commit
    }, payload) {
      setTimeout(() => {
        commit('setMerList', payload)
      }, 100)
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
