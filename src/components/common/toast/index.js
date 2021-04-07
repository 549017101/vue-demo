/**
 * 将Toast组件配置成插件
 * Author: pxz
 * Email: buffll@foxmail.com
 * 2021-04-07 19:19
 */
import Toast from "@/components/common/toast/Toast";

const obj = {};

/**
 * 安装插件
 */
obj.install = function (Vue) {
  //install默认会传入一个参数,这个参数就是vue实例,所以不需要再引入

  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  //2.通过new的方式,根据组件构造器,可以创建一个组件对象
  const toast = new toastContrustor()

  //3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  //4.此时 toast.$el对应的就是上面创建好的div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
};

export default obj;
