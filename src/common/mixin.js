/**
 * 混入功能,用来减少重复代码
 * Author: pxz
 * Email: buffll@foxmail.com
 * 2021-04-03 22:41
 */

import {debounce} from "@/common/utils";
import {POP, NEW, SELL} from "@/common/const"
import BackTop from "@/components/content/backTop/BackTop";

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

/**
 * 回到顶部按钮的混入
 */
export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    /**
     * 回到顶部按钮的点击事件
     */
    backTopClick(){
      //scrollToPage()是 betterScroll中的一个方法,前两个参数表示要返回到的坐标,第三个参数是在多少毫秒内完成
      this.$refs.scroll.scrollToPage(0,0,1500)
    }
  }
}

/**
 * 分类页面tabControl的混入
 */
export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
