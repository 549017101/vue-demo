<!--
  项目主页的轮播图
  Author: pxz
  Email: buffll@foxmail.com
  2021-03-28 21:59
-->
<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>

//这属于Home组件的子组件,详细的逻辑放在这里面,Home.vue 组件中只放最核心的东西
import {Swiper, SwiperItem} from "@/components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>

</style>
