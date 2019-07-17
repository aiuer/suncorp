<template>
  <div class="app">
      <ul class="tab-tilte">
          <li v-for="(title,index) in tabtit" :key="title" @click="getNews(index)" :class="{active:cur==index}">{{title}}</li>
      </ul>
      <div class="tab-content">
          <div>
            <select class="tab-select" multiple>
              <option v-for="cont in tabmain" :key="cont.infoid" >{{cont.infotitle}}</option>
            </select>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cur: 0,
      tabtit: ['警务报道', '通知公告', '警方提示', '分局警讯', '国务院信息'],
      tabmain: []
    }
  },
  methods: {
    getNews (index) {
      this.cur = index
      const sunCitizenmes = {
        type: this.cur.toString()
      }
      const params = this.qs.stringify(sunCitizenmes)
      this.$ajax({
        url: `/api/webInfo/selectBytype?${params}`
      })
        .then((response) => {
          this.tabmain = response.data
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus">
.app
  width 100%
  height 100%
  margin 0 auto
  .tab-tilte
    width 100%
    margin 0
    padding 0
    li
      float left
      width 20%
      height 45px
      padding 10px 0
      text-align center
      background-color #f4f4f4
      margin 0
      list-style none
      font-size 13px
      font-weight 400
      cursor pointer
      overflow hidden
.active
  color red
.tab-content
  width 100%
  height 100%
  div
    float left
    width 100%
    height 100%
    line-height 100%
    text-align center
    overflow-y hidden
    .tab-select
      height 91%
      width 100%
      font-family '仿宋'
      font-weight 400
      font-style normal
      font-size 22px
      text-decoration none
      color #000000
      option
        border-bottom gray thin solid
</style>
