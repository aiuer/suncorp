<template>
  <div class="main-container">
    <div class="all-container">
      <div class="news-container">
        <div class="main-head">
          <span>>>>&nbsp;信息发布</span>
        </div>
        <div class="main-body">
          <div class="news-report">
            <div class="news-pic">
              <v-slide />
            </div>
            <div class="news-tab">
              <v-tab />
            </div>
          </div>
        </div>
      </div>
      <div class="public-container">
        <div class="main-head">
          <span>>>>&nbsp;警务公开</span>
        </div>
        <div class="main-body">
          <div class="news-report">
            <div class="public-container">
              <div class="p-container"><p>领导介绍</p></div>
              <v-leader />
            </div>
            <div class="public-container">
              <div class="p-container"><p>网上公示</p></div>
              <v-report />
            </div>
          </div>
        </div>
      </div>
      <div class="interact-container">
        <div class="main-head">
          <span>>>>&nbsp;警民互动</span>
        </div>
        <div class="main-body">
          <v-interact />
        </div>
      </div>
      <div class="feedback-container">
        <div class="main-head">
          <span>>>>&nbsp;联系反馈</span>
        </div>
        <div class="main-body">
          <v-feedback />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slide from './slide/slide.vue'
import tab from './tab/tab.vue'
import leader from './leader/leader.vue'
import report from './report/report.vue'
import interact from './interact/interact.vue'
import feedback from './feedback/feedback.vue'
export default {
  components: {
    'v-slide': slide,
    'v-tab': tab,
    'v-leader': leader,
    'v-report': report,
    'v-interact': interact,
    'v-feedback': feedback
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.main-container
  background-color rgb(82,130,170)
  height auto
  width 100%
  .all-container
    width 80%
    height auto
    margin 0 auto
    .news-container
      width 100%
      height auto
    .interact-container
      width 100%
      height auto
    .feedback-container
      width 100%
      height auto
  .main-head
    height 74px
    line-height 74px
    width 98%
    margin 0 0
    background-image url(main-head.png)
    background-repeat no-repeat
    background-size 100% 100%
    span
      color #99FFFF
      font-size 30px
      font-weight 800
      padding-left 50px
  .main-body
    width 98%
    height auto
    background-color white
    padding 20px 1%
    .news-report
      width 100%
      height auto
      display flex
      flex-direction row
      justify-content space-between
      .news-pic
        width 520px
        height 520px
        margin-right 20px
        flex 1
      .news-tab
        flex 1
        width 48%
        margin-right 0
        height auto
      .p-container
        width 100%
        height 10%
        margin-top 5%
        padding 0 38%
        font-size 20px
        font-weight 1000
        color #99FFFF
      .public-container
        background-image url('./public.png')
        background-size 100% auto
        background-repeat no-repeat
        width 48%
        height auto
        padding-bottom 5%
</style>
