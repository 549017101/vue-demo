/**
 * Vuex mutations
 * Author: pxz
 * Email: buffll@foxmail.com
 * 2021-04-07 9:06
 */

import {ADD_COUNT,ADD_TO_CART} from "@/store/mutations-types";

export default {
  //mutations唯一的目的就是修改state中的状态,mutations中每一个方法尽可能完成的事情比较单一
  /**
   * 添加购物车时,商品数量加一
   */
  [ADD_COUNT](state, payload) {
    payload.count++;
  },

  /**
   * 添加到购物车
   */
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload);
  }
};
