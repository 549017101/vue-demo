<!--
  通用滚动组件
  Author: pxz
  Email: buffll@foxmail.com
  2021-03-30 20:38
-->
<template>
  <div class="wrapper" ref="wrapper">
    <!--定义一个 ref="wrapper" 可以确保获取到的一定是这个元素(在vue中,相同类名的元素的获取容易混淆)-->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data(){
      return {
        scroll: null
      }
    },
    props: {
      /**
       * 监听滚动位置<br/>
       * 将这个属性从BetterScroll中抽离出来(解耦),
       * 方便不同项目调用该组件时能够实现不同的监听效果<br/>
       * <pre>
       * 取值:
       *   0和1 表示不侦测滚动
       *   2 表示侦测滚动
       *   3 表示在离开滚动区域时(手指离开屏幕)依然检测滚动
       * </pre>
       */
      probeType: {
        type: Number,
        default: 0
      },
      /**
       * 上拉加载更多,默认为false
       */
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    //初始化页面完成后调用的方法
    mounted() {

      //1.创建betterScroll对象
      //this.$refs.wrapper 这种方式获取到的元素一定是正确的
      this.scroll = new BScroll(this.$refs.wrapper,{
        //这些属性必须要有
        observeDOM: true,
        click: true, //是否派发click事件
        probeType: this.probeType, //监听滚动位置
        pullUpLoad: this.pullUpLoad //监听上拉事件
      });

      //2.监听滚动位置
      this.scroll.on('scroll',(position) => {
        //position就是当前滚动的坐标
        //这里的position只是当前组件中的,外部想要使用的话,需要使用$emit将它作为自定义事件发射出去
        this.$emit('scroll',position)
      });

      //3.监听上拉事件(上拉加载更多)
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp')
      });
    },
    methods: {
      /**
       * 滚动到页面的某一个位置
       * @param x 横坐标
       * @param y 纵坐标
       * @param time 在指定时间内(毫秒)完成滚动,默认值为1000
       */
      scrollTo(x, y, time = 1000){
        //time = 1000 这种参数的形式是es6的语法,表示这个参数如果不传值,就用默认值 1000
        //这个方法对scrollTo()方法的调用进行了封装,便于外部调用
        this.scroll.scrollTo(x,y,time);
      },

      /**
       * 上拉数据加载完毕后,调用此方法<br/>
       * 用于告诉 better-scroll 数据已加载,这样才能继续加载数据,否则只能加载一次
       */
      finishPullUp(){
        //这个方法是对better-scroll原生的finishPullUp()方法的封装,便于外部组件调用
        this.scroll.finishPullUp()
      }
    }
  };
</script>

<style scoped>

</style>
