import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login.vue'
import Manage from '@/components/admin/Manage.vue'
import Home from '@/components/fenglei/Home.vue'
import List from '@/components/fenglei/List.vue'
import Foods from '@/components/fenglei/Foods'
import Userlist from '@/components/fenglei/userlist.vue'
import Merchant from '@/components/fenglei/Merchant.vue'
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
      component: Manage,
      redirect:'/home',
      children:[
        {
          path: '/manage/home',
          component: Home,
        },
        {
          path:'/manage/list',
          component:List
        },
        {
          path:'/manage/foodslist',
          component:Foods
        },
        {
          path:'/manage/userlist',
          component:Userlist
        },
        {
          path:'/manage/merchant',
          component:Merchant
        }
      ]
    }
  ]
})
