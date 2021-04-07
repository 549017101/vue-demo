/**
 * 对state中存储的数据进行过滤操作
 * Author: pxz
 * Email: buffll@foxmail.com
 * 2021-04-07 9:24
 */

//可以理解为 getters 是store的计算属性

export default {
  /**
   * 购物车内的商品数
   * @param state
   * @returns {number}
   */
  cartLength(state) {
    return state.cartList.length
  },

  /**
   * 购物车的商品列表
   * @param state
   * @returns {*}
   */
  cartList(state) {
    return state.cartList
  }
}
