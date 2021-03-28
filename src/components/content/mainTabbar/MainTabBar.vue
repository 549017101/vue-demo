<!--
  Author: pxz
  Email: buffll@foxmail.com
  2021-03-28 15:03
-->
<template>
  <div>
    <tab-bar> <!--这种方式是Vue里面的驼峰,虽然没有定义 tab-bar 这个标签,但是注册的组件是驼峰,可以用短横线代替-->

      <!--可以选择是否传入 activeColor属性,来设置处于活跃状态的文字颜色,这个属性是组件中定义的-->
      <tab-bar-item path="/home"><!--prop也可以接受静态属性,这里的path和activeColor都是静态属性-->
        <!--使用具名插槽-->
        <!--这里的路径使用了别名,路径别名在webpack.base.conf.js中可以配置-->
        <!--如果是在html标签中使用了配置别名的路径,就要在路径前面加上 ~ 否则找不到,但是在js代码中的import中,就不需要了-->
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="home">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="home_active">
        <div slot="item-text">首页</div>
      </tab-bar-item>

      <tab-bar-item path="/category">
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="category">
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="category_active">
        <div slot="item-text">分类</div>
      </tab-bar-item>

      <tab-bar-item path="/cart">
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="shopcart">
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="shopcart_active">
        <div slot="item-text">购物车</div>
      </tab-bar-item>

      <tab-bar-item path="/profile">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="profile">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="profile_active">
        <div slot="item-text">我的</div>
      </tab-bar-item>

    </tab-bar>
  </div>
</template>

<script>
  import TabBar from "@/components/common/tabbar/TabBar";
  import TabBarItem from "@/components/common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components:{
      TabBar,TabBarItem
    }
  }
</script>

<style scoped>

</style>
