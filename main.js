import App from './App'
import uView from 'uview-ui'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

//服務器文件的基礎信息
Vue.prototype.BaseFileURL = 'http://ts.lagou.uieee.com/api/v2/files/'

Vue.use(uView)
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif