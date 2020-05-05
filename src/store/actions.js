/*
 * 包含多个间接通过mutations更新状态(state)对象中的数据的方法的对象
 * 用于执行ajax和定时器
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from './mutation-types'
import {
  requestPosition,
  requestCategorys,
  requestShops,
  requestUserInfo,
  requestLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../api/index'
import Toast from 'mint-ui/packages/toast/src/toast'

export default {
  //获取地址信息
  async getAddress ({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await requestPosition(geohash)
    if (result.code === 0) {
      //commit让mutations修改状态
      const address = result.data

      commit(RECEIVE_ADDRESS, {address})
    }
  },
  //获取商品食物列表
  async getCategorys ({commit, state}) {
    const result = await requestCategorys()
    if (result.code === 0) {
      //commit让mutations修改状态
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  //获取商家列表
  async getShops ({commit, state}) {
    const result = await requestShops(state.latitude, state.longitude)
    if (result.code === 0) {
      //commit让mutations修改状态
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  setUserInfo ({commit, state}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },

  async getUserInfo ({commit, state}) {
    const result = await requestUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },
  //异步退出登录
  async logout ({commit, state}) {
    const result = await requestLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },

  // 异步获取商家信息
  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      info.score = 3.5
      commit(RECEIVE_INFO, {info})
    }
  },
// 异步获取商家评价列表
  async getShopRatings ({commit}) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },
// 异步获取商家商品列表
  async getShopGoods ({commit},callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 如果组件中传递了接收消息的回调函数 , 数据更新后 , 调用回调通知调用的组件
    }
    callback && callback()
  },
}


