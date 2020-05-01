/*
 * 包含多个间接通过mutations更新状态(state)对象中的数据的方法的对象
 * 用于执行ajax和定时器
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'
import {
  requestPosition,
  requestCategorys,
  requestShops
} from '../api/index'

export default {
  //获取地址信息
  async getAddress ({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await requestPosition(geohash)
    if(result.code===0){
      //commit让mutations修改状态
      const address=result.data

      commit(RECEIVE_ADDRESS,{address})
    }
  },
  //获取商品食物列表
  async getCategorys ({commit, state}) {
    const result = await requestCategorys()
    if(result.code===0){
      //commit让mutations修改状态
      const categorys=result.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  //获取商家列表
  async getShops ({commit, state}) {
    const result = await requestShops(state.latitude,state.longitude)
    if(result.code===0){
      //commit让mutations修改状态
      const shops=result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  }
}
