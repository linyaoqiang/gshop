/*
 * 包含多个直接更新状态(state)对象中的数据的方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import Vue from 'vue'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },

  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },

  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },

  [INCREMENT_FOOD_COUNT] (state, {food}) {
    if (!food.count) {//如果没有值或者值为0时
      //给对象添加没有的属性Vue是检测不到的，但是Vue提供了，set的设置方法  ，参数  对象 ，属性，初始化值
      Vue.set(food, 'count', 1)

      //添加到购物车中
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state, {food}) {
    if (food.count) {//不能小于等于0
      food.count--
    }
    //如果count为0则在购物车中移除
    if (food.count === 0) {
      state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
    }
  },
  [CLEAR_CART] (state) {
    //清空购物车中所有商品的count为0
    state.cartFoods.forEach(food => {
      food.count=0  // food.count=undefined    delete food.count
    })
    //移除购物车
    state.cartFoods=[]
  },
  [RECEIVE_SEARCH_SHOPS] (state,{searchShops}) {
    state.searchShops=searchShops
  }
}

