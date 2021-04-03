<!--
  商品详情页的轮播图
  Author: pxz
  Email: buffll@foxmail.com
  2021-04-03 10:11
-->
<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "@/components/common/swiper";

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      /**商品详情页的轮播图*/
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
