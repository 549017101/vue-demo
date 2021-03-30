<!--
  通用滚动组件
  Author: pxz
  Email: buffll@foxmail.com
  2021-03-30 20:38
-->
<template>
  <div class="wrapper" ref="wrapper">
    <!--定义一个 ref="wrapper" 可以确保获取到的一定是这个元素(在vue中,相同类名的元素的获取容易混淆)-->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data(){
      return {
        scroll: null
      }
    },
    //初始化页面完成后调用的方法
    mounted() {
      //this.$refs.wrapper 这种方式获取到的元素一定是正确的
      this.scroll = new BScroll(this.$refs.wrapper,{

      })
    }
  };
</script>

<style scoped>

</style>
