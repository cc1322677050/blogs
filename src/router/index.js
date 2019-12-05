import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {path:'/home',component:()=>import('@/views/home/index'), hidden:true},
  {path: '/login', component: () => import('@/views/login/index'), hidden:true},
  {path: '/register', component:() => import('@/views/register/index'), hidden:true}
]

export default new Router({
  routes: constantRouterMap
})
