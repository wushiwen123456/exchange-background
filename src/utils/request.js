import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// 导入静态地址
import { baseUrl } from '@/assets/const/index'

export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: baseUrl
  })

  //2.axios的拦截器
  //2.1.请求拦截的作用
  instance.interceptors.request.use(
    config => {
      config.headers.token = window.localStorage.getItem(
        'Authorization-bgSafex'
      )
      return config
    },
    err => {
      console.log(err)
    }
  )

  //2.2 响应拦截
  instance.interceptors.response.use(
    res => {
      if (res && res.data) {
        switch (res.data.code) {
          case 200:
            return res.data
          case 400:
            Message({
              type: 'error',
              message: res.data.msg
            })
            return res.data
          case 402:
            Message({
              type: 'error',
              message: res.data.msg
            })
            return store.commit('logOut')
          default:
            Message({
              type: 'error',
              message: res.data.msg
            })
            return res.data.msg
        }
      } else {
        console.log(res)
      }
    },
    err => {
      console.log(err)
    }
  )

  //发送真正的网络请求
  return instance(config)
}
