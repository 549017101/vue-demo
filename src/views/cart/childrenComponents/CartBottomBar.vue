<!--
  购物车底部工具栏
  Author: pxz
  Email: buffll@foxmail.com
  2021-04-07 12:04
-->
<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "@/components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),

      /**
       * 当前购物车内所选商品的总价格
       */
      totalPrice() {
        return "￥" + this.cartList.filter(item => {
          return item.checked; //只有处于选中状态才计算价格
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2);
      },
      /**
       * 当前选中的商品个数
       */
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    background-color: #eee;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    text-align: center;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    text-align: center;
    flex: 1;
  }

  .calculate {
    background-color: orange;
    text-align: center;
    width: 90px;
  }
</style>
