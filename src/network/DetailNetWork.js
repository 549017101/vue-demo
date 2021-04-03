/**
 * 详情页的网络请求
 * Author: pxz
 * Email: buffll@foxmail.com
 * 2021-04-03 10:02
 */

import {request} from "@/network/request";

/**
 * 根据商品id请求详细数据
 * @param iid 商品id
 */
export function getDetailData(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

/**
 * 获取详情页底部的推荐数据
 */
export function getRecommend(){
  return request({
    url: '/recommend'
  })
}

/**
 * 商品详情的基本信息,如价格,销量等
 */
export class Goods {
  //这些所需要的数据太杂乱了,所以把需要的数据合并成一个对象,方便使用
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

/**
 * 店铺信息
 */
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

/**
 * 商品参数
 */
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
