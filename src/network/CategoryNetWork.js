/**
* 分类页面的网络请求
* Author: pxz
* Email: buffll@foxmail.com
* 2021-04-09 21:30
*/
//import {request} from "@/network/request";
import axios from './axios'
/**
 * 获取分类数据
 * @returns {AxiosPromise}
 */
export function getCategory() {
  return axios({
    url: '/category'
  })
}

/**
 * 获取子类别
 * @param maitKey
 * @returns {AxiosPromise}
 */
export function getSubcategory(maitKey) {
  return axios({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

/**
 * 获取分类页面的详细数据
 * @param miniWallkey
 * @param type 分类
 * @returns {AxiosPromise}
 */
export function getCategoryDetail(miniWallkey, type) {
  return axios({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
