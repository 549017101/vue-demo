<!--
  选中按钮组件
  Author: pxz
  Email: buffll@foxmail.com
  2021-04-07 10:18
-->
<template>
  <div class="check-button" :class="{check : isChecked}">
    <img src="~assets/img/cart/tick.svg" >
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      /**
       * 当前按钮是否处于被选中状态
       */
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .check {
    border-color: red;
    background-color: red;
  }
</style>
