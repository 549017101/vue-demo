<!--
  商品列表展示组件
  Author: pxz
  Email: buffll@foxmail.com
  2021-03-30 15:31
-->
<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "@/components/content/goods/GoodsListItem";

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      /**商品列表所展示的商品数据(和Home组件中的goods属性功能一样)*/
      goods: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  };
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>
