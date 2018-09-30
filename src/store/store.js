import Vue from 'vue'
import Vuex from 'vuex'

// 启用Vuex
Vue.use(Vuex)

// 基础模块
const baseModule = {
  namespaced: true,
  state: {
    loginName: '',
    extendsRoutes: []
  },
  mutations: {
    loginSuccess (state, payload) {
      state.loginName = payload.name
      window.sessionStorage.setItem('user', payload.name)
    },
    loginOut (state, payload) {
      state.loginName = ''
      window.sessionStorage.removeItem('user')
    },
    addRoutes (state, payload) {
      state.extendsRoutes = payload.list
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
    searchMeters: (state) => (id) => {
      return state.merList.find(mer => mer.id === id)
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
