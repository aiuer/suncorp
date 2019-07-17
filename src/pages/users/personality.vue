<template>
    <div>
      <div class="wrapper">
        <div class="item">
          <div class="item-title">姓名</div>
          <div class="item-content">{{user.citiname}}</div>
        </div>
        <div class="item">
          <div class="item-title">身份证号码</div>
          <div class="item-content">{{user.citicreditid}}</div>
        </div>
        <div class="item">
          <div class="item-title">性别</div>
          <div class="item-content">{{user.sex}}</div>
        </div>
        <div class="item">
          <div class="item-title">民族</div>
          <div class="item-content">{{user.nation}}</div>
        </div>
        <div class="item">
          <div class="item-title">出生日期</div>
          <div class="item-content">{{user.birthday}}</div>
        </div>
        <div class="item">
          <div class="item-title">联系电话</div>
          <div class="item-content">{{user.phonenumber}}</div>
        </div>
        <div class="item">
          <div class="item-title">电子邮箱</div>
          <div class="item-content">{{user.email}}</div>
        </div>
        <div class="item">
          <div class="item-title">居住地址</div>
          <div class="item-content">{{user.address}}</div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      credit_id: '',
      user: {
        'sex': '',
        'citiname': '',
        'citicreditid': '',
        'password': '',
        'nation': '',
        'address': '',
        'email': '',
        'birthday': '',
        'phonenumber': ''
      }
    }
  },
  mounted () {
    this.showMes()
  },
  methods: {
    showMes () {
      this.credit_id = sessionStorage.getItem('user')
      let temp = {
        creditid: this.credit_id
      }
      let params = this.qs.stringify(temp)
      this.$ajax({
        url: `/api/citizenMes/selectbycreditid?${params}`,
        methods: 'get'
      }).then((response) => {
        console.log(response.data)
        this.user = response.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.wrapper
  width 80%
  margin 50px auto 80px auto
  .item
    width 100%
    line-height 70px
    height 70px
    font-size 24px
    .item-title
      float left
      width 30%
    .item-content
      width 70%
      float right
      height 90%
      text-align center
      border 2px dashed black
</style>
