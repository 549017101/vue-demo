import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "@/store";

Vue.config.productionTip = false

//这个$bus叫做事件总线,作用和vuex类似,但是是用来管理事件的,但是vue中并没有定义$bus(是undefined),所以要想使用就必须使用原型为其赋值
//Vue实例是可以作为 事件总线 使用的
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
