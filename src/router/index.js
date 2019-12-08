import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
Vue.use(Router)

export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden:true},
  {path: '/register', component:() => import('@/views/register/index'), hidden:true},
  {path:'/write',component:()=>import("@/views/blog/index"),hidden:true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: '/info',
    meta: {title: '我的工作台', icon: 'product'},
    children: [
    {
      path: 'controller',
      name: 'controller',
      component: () => import('@/views/controller/index'),
      meta: {title: '控制台', icon: 'home'}
    },
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/controller/user/index'),
      meta: {title: '我的信息', icon: 'home'}
    },
    ]
  },
]

export default new Router({
  routes: constantRouterMap
})
