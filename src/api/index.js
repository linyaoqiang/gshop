/*
 *  封装多个请求后端数据的接口方法
 */
import ajax from './ajax'

const SERVER_URL = 'http://localhost:4000/'
// 1、根据经纬度获取位置详情
export let requsetPosition: geohash => ajax
(SERVER_URL + `/position/${geohash}`)
// 2、获取食品分类列表
export let requestShopTypes: () => ajax
(SERVER_URL + `index_category`)
// 3、根据经纬度获取商铺列表
export let requestShopList: (latitude, longitude) => ajax
(SERVER_URL + '/shops', {latitude, longitude})
// 4、根据经纬度和关键字搜索商铺列表
// 5、获取一次性验证码
// 6、用户名密码登陆
// 7、发送短信验证码
// 8、手机号验证码登陆
// 9、根据会话获取用户信息
// 10、用户登出
