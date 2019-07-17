<template>
  <div class="feedback-body">
    <div class="coll-advise">
      <select class="ad-select" size="20" multiple>
        <option v-for="cont in tabmain" :key="cont.infoID" >{{cont.infoTitle}}</option>
      </select>
    </div>
    <div class="coll-pic">
      <img src="./feed-btn.png">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabmain: []
    }
  },
  mounted: function () {
    this.getNews()
  },
  methods: {
    getNews () {
      this.$ajax.get('http://localhost:3003/news').then((res) => {
        this.tabmain = res.data
      })
    }
  }
}
</script>

<style lang="stylus">
.feedback-body
  width 100%
  height 100%
  display flex
  justify-content center
  .coll-advise
    background-image url('../public.png')
    background-size 100% 400px
    background-repeat no-repeat
    width 65%
    height 100%
    padding-top 120px
    border gray thin solid
    .ad-select
      height 100%
      width 100%
      font-family '仿宋'
      font-weight 400
      font-style normal
      font-size 22px
      text-decoration none
      color #000000
      option
        font-weight normal
        display block
        white-space pre
        min-height 1.2em
        padding 0px 2px 1px
  .coll-pic
    width 20%
    display table-cell
    padding-top 5%
    text-align center
</style>
