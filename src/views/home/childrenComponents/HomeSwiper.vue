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
          <img :src="item.image" alt="" @load="imageLoad">
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
  data(){
    return {
      /**轮播图是否加载,默认为false*/
      isLoad :false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    /**
     * 监听轮播图是否加载完成<br/>
     * 用于TabControl的吸顶效果
     */
    imageLoad() {
      //轮播图是主要影响因素,轮播图加载的较慢,但是也能对其他图片进行监听,这里就以轮播图为例
      if (!this.isLoad){
        this.$emit('swiperImagerLoad')
        this.isLoad = true //这个事件只发出一次就可以,没必要每个轮播图都计算高度,影响性能,但是这里也没必要使用防抖
      }
    }
  }
};
</script>

<style scoped>

</style>
