<template>
  <div class="interact-box">
    <div class="inter-btn">
      <div v-for="(item,index) in aArr" :key="index" >
        <router-link :to="item.ahref"><img :src="item.images"></router-link>
        <p>{{item.title}}</p>
      </div>
    </div>
    <div class="inter-tab">
      <a-tabs class="tab-btn" type="card" tabPosition="left">
        <a-tab-pane class="tab-content" tab="我要看" tabBarStyle="background-color:'red';" key="1">
          <ul>
            <li><router-link :to="{path:'/interact'}">行政规范性文件</router-link></li>
            <li><router-link :to="{path:'/interact'}">公开公示</router-link></li>
            <li><router-link :to="{path:'/interact'}">政策法规</router-link></li>
          </ul>
        </a-tab-pane>
        <a-tab-pane class="tab-content" tab="我要评" key="2">
          <ul>
            <li><router-link :to="{path:'/interact'}">在线访谈</router-link></li>
            <li><router-link :to="{path:'/interact'}">热点答复</router-link></li>
            <li><router-link :to="{path:'/interact'}">局长信箱</router-link></li>
            <li><router-link :to="{path:'/interact'}">投票通道</router-link></li>
            <li><router-link :to="{path:'/interact'}">意见征集</router-link></li>
          </ul>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import i1 from './i1.png'
import i2 from './i2.png'
import i3 from './i3.png'
import i4 from './i4.png'
export default {
  data () {
    return {
      aArr: [
        {
          images: i1,
          title: '投票通道',
          ahref: '/interact'
        },
        {
          images: i2,
          title: '局长信箱',
          ahref: '/interact'
        },
        {
          images: i3,
          title: '热点答复',
          ahref: '/interact'
        },
        {
          images: i4,
          title: '意见征集',
          ahref: '/interact'
        }
      ]
    }
  },
  methods: {
    callback (key) {
      console.log(key)
    }
  }
}
</script>

<style lang="stylus">
.interact-box
  width 100%
  height 100%
  display flex
  align-items center
  justify-content space-around
  .inter-btn
    flex 1
    display flex
    flex-direction column
    justify-content space-around
    align-items center
    img
      flex 1
      width 90px
      height 90px
  .inter-tab
    flex 5
    .tab-btn
      height 663px
      display flex
      align-items flex-start
      padding 20% 10% 0
      background-image url('./back-tabs.png')
      background-size 100% 100%
      background-repeat no-repeat
      background-position center
      .tab-content
        background-color white
        width 100%
        height 100%
        ul
          padding 0
          width 100%
          list-style none
          display flex
          justify-content flex-start
          flex-wrap wrap
          li
            width 30%
            padding 1% 0
            margin 3% 1%
            line-height 40px
            font-size 17px
            text-align center
            background-color #6699CC
            a
              color white
  .ant-tabs .ant-tabs-left-bar {
    float: left;
    width: 18%;
    border-right: 0.013333rem solid #e8e8e8;
    margin-right: -0.013333rem;
    margin-bottom: 0;
    height auto
  }
  .ant-tabs-vertical.ant-tabs-card.ant-tabs-left .ant-tabs-card-bar.ant-tabs-left-bar .ant-tabs-tab {
    border-right: 0;
    border-radius: 0.053333rem 0 0 0.053333rem;
    margin-right: 0.013333rem;
    width:100%;
    height:100%;
    text-align:center;
    background-color: #6699CC;
    color:white;
  }
  .ant-tabs-vertical.ant-tabs-card.ant-tabs-left .ant-tabs-card-bar.ant-tabs-left-bar .ant-tabs-tab-active {
    background-color: white;
    color:black;
  }
  .ant-tabs .ant-tabs-left-content
    width 100%
</style>
