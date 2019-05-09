// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/index.js'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
axios.defaults.withCredentials=true;
import axios from 'axios'
Vue.prototype.axios=axios
// 防止请求数据缓存   方案一
axios.create({
  timeout:5000,
  withCredentials:true,//表示跨域请求是否使用凭证
  headers:{
    'Content-Type':'application/json',
    'Cache-control':'no-cache'
  }
})
// 方案二
// axios.interceptors.request.use(
//   config=>{
//     if(config.method=="post"){
//       config.data={
//         ...config.data,
//         _t:Date.parse(new Date())/1000
//       }
//     }else if(config.method=='get'){
//         config.params={
//           _t:Date.parse(new Date())/1000,
//           ...config.params
//         }
//     }
//     return config
//   },function (error){
//     return Promise.reject(error)
//   }
// )







import echarts from 'echarts'
Vue.prototype.$echarts = echarts



// 编辑

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)


Vue.use(ElementUI,{size:'small',zIndex:3000})
/* eslint-disable no-new */
new Vue({
  router,
store
}).$mount("#app")
