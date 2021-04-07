<!--
  悬浮窗组件
  Author: pxz
  Email: buffll@foxmail.com
  2021-04-07 17:16
-->
<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return {
        /**提示信息*/
        message: '',
        /**是否显示提示框*/
        show: false
      }
    },
    methods: {
      /**
       * 是否显示提示框
       * @param msg 提示信息
       * @param duration 过期时间,过期后不显示
       */
      toastShow(msg, duration){
        this.show = true
        this.message = msg

        setTimeout(() => {
          this.show = false
          this.message = ''
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;

    width: 180px;
    text-align: center;

    z-index: 999;

    color: #fff;
    background-color: rgba(0,0,0,.6);
  }
</style>
