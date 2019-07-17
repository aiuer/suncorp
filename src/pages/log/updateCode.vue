<template>
    <div>
        <div class="wrapper">
            <form action="" class="formbox">
                <span class="title">身份证号:</span><input class="input-box" type="text" v-model="citicreditid"><br/>
                <span class="title">电话号码:</span><input class="input-box" type="text"><br/>
                <span class="title">验证码:</span><input class="input-box-confirm" type="text"><input type="button" class="confirm-button" value="获取验证码"/><br/>
                <span class="title">新密码:</span><input class="input-box" type="text" v-model="newcode"><br/>
                <input class="button" type="button" value="确认" @click="doupdate">
            </form>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      citicreditid: '',
      newcode: ''
    }
  },
  methods: {
    doupdate () {
      const sunCitizenmes = {
        userid: this.citicreditid,
        password: this.newcode
      }
      const params = this.qs.stringify(sunCitizenmes)
      this.$ajax({
        url: `/api/citizenMes/modifypassword?${params}`,
        methods: 'get'
      })
        .then((response) => {
          console.log(response)
          if (response === 1) {
            alert('OK')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.wrapper
  background white
  width 80%
  height 500px
  margin 120px auto 40px auto
  border-radius 30px
  box-shadow 0 0 20px #888888
  .formbox
    padding-top 80px
    width 80%
    font-size 22px
    line-height 70px
    margin auto
    .title
        display inline-block
        width 25%
    .input-box
        width 75%
        height 35px
    .input-box-confirm
        width 25%
        height 35px
    .confirm-button
        margin-left 20px
        font-size 22px
        width 40%
        height 40px
        line-height 35px
    .button
        width 30%
        margin-left 35%
        height 45px
        line-height 45px
        font-size 22px
        color white
        background rgb(82,130,170)
        border 0
</style>
