<!--
  Detail组件的NavBar
  Author: pxz
  Email: buffll@foxmail.com
  2021-04-02 17:11
-->
<template>
  <div>
    <nav-bar>
      <div slot="left" class="back"  @click="backClick">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="barTitles">
        <div class="barTitles-item" :class="{active : index === currentIndex}"
             v-for="(item,index) in barTitles" @click="barTitlesClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        /**详情页导航栏的标题*/
        barTitles: ['商品','参数','评论','推荐'],
        /**记录当前选中状态*/
        currentIndex: 0
      }
    },
    methods: {
      /**
       * 详情页导航栏的点击事件
       */
      barTitlesClick(index){
        this.currentIndex = index
      },

      /**
       * 返回上一页按钮的点击事件
       */
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .barTitles {
    display: flex;
    font-size: 13px;
  }

  .barTitles-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back{
    margin-top: 6px;
  }
</style>
