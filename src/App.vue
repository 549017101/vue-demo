<template>
	<div id="app">
    <router-view/>
    <main-tab-bar/>
	</div>
</template>

<script>
  import MainTabBar from "@/components/content/mainTabbar/MainTabBar";

  export default {
    name: "App",
    components:{
      MainTabBar
    }
  };
</script>

<style>
	/*这里使用了配置过别名的路径进行引用*/
	@import "assets/css/base.css";
</style>
