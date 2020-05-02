<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:isMessageLogin}" @click="isMessageLogin=true">短信登录</a>
          <a href="javascript:;" :class="{on:!isMessageLogin}" @click="isMessageLogin=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:isMessageLogin}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification" @click.prevent="getCode"
                      :class="{right_phone: rightPhone}" v-if="!computeTime">获取验证码
              </button>
              <button disabled="disabled" class="get_verification right_phone" v-else>发送({{computeTime}})s</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!isMessageLogin}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="showPassword">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                <div class="switch_button" :class="showPassword?'on':'off'" @click="showPassword=!showPassword">
                  <div class="switch_circle" :class="{right:showPassword}"></div>
                  <span class="switch_text">{{showPassword?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" ref="captcha" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlterTip :alertText="alertText" @closeTip="closeTip" v-show="isShowAlterTip"/>
  </section>

</template>

<script>
  import AlterTip from '../../components/AlterTip/AlterTip'
  import {requestSendCode, requestPwdLogin, requestLogout, requestSmsLogin} from '../../api'

  export default {
    name: 'Login',
    data () {
      return {
        isMessageLogin: true,
        phone: '', //手机号
        phoneReg: /^1[3,5,6,7,8,9]\d{9}$/,
        computeTime: 0,
        pwd: '', //密码
        showPassword: false,
        captcha: '', //图像验证码
        name: '',    //用户名
        code: '',     //短信验证码
        alertText: '',    //警告框内容
        isShowAlterTip: false //是否提示警告框
      }
    },
    components: {
      AlterTip
    },
    computed: {
      rightPhone () {
        return this.phoneReg.test(this.phone)
      }
    },
    methods: {
      async getCode () {
        if (this.computeTime == 0) {
          //倒计时效果
          this.computeTime = 30
          this.intervalId = setInterval(() => {
            this.computeTime--
            if (this.computeTime <= 0) {
              clearInterval(this.intervalId)
            }
          }, 1000)
        }
        //发送ajax请求获取后台验证码
        const result = await requestSendCode(this.phone)
        if (result.code === 1) {
          this.showTip(result.msg)
          if (this.computeTime > 0) {
            this.computeTime = 0
            clearInterval(this.intervalId)
          }
        }

      },
      async login () {
        //定义登录返回值
        let result = null
        if (this.isMessageLogin) {  //短信登陆
          const {phone, rightPhone, code} = this
          if (!rightPhone) {
            //手机号不正确
            this.showTip("手机号不正确")
            return
          } else if (!/^\d{6}$/.test(code)) {
            //手机验证码必须是6位数字
            this.showTip("手机验证码必须是6位数字")
            return
          }
          //进行短信登陆
          result = await requestSmsLogin(phone, code)
        } else {
          const {name, pwd, captcha} = this
          if (!name || !pwd) {
            //用户名或者密码为空
            this.showTip("用户名或者密码为空")
            return
          } else if (!/^\w{4}$/.test(captcha)) {
            //验证码必须是4位
            this.showTip("验证码必须是4位")
            return
          }
          //进行密码登录
          result = await requestPwdLogin(name,pwd,captcha)
        }

        //清除定时器
        if (this.computeTime > 0) {
          this.computeTime = 0
          clearInterval(this.intervalId)
        }

        //登录情况
        if(result.code === 0){ //登录成功
          // result.data  是个人信息，需要存放在vuex中
          this.$store.dispatch('setUserInfo',result.data)
          //进行页面跳转
          this.$router.replace('/profile')
        }else{ //登录失败
          const msg = result.msg //失败信息

          //刷新图形验证码
          this.getCaptcha()
          //提出警告框
          this.showTip(msg)

          //清空输入内容
          this.phone=''
          this.code= ''
          this.name = ''
          this.pwd = ''
          this.captcha = ''
        }
      },
      showTip (alertText) {
        this.isShowAlterTip = true
        this.alertText = alertText
      },
      closeTip () {
        this.isShowAlterTip = false
      },
      getCaptcha () {
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now();
      }
    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff

    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto

      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center

        .login_header_title
          padding-top 40px
          text-align center

          > a
            color #333
            font-size 14px
            padding-bottom 4px

            &:first-child
              margin-right 40px

            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774

      .login_content
        > form
          > div
            display none

            &.on
              display block

            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial

              &:focus
                border 1px solid #02a774

            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent

                &.right_phone
                  color #000

            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s, border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)

                &.off
                  background #fff

                  .switch_text
                    float right
                    color #ddd

                &.on
                  background #02a774

                > .switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                  transition transform .3s

                > .right
                  transform translateX(30px)

            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px

              > a
                color #02a774

          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0

        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999

      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px

        > .iconfont
          font-size 20px
          color #999
</style>
