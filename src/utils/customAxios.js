import axios from 'axios'
import Qs from 'qs'
import router from '../router/index'
import {
  Notice
} from 'iview'

// 客制化axios
const Axios = axios.create({
  timeout: 1000,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

// 添加请求拦截器
Axios.interceptors.request.use(
  config => {
    // before send
    // 如果是post，序列化请求数据
    config.data = config.method === 'post' ? Qs.stringify(config.data) : config.data
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
Axios.interceptors.response.use(
  res => {
    return res
  },
  error => {
    if (error.response.status === 403) {
      Notice.error({
        title: '请求错误',
        desc: '当前用户权限不足！'
      })
    }
    if (error.response.status === 401) {
      Notice.error({
        title: '未登录',
        desc: '请先登录系统！'
      })
      router.push({
        name: 'login'
      })
    }
    if (error.response.status === 500) {
      Notice.error({
        title: '请求错误',
        desc: '服务器异常！'
      })
    }
    if (error.response.status === 502) {
      Notice.error({
        title: '请求错误',
        desc: '服务器异常！'
      })
    }
    if (error.response.status === 404) {
      Notice.error({
        title: '请求错误',
        desc: '未知请求地址！'
      })
    }
    return Promise.reject(error)
  }
)

// 将客制化的axios实例重新封装成一个plugin,所有组件可以通过this.$axios调用
const AxiosPlugin = {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$axios', {
      value: Axios
    })
  }
}

export {
  AxiosPlugin,
  Axios
}
