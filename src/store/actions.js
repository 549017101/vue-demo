/**
 * Vuex actions
 * Author: pxz
 * Email: buffll@foxmail.com
 * 2021-04-07 9:08
 */

import {ADD_COUNT,ADD_TO_CART} from "@/store/mutations-types";

export default {
  /**
   * 将商品添加到购物车
   * @param context
   * @param payload 新添加的商品
   */
  addCart(context, payload) {
    return new Promise((resolve,reject) => {
      //查找之前的数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      //判断oldProduct是否有值
      if (oldProduct) {
        //商品数量+1
        // oldProduct.count += 1
        context.commit(ADD_COUNT, oldProduct);
        resolve("添加成功 当前商品数量+1")
      } else {
        //添加新商品
        payload.count = 1;
        // context.cartList.push(payload)
        context.commit(ADD_TO_CART, payload);
        resolve("添加成功")
      }
    })
  }
};
