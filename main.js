import App from './App'
import uView from 'uview-ui'

// #ifndef VUE3
import Vue from 'vue'
// 引入 store 
import store from '@/store/index.js'
Vue.config.productionTip = false
App.mpType = 'app'

//服務器文件的基礎信息
Vue.prototype.BaseFileURL = 'http://ts.lagou.uieee.com/api/v2/files/'
// 引入公用组件 登陆模块
import login from "@/components/login/login.vue";
Vue.component("login", login);
// 引入公用组件 分享组件
import gotoShare from "@/components/gotoShare/gotoShare.vue";
Vue.component("goto-share", gotoShare);

Vue.use(uView)
const app = new Vue({
    ...App,
	store
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