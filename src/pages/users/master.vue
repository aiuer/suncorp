<template>
    <div class="wrapper">
        <ul class="tab">
            <li class="item-title">>>> 个人中心</li>
            <li v-for="item in currentNavItem" :key="item.id" class="tab-item">
              <router-link :to="item.path">{{item.name}}</router-link>
            </li>
            <li class="tab-item" @click="logout">注销</li>
            <li class="tab-item" @click="backToindex">返回首页</li>
        </ul>
        <div class="right-wrapper">
          <router-view></router-view>
        </div>
    </div>
</template>
<script>
// import func from '../../../vue-temp/vue-editor-bridge';
export default {
  data () {
    return {
      user: '',
      currentNavItem: []
    }
  },
  mounted () {
    this.showMenu()
  },
  methods: {
    logout () {
      sessionStorage.clear()
      this.$router.push('/log')
    },
    backToindex () {
      this.$router.push('/index')
    },
    // async getSessionStorage (key) {
    //   return new Promise((resolve, reject) => {
    //     resolve(sessionStorage.getItem('menuData'))
    //   })
    // }
    // ,
    showMenu () {
      // console.log(await sessionStorage.getItem('menuData'))
      console.log(JSON.parse(sessionStorage.getItem('menuData')))
      const menuData = sessionStorage.getItem('menuData')
      this.currentNavItem = JSON.parse(menuData)
      // let index = document.getElementsByClassName('tab-item')
      // for (var i = 0; i < this.currentNavItem.length; i++) {
      //   let newitem = document.createElement('li')
      //   console.log(this.currentNavItem[i].name)
      //   newitem.innerHTML = this.currentNavItem[i].name
      //   index.before(newitem)
      // }
    }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
.wrapper
  width 80%
  margin auto
  background rgb(248,242,242)
  .tab
    float left
    width 30%
    height 500px
    list-style none
    padding 0px
    .item-title
      height 80px
      line-height 70px
      font-size 35px
      text-align center
      background rgb(33,82,126)
    .tab-item
      height 50px
      line-height 50px
      font-size 23px
      text-align center
      background rgb(242,242,242)
      &:active
        background rgb(255,255,255)
  .right-wrapper
    float right
    width 70%
    background rgb(82,130,170)
    min-height 800px
    background-image url('../users/bottom-pic.png')
    background-repeat no-repeat
    background-size 100% 100%
    background-position bottom center
</style>
