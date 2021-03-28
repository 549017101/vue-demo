/**
 * 首页的网络请求
 * Author: pxz
 * Email: buffll@foxmail.com
 * 2021-03-28 19:45
 */

import {request} from "@/network/request";

/**
 * 获取首页的多个数据
 * @returns {AxiosPromise} 网络请求
 */
export function getHomeMultidata(){
  return request({
    url: '/home/multidata'
  })
}
