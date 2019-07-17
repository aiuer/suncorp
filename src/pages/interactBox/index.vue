<template>
  <main>
    <div class="content">
      <div class="left-menu">
        <div class="logo">
          警民互动
          <a-switch
            defaultChecked
            @change="changeTheme"
            checkedChildren="dark"
            unCheckedChildren="light"
            :defaultSelectedKeys="['5']"
          />
        </div>
          <a-menu
            style="width: 100%"
            :defaultSelectedKeys="['1']"
            :defaultOpenKeys="['sub1']"
            mode="inline"
            :theme="theme"
            :selectedKeys="[current]"
          >
            <a-sub-menu key="sub1" @titleClick="titleClick">
              <span slot="title"><a-icon type="mail" /><span>有关信件</span></span>
              <a-menu-item key="1"><router-link style="color:gray;" to="/interact/readLetters">热门信件</router-link></a-menu-item>
              <a-menu-item key="2"><router-link style="color:gray;" to="/interact/writeLetters">局长信箱</router-link></a-menu-item>
            </a-sub-menu>
            <a-menu-item class="item_style" key="3">
              <a-icon type="pie-chart" />
              <span><router-link style="color:gray;" to="/interact/vote">投票通道</router-link></span>
            </a-menu-item>
            <a-menu-item class="item_style" key="4">
              <a-icon type="file-text" />
              <span><router-link style="color:gray;" to="/interact/public">公开公示</router-link></span>
            </a-menu-item>
            <a-menu-item class="item_style" key="5">
              <a-icon type="book" />
              <span><router-link style="color:gray;" to="/interact/policy">政策法规</router-link></span>
            </a-menu-item>
            <a-menu-item class="item_style" key="6">
              <a-icon type="home" />
              <span><router-link style="color:gray;" to="/index">返回首页</router-link></span>
            </a-menu-item>
          </a-menu>
      </div>
      <div class="right-content">
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data () {
    return {
      collapsed: false,
      theme: 'dark'
    }
  },
  methods: {
    changeTheme (checked) {
      this.theme = checked ? 'dark' : 'light'
    },
    titleClick (e) {
      console.log('titleClick', e)
    }
  }
}
</script>
<style lang="stylus">
main
  width 100%
  display flex
  flex-direction column
  justify-content flex-start
  align-items center
  .content
    width 80%
    display flex
    justify-content center
    align-items flex-start
    margin 0 auto
    .left-menu
      width 20%
      height auto
      .logo
        width 100%
        height 50px
        line-height 50px
        padding-left 10%
        font-size 22px
        font-weight 600
        background-color #003366
        color white
      .item_style
        height 40px
      .ant-menu-dark.ant-menu-inline .ant-menu-item, .ant-menu-dark.ant-menu-inline .ant-menu-submenu-title {
        width: 100%;
        height: 50px;
        font-size: 20px;
        line-height: 50px;
      }
      .ant-menu-dark.ant-menu-inline .ant-menu-item-active{
        background-color white
        color black
      }
      .ant-menu-inline .ant-menu-item, .ant-menu-inline .ant-menu-submenu-title {
        width: 100%;
        height: 50px;
        font-size: 20px;
        line-height: 50px;
      }
    .right-content
      width 70%
      height auto
      background-color white
</style>
