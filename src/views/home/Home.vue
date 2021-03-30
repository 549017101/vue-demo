<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content">
      <!--实现滚动必须要给这个滚动组件设置一个高度-->
      <home-swiper :banners="banners"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
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

  import {getHomeMultidata, getHomeGoods} from "@/network/HomeNetWork";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      GoodsList,
      Scroll
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
        currentType : 'pop'
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据,获取三种不同分类的数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
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
          console.log(res);
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },
      /**
       * 获取首页展示的商品数据
       * @param type 当前所属的分类
       */
      getHomeGoods(type){
        const page = this.goods[type].page + 1; //当前页码,方便复用
        getHomeGoods(type,page).then(res => {
          res = res.data //需要调用两次 data 才能获取到详细数据,原因暂时不知道(可能接口的问题?),所以这里提前赋值一下

          //这种语法可以将多个数组内容添加到新的数组中,原理类似于可变参数
          this.goods[type].list.push(...res.data.list);

          this.goods[type].page += 1; //页码 +1
        });
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
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
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
</style>
