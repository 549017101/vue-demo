<!--
  首页的商品分类的Tab
  Author: pxz
  Email: buffll@foxmail.com
  2021-03-30 14:10
-->
<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item"
         :class="{active : index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
        /**记录当前选中状态*/
        currentIndex: 0
      }
    },
    methods: {
      /**改变选中状态*/
      itemClick(index) {
        this.currentIndex = index;

        //将所点击的时间传递出去(子传父),用以实现点击切换分类,并显示该分类下详细的数据
        this.$emit('tabClick',index)
      }
    }
  };
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;

    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item{
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
