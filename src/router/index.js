import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
Vue.use(Router)

export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden:true},
  {path: '/register', component:() => import('@/views/register/index'), hidden:true},
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
    children: [{
      path: 'info',
      name: 'info',
      component: () => import('@/views/user/index'),
      meta: {title: '个人用户', icon: 'home'}
    }]
  },

]

export default new Router({
  routes: constantRouterMap
})
