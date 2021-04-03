<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"
                 @tabClick="tabClick" ref="tabControlTop" v-show="isTabControlFixed"/>

    <scroll class="content" ref="scroll" @scroll="contentScroll"
            :probe-type="3" :pull-up-load="true" @pullingUp="loadMore">
      <!--实现滚动必须要给这个滚动组件设置一个高度-->
      <home-swiper :banners="banners" @swiperImagerLoad="swiperImagerLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabControl"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <!--
      组件是不能直接监听点击事件的,需要使用 @click.native
      当需要监听一个组件的原生事件时,必须要给对应的事件加上 .native 修饰符,才能进行监听
    -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";

  import HomeSwiper from "./childrenComponents/HomeSwiper";
  import HomeRecommendView from "@/views/home/childrenComponents/HomeRecommendView";
  import HomeFeatureView from "@/views/home/childrenComponents/HomeFeatureView";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";
  import BackTop from "@/components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "@/network/HomeNetWork";
  import {debounce} from "@/common/utils";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return {
        /**轮播图*/
        banners: [],
        /**首页推荐*/
        recommends: [],

        /**首页展示的商品数据,包括 流行,新款,精选 三类数据,<br/>
         * 默认请求第一页的数据
         */
        goods: {
          /**首页流行数据*/
          'pop': {
            /**起始页*/
            page: 0,
            /**当前分类下的数据*/
            list: []
          },
          /**首页新款数据*/
          'new': {
            page: 0,
            list: []
          },
          /** 首页精选数据 */
          'sell': {
            page: 0,
            list: []
          }
        },

        /**当前所属的类型, 默认为: 流行*/
        currentType : 'pop',
        /**是否显示回到顶部的按钮,默认不显示*/
        isShowBackTop: false,
        /** tabControl 的偏移量,用于其吸顶效果*/
        tabOffsetTop: 0,
        /**tabControl 是否需要吸顶效果,默认为false*/
        isTabControlFixed: false,
        /**记录离开当前页面时此刻所处的位置, 默认为0*/
        saveY: 0
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata();

      //2.请求商品数据,获取三种不同分类的数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {

      const debounceRefresh = debounce(this.$refs.scroll.refreshScroll,100)

      //1.监听商品详情的item中图片的加载状态
      //使用$bus(事件总线)的 $on 监听图片加载完成后发射的事件
      this.$bus.$on('itemImageLoad',() => {
        // 初次加载时,高度是确定的,所以better-scroll可以滚动的高度也是确定的
        // 但由于商品详情中的图片加载是异步的,所以在组件创建好了以后可能图片还没有请求到
        // 此时高度已经是确定的了,若此时图片加载完毕,由于图片的存在,滚动区域的高度就会改变
        // 但是初次加载时better-scroll记录的高度是要小于此时有图片的高度的,所以就会出现无法继续往下滚动的bug
        // 解决方式就是使用 $bus(事件总线),事件总线类似于Vuex,它起到一个沟通桥梁的作用
        // 就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件，所以组件都可以上下平行地通知其他组件
        // vue中直接使用$bus是undefined,需要在main.js中使用vue的原型为其赋值
        // Vue.prototype.$bus = new Vue(),  Vue实例也是可以作为事件总线使用的

        //this.$refs.scroll.refresh() //一定要在mounted中监听,这样才能保证$refs.scroll是有值的

        //直接使用refresh()会导致调用过于频繁,所以使用防抖函数进行封装
        //防抖函数会返回一个新的函数,之后在调用非常频繁的时候,就使用新生成的函数
        //这个新函数并不会频繁调用,若下一次执行来的很快,则就会将上一次执行取消掉,这两次就一起执行
        debounceRefresh() //这里调用的是使用防抖函数处理之后的函数
      });

      //2.获取tabControl的offsetTop
      //所有的组件中都有一个属性 $el,这个属性使用来获取组件中的元素的
      //直接this.$refs.tabControl 这样使用,获取到的是组件,组件是没有offsetTop属性的,这是元素的属性
      //但是直接 this.$refs.tabControl.$el.offsetTop 这样获取也是不对的,这样获取到的是图片还未加载时的高度
      //获取正确值的方法: 在HomeSwiper中监听img的加载是否完成,加载完后,发出事件,再获取正确的OffsetTop
      //this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
    activated() {
      //进入组件时执行

      //要想实现切换页面前后还保留原来的位置和状态等信息,就要设置一个浏览位置
      //切换时保存当前的浏览位置,切换回来的时候再将页面跳到所保存的位置即可
      this.$refs.scroll.scrollToPage(0, this.saveY, 1)
      this.$refs.scroll.refreshScroll()
    },
    deactivated() {
      //离开组件时执行
      this.saveY = this.$refs.scroll.getScrollPosition();
    },
    computed: {
      /**
       * 展示商品
       */
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    methods: {
      /**
       * 获取首页的多个数据<br/>
       * 这是属于Home组件的方法,内部调用网络请求
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },

      /**
       * 根据不同的分类获取首页展示的商品数据
       * @param type 当前所属的分类
       */
      getHomeGoods(type){
        const page = this.goods[type].page + 1; //当前页码,方便复用
        getHomeGoods(type,page).then(res => {
          res = res.data //需要调用两次 data 才能获取到详细数据,原因暂时不知道(可能接口的问题?),所以这里提前赋值一下

          //这种语法可以将多个数组内容添加到新的数组中,原理类似于可变参数
          this.goods[type].list.push(...res.data.list);

          this.goods[type].page += 1; //页码 +1

          //使用上拉加载更多时,必须要调用这个方法,否则只能获取一次数据
          this.$refs.scroll.finishPullUp();
        })
      },

      /**
       * 针对选中的类型加载更多数据(上拉加载更多)
       */
      loadMore(){
        this.getHomeGoods(this.currentType)
        //这里需要手动进行刷新,否则会出现无法下拉的bug,这是由于高度计算产生的问题
        this.$refs.scroll.refreshScroll()
      },

      /**
       * 点击切换分类,并加载该分类下所有数据<br/>
       * 这里的分类指的是首页展示的分类, 流行,新款,精选
       * @param index 当前分类的索引值
       */
      tabClick(index){
        switch (index){
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }

        //将两个tabControl的点击状态保持一致
        this.$refs.tabControlTop.currentIndex = index
        this.$refs.tabControl.currentIndex = index
      },

      /**
       * 回到顶部按钮的点击事件
       */
      backTopClick(){
        //scrollToPage()是 betterScroll中的一个方法,前两个参数表示要返回到的坐标,第三个参数是在多少毫秒内完成
        this.$refs.scroll.scrollToPage(0,0,1500)
      },

      /**
       * 监听内容发生滚动时的事件
       */
      contentScroll(position){
        //1.判断BackTop是否显示
        //position是坐标,坐标在浏览器中都是负值
        this.isShowBackTop = (-position.y) > 500

        //2.决定tabControl是否吸顶(是否给他一个属性 position:fixed)
        this.isTabControlFixed = (-position.y) > this.tabOffsetTop
        //之后再根据 isTabControlFixed 这个属性动态绑定class定义样式即可
      },

      /**
       * 监听轮播图是否加载完成<br/>
       * 用于TabControl的吸顶效果
       */
      swiperImagerLoad() {
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh; /* vh: viewport height : 表示视窗高度*/
    position: relative;
  }

  .home-nav {
    /*background-color: var(--color-tint);*/
    background-color: #FF8C00;
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
