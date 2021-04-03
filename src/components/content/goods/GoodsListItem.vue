<!--
  商品列表所包含的商品项
  Author: pxz
  Email: buffll@foxmail.com
  2021-03-30 15:32
-->
<template>
  <div class="goods-item" @click="itemClick">
    <!--在Vue中,可以使用 @load 来对图片的加载状态进行监听-->
    <img :src="showImgae" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    /**商品项*/
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    /**
     * 根据不同应用场景决定展示图片的数据
     */
    showImgae(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    /**
     * 监听图片的加载状态
     */
    imageLoad() {
      //将这个事件交给事件总线进行管理(这里是发射给了Home组件),使用$emit方法
      //这样就能在Home组件创建完成时调用,就可以实时监听图片的加载状态
      this.$bus.$emit('itemImageLoad')
    },

    /**
     * 商品详情的点击事件(跳转到商品详情)
     */
    itemClick(){
      //这里最好用push()方法,便于返回上一页
      this.$router.push('/detail/' + this.goodsItem.iid) //这里使用了动态路由,将所点击的商品的id传过来
    }
  }
};
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
