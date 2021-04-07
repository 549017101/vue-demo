<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!--商品列表-->
    <cart-list/>

    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import CartList from "@/views/cart/childrenComponents/CartList";
  import CartBottomBar from "@/views/cart/childrenComponents/CartBottomBar";

  //mapGetters是vuex提供的一种辅助函数,可以将vuex的getters中的内容映射成(局部)计算属性直接使用
  import {mapGetters} from 'vuex' //直接从vuex中导入

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      //这里就会将getters中的所有内容解构成计算属性
      //有两种语法:
      //...mapGetters(['cartLength','cartList'])  //传入数组的方式,只能使用getters中定义好的名字

      ...mapGetters({
        //传入对象的方式就可以为getters中的内容起别名
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: #FF8C00;
    color: #fff;
  }
</style>
