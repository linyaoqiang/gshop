import Vue from 'vue'
import VueRouter from 'vue-router'


/*import Home from '../pages/home/Home.vue'
import Search from '../pages/search/Search.vue'
import Order from '../pages/order/Order.vue'
import Profile from '../pages/profile/Profile.vue'*/
import Login from '../pages/login/Login'
import Shop from  '../pages/shop/Shop'


//用于实现懒加载  ，其会不包含在整个路由的js中，当需要用到时，就会发送请求获取对应路由组件的代码
const Home = ()=>import('../pages/home/Home.vue')
const Search = ()=>import('../pages/search/Search.vue')
const Order  = ()=>import('../pages/order/Order.vue')
const Profile = ()=>import('../pages/profile/Profile.vue')


import ShopGoods from '../pages/shop/shop-goods/ShopGoods'
import ShopRatings from  '../pages/shop/shop-ratings/ShopRating'
import ShopInfo from '../pages/shop/shop-info/ShopInfo'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: 'goods',
          component: ShopGoods
        },
        {
          path: 'ratings',
          component: ShopRatings
        },
        {
          path: 'info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: 'goods'
        }
      ]
    }
  ]
})
