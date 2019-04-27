import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/Login.vue'
import Login from '@/components/login/Login.vue'
import Manage from '@/components/admin/Manage.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/manage',
      name: 'Manage',
      component: Manage
    }
  ]
})
