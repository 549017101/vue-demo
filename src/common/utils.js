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

/**
 * 对日期进行拼串(补0)
 * @param str
 * @returns {string}
 */
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

/**
 * 日期格式化
 * @param date 时间戳
 * @param fmt 日期的输出格式
 * @returns {*}
 */
export function formatDate(date, fmt) {
  //获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
