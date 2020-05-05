/*
 * 包含多个基于state数据的计算属性对象
 */

export default {
  totalCount (state) {
    return state.cartFoods.reduce((prepareTotal, food) => prepareTotal+=food.count,0)
  },
  totalPrice (state) {
    return state.cartFoods.reduce((prepareTotal, food) => prepareTotal+=food.count*food.price,0)
  },

  positiveSize (state) {
    return state.ratings.reduce((prepareSize,rating) => prepareSize+=(rating.rateType===0?1:0),0)
  }
}

