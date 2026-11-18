import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import MyOrder from '@/views/myorder'
import Pay from '@/views/pay'
import ProDetail from '@/views/prodetail'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import Category from '@/views/layout/category.vue'
import Home from '@/views/layout/home.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User },
      ]
    },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    // 动态路由传参，确认将来是哪个商品，路由参数中携带 id
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/search', component: Search },
    { path: '/search/list', component: SearchList }
  ]
})
export default router
