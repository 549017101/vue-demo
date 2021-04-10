<template>
	<div id="app">
    <keep-alive exclude="Detail">
      <!--keep-alive 是Vue提供的一个抽象组件,用来对组件进行缓存,从而节省性能-->
      <!--需要记录用户当前浏览的位置和状态,在切换到别的页面后,再切换回来,需要回到原来的状态和位置,这就需要用keep-alive对组件缓存-->
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
    <icon></icon>
    <svg-icon></svg-icon>
	</div>
</template>

<script>
  import MainTabBar from "@/components/content/mainTabbar/MainTabBar";
  import Icon from "@/components/content/Icon/Icon";
  import SvgIcon from "@/components/content/Icon/svg";

  export default {
    name: "App",
    components:{
      MainTabBar,
      Icon,
      SvgIcon
    }
  };
</script>

<style>
	/*这里使用了配置过别名的路径进行引用*/
	@import "assets/css/base.css";

  * {
    /*使用fastclick时,需要用这个属性,否则谷歌浏览器会报错*/
    touch-action: none;
  }

  #app {
    position: relative;
  }
</style>
