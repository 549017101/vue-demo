import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "@/store";
import toast from "@/components/common/toast" //使用了默认导出,可以自定义导入的对象名
import FastClick from 'fastclick'  //解决移动端300ms延迟
import VueLazyload from "vue-lazyload"; //图片懒加载

Vue.config.productionTip = false

//这个$bus叫做事件总线,作用和vuex类似,但是是用来管理事件的,但是vue中并没有定义$bus(是undefined),所以要想使用就必须使用原型为其赋值
//Vue实例是可以作为 事件总线 使用的
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载插件
Vue.use(VueLazyload,{
  preLoad: 1,
  /**占位图片*/
  loading: require('assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
