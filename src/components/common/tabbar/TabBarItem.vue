<!--
  Author: pxz
  Email: buffll@foxmail.com
  2021-03-28 15:03
-->
<template>
  <div class="tab-bar-item" @click="itemClick">
    <!--涉及到插槽的属性替换最好在外边套一层div，在这个div上进行替换，避免插槽的某些属性被替换掉-->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot> <!--这个插槽用于替换活跃状态的tabbar-->
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor:{
      type: String,
      default: 'red'
    }
  },
  computed:{
    isActive(){
      //$route表示当前处于活跃状态的路由,通过$route.path获取当前活跃的路由的路径,并调用indexOf方法与所传入的路径进行比较
      //indexOf() 如果没有找到,则返回-1,所以这里要用 !== -1
      //这样可以动态改变isActive的值
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick(){
      this.$router.push(this.path)
    }
  }
};
</script>

<style scoped>
  .tab-bar-item {
    flex: 1; /*设置多个flex均等分*/
    text-align: center;
    height: 49px; /*Tabbar的高度一般都是49px*/
    font-size: 14px;
  }

  .tab-bar-item img {
    /* 设置图片大小 */
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle; /*去掉img标签的额外像素*/
  }
</style>
