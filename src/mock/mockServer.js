import Mock from 'mockjs'
import data from  './data'



/*
  mockjs  用于生成随机数据,拦截对应的ajax请求
  只能作用于ajax请求
* */

//返回点餐信息的接口
Mock.mock("/shop_goods",{code:0,data:data.goods})

//返回评论信息的接口
Mock.mock("/shop_ratings",{code:0,data:data.ratings})

//返回商家信息的接口
Mock.mock("/shop_info",{code:0,data:data.info})


