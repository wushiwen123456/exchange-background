import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入全局路由配置
import '@/config/permission.js'

import './plugins/element.js'

// 导入字体图标
import './assets/font/iconfont.css'

// 导入全局样式表
import './assets/css/global.css'

Vue.config.productionTip = false

import { formatDate } from '@/utils/formatDate'
// 全局时间格式化插槽
Vue.filter('capitalizeTime', (timestemp, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  return formatDate(new Date(timestemp * 1000), fmt)
})

// 导入静态地址
import { baseUrl } from '@/assets/const/index'

import store from './store'
Vue.prototype.$baseUrl = baseUrl

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 网页标题
import { HTML_title } from '@/assets/const'
document.title = HTML_title
