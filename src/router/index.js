/**
   Author: pxz
   Email: buffll@foxmail.com
   2021-03-28 15:10
 */

import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home,
    meta:{
      title:'首页'
    }
  },
  {
    path: "/category",
    component: Category,
    meta:{
      title:'分类'
    }
  },
  {
    path: "/cart",
    component: Cart,
    meta:{
      title:'购物车'
    }
  },
  {
    path: "/profile",
    component: Profile,
    meta:{
      title:'档案'
    }
  },
  {
    path: "/detail/:iid",
    component: Detail,
    meta:{
      title:'商品详情'
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router


