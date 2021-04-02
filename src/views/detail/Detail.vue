<!--
  商品详情组件
  Author: pxz
  Email: buffll@foxmail.com
  2021-04-02 16:56
-->
<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childrenComponents/DetailNavBar";

  export default {
    name: "Detail",
    components: {
      DetailNavBar
    },
    data(){
      return {
        /**商品id*/
        iid: null
      }
    },
    created() {
      this.iid = this.$route.params.iid
    }
  }
</script>

<style scoped>

</style>
