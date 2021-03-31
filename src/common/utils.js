/**
 * 通用函数
 * Author: pxz
 * Email: buffll@foxmail.com
 * 2021-03-31 22:11
 */

/**
 * 防抖函数,用于解决refresh()的频繁调用
 * @param func 传入需要执行防抖的函数
 * @param delay 延迟时间
 */
export function debounce(func, delay){
  let timer = null
  return function (...args){
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() =>{
      func.apply(this,args)
    },delay)
  }
}
