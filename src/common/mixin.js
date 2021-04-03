/**
 * 混入功能,用来减少重复代码
 * Author: pxz
 * Email: buffll@foxmail.com
 * 2021-04-03 22:41
 */

import {debounce} from "@/common/utils";

/**
 * item的混入
 */
export const itemListenerMixin = {
  data() {
    return {
      /**用于监听图片是否加载的回调函数*/
      itemImgListener: null
    }
  },
  mounted() {
    //防抖函数
    const debounceRefresh = debounce(this.$refs.scroll.refreshScroll,100)

    this.itemImgListener = ()=>{
      debounceRefresh()
    }

    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}
