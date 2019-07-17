<template>
    <div class="wrapper">
        <div class="top">
            <div class="search-wrapper">
                <div class="button"></div>
                <input class="text" type="text"/>
            </div>
            <div class="time">
                <span>2019年3月26日</span>
            </div>
            <div class="button-group">
                <input type="button" value="登录" @click="jumpLog"/>
                <input type="button" value="注册" @click="jumpLog"/>
            </div>
        </div>
        <div class="bottom">
            <div class="title">
                <div class="left-content">
                    <div class="title-icon"></div>
                    <div class="title-text">阳光警务</div>
                </div>
                <div class="right-content">
                    阳光精神：海纳百川 追求卓越 开明睿智 大气谦和
                </div>
            </div>
            <div v-if="isShowimg" class="image-wrapper"></div>
            <video v-if="isShowvideo" class="video-box" muted autoplay loop>
                <source src="../../components/header/sunpolice.mp4" type="video/mp4">
            </video>
            <a-button type="primary" style="background-color:rgb(14,30,45);font-size:20px;border:none;" icon="down-circle" class="change-btn" @click="changeimg" />
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isShowimg: true,
      isShowvideo: false
    }
  },
  methods: {
    jumpLog () {
      this.$router.push('/log')
    },
    changeimg () {
      this.isShowimg = !this.isShowimg
      this.isShowvideo = !this.isShowvideo
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin";
    .top
        margin 0
        padding 0
        width 100%
        height 70px
        line-height 70px
        background-color rgb(0,94,154)
        .search-wrapper
            width 400px
            margin-left 10px
            float left
            display inline-block
            .button
                width 40px
                height 38px
                background-image url(u162.png)
                background-size 40px 38px
                background-repeat no-repeat
                margin 15px 0px 15px 15px
                float left
            .text
                width 250px
                height 36px
                border 0px
                margin 15px 8px 15px 8px
                border-radius 5px
                float left
        .time
            display inline-block
            width 220px
            font-size 24px
            position absolute
            right 168px
            color white
        .button-group
            right 15px
            position absolute
            input
              font-size 22px
              height 40px
              line-height 40px
              display inline-block
              border 0px
              border-radius 15px
              color white
              background-color #005e9a
    .bottom
        background-color rgb(14,30,45)
        width 100%
        height auto
        .title
            color:#99FFFF
            height 150px
            line-height 170px
            overflow hidden
            .left-content
                width 50%
                float left
                text-align center
                .title-icon
                    width 90px
                    height 90px
                    background-size 90px 90px
                    background-repeat no-repeat
                    bg-image('u10')
                    display inline-block
                .title-text
                    font-family '宋体'
                    font-weight 1000
                    font-size 45px
                    display inline-block
                    margin-left 10px
                    letter-spacing 6px
            .right-content
                width 50%
                float right
                font-family '楷体'
                font-size 25px
                text-align left
                overflow hidden
        .image-wrapper
            height 650px
            bg-image('u2')
            background-size 100% 550px
            background-repeat no-repeat
        .video-box
            height auto
            width 100%
            zoom -1
        .change-btn
            margin 0 50%
</style>
