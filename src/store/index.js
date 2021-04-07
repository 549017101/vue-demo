/**
 * Vuex相关
 * Author: pxz
 * Email: buffll@foxmail.com
 * 2021-04-06 21:54
 */

import Vue from "vue";
import Vuex from 'vuex'
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const state = {
  /**购物车的商品列表*/
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

//3.将store挂载到vue实例上
export default store
