<template>
  <div class="star star-24">
    <span class="star-item" v-for="(starClass, index) in starClasses" :class="starClass" :key="index"></span>
  </div>
</template>

<script>
  const ON_CLASS='on'
  const HALF_CLASS='half'
  const OFF_CLASS='off'
  export default {
    name: "Star",
    props: {
      score: Number,
      size: Number
    },
    computed: {
      starClasses () {
        /*
          3.2 3+0+2
          3.5 3+1+1
        * */
        const {score} = this
        const starArray = []
        const size = Math.floor(score)

        for (let i = 0; i < size; i++) {
          starArray.push(ON_CLASS)
        }

        if(score*10-size*10>5){
          starArray.push(HALF_CLASS)
        }

        while(starArray.length<5){
          starArray.push(OFF_CLASS)
        }

        return starArray
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0

    .star-item
      display inline-block
      background-repeat no-repeat

    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px

        &:last-child
          margin-right: 0

        &.on
          bg-image('./images/star48_on')

        &.half
          bg-image('./images/star48_half')

        &.off
          bg-image('./images/star48_off')

    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px

        &:last-child
          margin-right 0

        &.on
          bg-image('./images/star36_on')

        &.half
          bg-image('./images/star36_half')

        &.off
          bg-image('./images/star36_off')

    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px

        &:last-child
          margin-right 0

        &.on
          bg-image('./images/star24_on')

        &.half
          bg-image('./images/star24_half')

        &.off
          bg-image('./images/star24_off')

</style>
