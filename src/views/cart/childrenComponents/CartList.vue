<!--
  购物车列表组件
  Author: pxz
  Email: buffll@foxmail.com
  2021-04-07 9:46
-->
<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in list" :key="index" :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "@/components/common/scroll/Scroll";
  import CartListItem from "@/views/cart/childrenComponents/CartListItem";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters({
        list: 'cartList'
      })
    },
    activated() {
      //添加新的数据之后,需要对组件进行刷新,否则无法滚动
      this.$refs.scroll.refreshScroll()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
