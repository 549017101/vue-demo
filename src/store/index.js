/**
 * Vuex相关
 * Author: pxz
 * Email: buffll@foxmail.com
 * 2021-04-06 21:54
 */

import Vue from "vue";
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const store = new Vuex.Store({
  state: {
    /**购物车的商品列表*/
    cartList: []
  },
  mutations: {
    /**
     * 将商品添加到购物车
     * @param state
     * @param payload 新添加的商品
     */
    addCart(state,payload){
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)

      //判断oldProduct是否有值
      if(oldProduct){
        oldProduct.count += 1
      }else {
        payload.count = 1
        state.cartList.push(payload)
      }
    }
  }
})

//3.将store挂载到vue实例上
export default store
