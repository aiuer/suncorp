<template>
    <div class="wrapper">
        <div class="tab">
            <div class="item-title">用户中心</div>
            <div class="tab-item">
              <router-link to="/log/login">登录</router-link>
            </div>
            <div class="tab-item">
              <router-link to="/log/regist">注册</router-link>
            </div>
            <div class="tab-item">
              <router-link to="/log/updateCode">修改密码</router-link>
            </div>
        </div>
        <div class="right-wrapper" >
          <router-view @childFn='parentFn'></router-view>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    parentFn (mes) { // 接收login组件的值判断是否登录成功，在进行路由切换
      console.log(mes)
      if (mes === '登录成功') {
        setTimeout(function () {
          this.$router.push('/personality')
        }.bind(this), 1000)
      }
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  .wrapper
    width 80%
    background rgb(248,242,242)
    margin auto
    .tab
      float left
      width 30%
      padding-top 20px
      .item-title
          height 80px
          line-height 80px
          font-size 35px
          text-align center
          background rgb(33,82,126)
      .tab-item
          height 50px
          line-height 60px
          font-size 23px
          text-align center
          background rgb(248,242,242)
          margin 1px
    .right-wrapper
        background-color white
        float right
        width 70%
        background rgb(82,130,170)
        min-height 800px
        background-image url('../users/bottom-pic.png')
        background-repeat no-repeat
        background-size 100% 100%
        background-position bottom center
</style>
