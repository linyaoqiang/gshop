/*
 *  封装多个请求后端数据的接口方法
 */
import ajax from './ajax'

const BASE_URL = '/api'
// 1、根据经纬度获取位置详情
export const requestPosition = geohash => ajax(BASE_URL + `/position/${geohash}`)
// 2、获取食品分类列表
export const requestCategorys=() => ajax (BASE_URL + `/index_category`)
// 3、根据经纬度获取商铺列表
export const requestShops = (latitude, longitude) => ajax(BASE_URL + '/shops', {latitude, longitude})
// 4、根据经纬度和关键字搜索商铺列表
export const requestSearchShops = (geohash,keyword) =>ajax(BASE_URL+'/search_shops',{geohash,keyword})
// 5、获取一次性验证码

// 6、用户名密码登陆
export  const requestPwdLogin = (name,pwd,captcha)=>ajax(BASE_URL+"/login_pwd",{name,pwd,captcha},"POST")
// 7、发送短信验证码
export const requestSendCode = phone => ajax(BASE_URL+'/sendCode',{phone})
// 8、手机号验证码登陆
export const requestSmsLogin = (phone,code) =>ajax(BASE_URL+'/login_sms',{phone,code},"POST")
// 9、根据会话获取用户信息
export const requestUserInfo = () =>ajax(BASE_URL+'/userinfo')
// 10、用户登出
export  const requestLogout = () =>ajax(BASE_URL+'/logout')




/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/shop_info')
/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/shop_ratings')
/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/shop_goods')
