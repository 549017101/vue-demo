<!--
  商品详情组件
  Author: pxz
  Email: buffll@foxmail.com
  2021-04-02 16:56
-->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>

    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
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
  import DetailBottomBar from "@/views/detail/childrenComponents/DetailBottomBar";

  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";

  import {getDetailData, getRecommend, Goods, Shop, GoodsParam} from "@/network/DetailNetWork";
  import {itemListenerMixin,backTopMixin} from "@/common/mixin";
  import {debounce} from "@/common/utils";
  import {BACKTOP_DISTANCE} from "@/common/const";

  import {mapActions} from 'vuex'

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
      DetailBottomBar,
      GoodsList,
      Scroll
    },
    mixins: [itemListenerMixin,backTopMixin],
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
        /**详情页顶部导航栏所包含的分类所对应的内容的纵坐标*/
        typeTopYs: [],
        /**该函数是用来对获取分类所对应的内容的纵坐标时的防抖函数*/
        getTypeBarTopY: null,
        /**记录当前滚动的位置属于导航栏哪一个分类*/
        currentIndex: 0
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


        //this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
        // this.$nextTick(() => {
        //   //直接获取这些部分的纵坐标可能会出错,因为会出现组件没有渲染完成的问题,
        //   // Vue 中数据渲染和DOM 元素渲染是异步的
        //   // 在DOM 元素渲染未完成的情况下，去操作DOM元素就会出现问题。this.$nextTick 可解决此问题。
        //   //此时只有DOM元素被渲染出来了,但是图片可能还没有加载完,计算高度的时候没有将图片算在内所以可能会出现offsetTop值不对的情况
        //   this.typeTopYs = []
        //   this.typeTopYs.push(0)
        //   this.typeTopYs.push(this.$refs.param.$el.offsetTop)
        //   this.typeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.typeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //
        // })
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.data.list
      })

      //4.对getTypeBarTopY 赋值(防抖)
      this.getTypeBarTopY = debounce(() => {
        this.typeTopYs = []
        this.typeTopYs.push(0)
        this.typeTopYs.push(this.$refs.param.$el.offsetTop)
        this.typeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.typeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.typeTopYs.push(Number.MAX_VALUE) //这一步是为了简化联动效果的判断条件
      },100)
    },
    mounted() {
      //这里使用了混入,但是 methods 里面的内容不能使用混入,否则会被覆盖,生命周期才能用混入
    },
    destroyed() {
      //Detail组件被排除在了keep-alive之外(App.vue),所以 destroyed() 肯定会被调用
      this.$bus.$off('itemImgLoad',this.itemImgListener) //离开组件时取消事件
    },
    methods: {
      ...mapActions(['addCart']),

      /**
       * 监听图片加载是否完成
       */
      imageLoad(){
        this.$refs.scroll.refreshScroll()
        this.getTypeBarTopY() //当图片加载完后,获取分类纵坐标(使用了防抖函数)
      },

      /**
       * 详情页导航栏的点击事件<br/>
       * 点击导航栏的分类,滚动到对应的分类区域
       * @param index 导航栏选项的索引
       */
      titleClick(index){
        //滚动到对应区域,注意,滚动时,纵坐标都是负值
        this.$refs.scroll.scrollToPage(0,-this.typeTopYs[index],500)
      },

      /**
       * 监听滚动事件,实现导航栏和内容的联动效果,并决定是否显示BackTop
       * @param position 当前的位置信息
       */
      contentScroll(position){
        //该方法在使用的时候需要传入一个probe-type,否则无法监听滚动

        //判断BackTop是否显示
        this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE

        //获取Y值
        const positionY = -position.y

        //根据获取到的Y值与导航栏中获取到的坐标进行对比
        let length = this.typeTopYs.length
        for (let i = 0; i < length - 1; i++){
          if(this.currentIndex !== i && (positionY >= this.typeTopYs[i] && positionY < this.typeTopYs[i + 1])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },

      /**
       * 添加购物车
       */
      addToCart(){
        //获取购物车中需要展示的信息,并添加
        const product = {}
        product.iid = this.iid //必须要传入商品id
        product.image = this.topImages
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice

        //将商品添加到购物车
        //dispatch可以返回一个Promise
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        //   this.show = true
        //   this.message = res
        //
        //   setTimeout(() => {
        //     this.show = false
        //     this.message = ''
        //   },1500)
        // })

        this.addCart(product).then(res => {
          //这段代码和上面的一样,只不过是使用了 vuex提供的mapActions辅助函数进行了映射
          this.$toast.toastShow(res,1500)
        })
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
    height: calc(100% - 44px - 49px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }
</style>
