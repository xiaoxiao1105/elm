import Vue from 'vue'
import Router from 'vue-router'
//路由懒加载
const login =resolve=>require(['@/components/login/Login.vue'],resolve)
const manage=r=>require.ensure([],()=>r(require('@/components/admin/Manage.vue')),'manage')
const userlist=resolve=>require(['@/components/fenglei/userlist.vue'],resolve)
const foodlist=resolve=>require(['@/components/fenglei/Foods'],resolve)
const merchant=resolve=>require(['@/components/fenglei/Merchant.vue'],resolve)
const list=resolve=>require(['@/components/fenglei/List.vue'],resolve)
const adminlist=resolve=>require(['@/components/fenglei/adminlist.vue'],resolve)
const user=resolve=>require(['@/components/add/uesr.vue'],resolve)

// 练习配置路由
const bian=resolve=>require(['@/components/bian/bian.vue'],resolve)
const home=resolve=>require(['@/components/fenglei/homelist.vue'],resolve)
const order=resolve=>require(['@/components/fenglei/orderlist.vue'],resolve)
const addmer=resolve=>require(['@/components/add/addmer.vue'],resolve)
const seclce=resolve=>require(['@/components/selce.vue'],resolve)
const adminset=resolve=>require(['@/components/admin/adminset.vue'],resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path:'/selec',
      component:seclce
    },
    {
      path: '/manage',
      name: '',
      component: manage,
      children:[
        {
          path: '',
          component: home,
        },
        {
          path:'/foodslist',
          component:foodlist,
          meta:{
            title:"数据管理",
            name:"食品列表",
            },
        },
        {
          path:'/adminlist',
          component:adminlist,
          meta:{
            title:'数据管理',
            name:'管理员'
          }
        },
        {
          path:'/userlist',
          component:userlist,
          meta:{
            title:"数据管理",
            name:"用户列表",
            },
        },
        {
          path:'/merchant',
          component:merchant,
          meta:{
            title:"数据管理",
            name:"商家列表",
            },
        },
        {
          path:'/orderlist',
          component:order,
          meta:{
            title:"数据管理",
            name:"订单列表",
            },
        },
        {
          path:'/addmer',
          component:addmer,
          meta:{
            title:"添加数据",
            name:"添加商铺",
            },
        },
        {
          path:'/list',
          component:list,
          meta:{
            title:"添加数据",
            name:"添加商品",
            },
        },
        {
          path:'/list?restaurant_id=/:id',
          component:list,
          meta:{
            title:"添加数据",
            name:"添加商品",
          }
        },
        {
          path:'/user',
          component:user,
          meta:{
            title:"图标",
            name:"用户分布",
            },
        },
        {
          path: '/bian',
          component: bian,
          meta:{
            title:"编辑",
            name:"文本编辑",
            },
        },
        {
          path: '/adminset',
          component: adminset,
          meta:{
            title:"设置",
            name:"管理员设置",
            },
        },
      ]
    }
  ]
})