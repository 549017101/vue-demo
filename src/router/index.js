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

//解决路由重复问题(具体表现为 多次点击底部菜单就会报错,但不影响使用)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//2.创建router
const routes = [
  {
    path: "/",
    //redirect: "/home"
    component: Home,
    meta:{
      title:'首页'
    }
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
      title:'我的商城'
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


