<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" v-if="!userInfo._id" to="/login">
            <span class="header_login_text">登录|注册</span>
      </router-link>
      <router-link class="header_login" slot="right" to="/userInfo" v-else>
           <i class="iconfont icon-person"></i>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categoriesArray.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categories, index) in categoriesArray">
            <a href="javascript:" class="link_to_food" v-for="(category, index) in categories">
              <div class="food_container">
                <img :src="baseImageUrl+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
  import ShopList from '../../components/ShopList/ShopList'
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'
  import {mapState} from 'vuex'

  export default {
    name: 'Home',
    components: {
      HeaderTop,
      ShopList
    },
    data () {
      return {
        baseImageUrl: 'https://fuss10.elemecdn.com'
      }
    },
    mounted () {


    },
    computed: {
      ...mapState(['address', 'categorys','userInfo']),
      //通过一维数组创建二维数组，并且小数组个数为8个
      categoriesArray () {
        const {categorys} = this
        //创建二维数组
        const array = []
        //创建商品小数组
        let categoryArray = []

        categorys.forEach(category=>{

          if(categoryArray.length>=8){
            categoryArray=[]
          }
          if(categoryArray.length===0){
            array.push(categoryArray)
          }
          categoryArray.push(category)
        })
        return array
      }
    },
    watch: {
      categorys (newValue,oldValue) {
        /*//为了解决vue异步更新界面时，导致的问题，我可以使用定时器来解决，但是这样不太好
        setTimeout(()=>{
          new Swiper('.swiper-container', {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            }
          })
        },1000)*/
        //在一些数据导致界面更新时，界面更新完毕时调用回调函数，可以使用vm.$nextTick()
        //设置监视categorys的数据导致界面更新完毕的回调函数
        this.$nextTick(()=>{
          new Swiper('.swiper-container', {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff

      .swiper-container
        width 100%
        height 100%

        .swiper-wrapper
          width 100%
          height 100%

          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap

            .link_to_food
              width 25%

              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0

                img
                  display inline-block
                  width 50px
                  height 50px

              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666

        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774

    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff

      .shop_header
        padding 10px 10px 0

        .shop_icon
          margin-left 5px
          color #999

        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
