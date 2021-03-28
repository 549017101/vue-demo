/**
	author pxz
	email buffll@foxmail.com
*/

//自定义封装网络请求

import axios from "axios";

/**
 * 网络模块请求
 * @param config
 * @returns {AxiosPromise}
 */
export function request(config){
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  });

  //2.axios的拦截器
  // axios.interceptors 直接这样写就表示全局拦截器
  //instance.interceptors.request; //拦截请求
  //instance.interceptors.response; //拦截响应
  instance.interceptors.request.use(config => {
    return config
  }, error => {

  });

  //3.发送真正的网络请求
  return instance(config) //返回的这个instance本身就是Promise.,直接return直接使用就行
}
