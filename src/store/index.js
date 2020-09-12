import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { Message } from 'element-ui'
// 导入一些请求方法
import { login } from '@/api'
import { getUserMenus } from '@/api'
// 导入配置路由方法
import { handleUserPath } from '@/utils/handleUserPath'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Authorization: window.localStorage.getItem('Authorization-bgSafex'),
    userRouters: [],
    right: '' //
  },
  mutations: {
    // 保存token
    setToken(state, token) {
      state.Authorization = token
      window.localStorage.setItem('Authorization-bgSafex', token)
    },
    logOut(state) {
      state.Authorization = ''
      state.userRouters = []
      window.localStorage.removeItem('Authorization-bgSafex')
    },
    // 保存用户路由
    setUserRouters(state, data) {
      state.userRouters = data
    },
    // 保存用户权限
    setRight(state, data) {
      state.right = data
    }
  },
  getters: {
    loginStatus: state => state.Authorization,
    isUserRouter: state => state.userRouters,
    isRight: state => state.right
  },
  actions: {
    login({ commit }, payload) {
      const { data, fn } = payload
      login(data).then(res => {
        if (res.code != 200) {
          return fn()
        }
        commit('setToken', res.data)
        window.localStorage.setItem('loginInfo-bgSafex', JSON.stringify(data))
        router.push('/home')
      })
    },
    async getUserRouter({ commit, state }) {
      if (state.Authorization) {
        const res = await getUserMenus(state.Authorization)
        if (res.code == 200) {
          const { data } = res
          commit('setRight', data)
          const list = handleUserPath(data)
          commit('setUserRouters', list)
          return list
        } else {
          return new Error('network error')
        }
      } else {
        return new Error('no token')
      }
    }
  },
  modules: {}
})
