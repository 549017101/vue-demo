<!--
  商品详情组件
  Author: pxz
  Email: buffll@foxmail.com
  2021-04-02 16:56
-->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childrenComponents/DetailNavBar";
  import DetailSwiper from "@/views/detail/childrenComponents/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childrenComponents/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childrenComponents/DetailShopInfo";
  import DetailGoodsInfo from "@/views/detail/childrenComponents/DetailGoodsInfo";
  import DetailParamInfo from "@/views/detail/childrenComponents/DetailParamInfo";
  import DetailCommentInfo from "@/views/detail/childrenComponents/DetailCommentInfo";

  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";

  import {getDetailData, getRecommend, Goods, Shop, GoodsParam} from "@/network/DetailNetWork";
  import {itemListenerMixin} from "@/common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      Scroll
    },
    mixins: [itemListenerMixin],
    data(){
      return {
        /**商品id*/
        iid: null,
        /**商品详情页的轮播图*/
        topImages: [],
        /**商品详细信息*/
        goods: {}, //这里默认是一个空对象,如果默认为null的话,首次加载就会出问题
        /**店铺信息*/
        shop: {},
        /**商品详情数据(下拉显示的详情数据)*/
        detailInfo: {},
        /**商品参数信息*/
        paramInfo: {},
        /**评论信息*/
        commentInfo: {},
        /**推荐数据*/
        recommends: [],
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详细的数据
      getDetailData(this.iid).then(res => {
        const data = res.data.result

        //获取顶部的轮播图
        this.topImages = data.itemInfo.topImages

        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //保存商品的详情数据
        this.detailInfo = data.detailInfo

        //获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //获取评论信息
        if (data.rate.cRate !==0){
          //只取一条数据
          this.commentInfo = data.rate.list[0]
        }
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.data.list
      })
    },
    mounted() {
      //这里使用了混入
    },
    destroyed() {
      //Detail组件被排除在了keep-alive之外(App.vue),所以 destroyed() 肯定会被调用
      this.$bus.$off('itemImgLoad',this.itemImgListener) //离开组件时取消事件
    },
    methods: {
      /**
       * 监听图片加载是否完成
       */
      imageLoad(){
        this.$refs.scroll.refreshScroll()
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh; /*vh就表示当前视窗高度*/
  }

  .content {
    /*若想使用better-scroll实现滚动,必须要给滚动组件一个固定高度*/
    /*这里的 100% 是相对于父元素的,所以必须要给父元素(#detail)也设置一个固定的高度*/
    height: calc(100% - 44px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }
</style>
