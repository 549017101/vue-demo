<!--
  导航栏
  Author: pxz
  Email: buffll@foxmail.com
  2021-03-28 15:47
-->
<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  };
</script>

<style scoped>
  .nav-bar {
    display: flex;
    line-height: 44px;
    height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }

  .left ,.right {
    width: 60px;
  }

  .center{
    /*一旦其他有确定宽度,而这里使用 flex 1 就可以将剩余部分填满*/
    flex: 1;
  }
</style>
