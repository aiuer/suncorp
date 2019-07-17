<template>
<div class="wrapper">
        <!-- <form action="GET" class="form">
            <p v-show="showtip">{{showtip}}</p>
            <input type="text" v-model="citicreditid" placeholder="   请输入身份证号码"  class="inputtext"/><br>
            <input type="password" v-model="password" placeholder="   请输入密码" class="inputtext"/><br>
            <input type="button" value="登录" class="button" @click="login">
        </form> -->
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="login()"
  >
    <a-form-item>
      <a-input
         v-decorator="[
          'creditid',
          { rules: [{ required: true, message: '请输入你的身份证号码!' }] }
        ]"
        placeholder="身份证号码" v-model="citicreditid">
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入你的密码!' }] }
        ]"
        type="password"
        v-model="password"
        placeholder="密码"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        class="login-form-button"
      >
        登录
      </a-button>
    </a-form-item>
  </a-form>
</div>
</template>
<script>
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  data () {
    return {
      showtip: '',
      value: '',
      citicreditid: '',
      password: '',
      loading: false
    }
  },
  methods: {
    login () {
      this.loading = true
      const sunCitizenmes = {
        citicreditid: this.citicreditid,
        password: this.password
      }
      console.log(sunCitizenmes)
      const params = this.qs.stringify(sunCitizenmes)
      this.$ajax({
        url: `/api/citizenMes/login?${params}`
      })
        .then((response) => {
          console.log(response)
          sessionStorage.setItem('menuData', JSON.stringify(response.data))
          sessionStorage.setItem('user', this.citicreditid)
          this.$router.push('/user')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
/* 登录样式 */
.ant-form {
  width: 65%;
  margin: auto;
  height: 400px;
  line-height: 50px;
  margin-top: 180px;
  padding-top: 80px;
}
#components-form-demo-normal-login .login-form {
  max-width: 200px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.wrapper {
    background: white;
    margin: auto;
}
.ant-input {
  height: 0.656667rem;
}
.ant-btn {
  height: 0.656667rem;
}
form-inline-input{
  border:1px solid #dadada;
  border-radius:5px;
}
/* 滑块样式 */
.form-inline-input input,
.code-box{
  padding: 0 3px;
    width: 298px;
    height: 40px;
    color: #fff;
    text-shadow: 1px 1px 1px black;
    background: #efefef;
    border: 0;
    border-radius: 5px;
  outline: none;
}
.code-box{
  position: relative;
}
.code-box p,
.code-box span{
  display:block;
  position: absolute;
  left: 0;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  padding:0;
  margin:0;
}
.code-box span{
  width: 40px;
  background-color:#fff;
  font-size: 16px;
  cursor: pointer;
  margin-right:1px;
}
.code-box p{
  width: 0;
  background-color: #FFFF99;
  overflow: hidden;
  text-indent: -20px;
  transition: background 1s ease-in;
}
.code-box .code-input{
  display: none;
}
.code-box .code-input{
  display: none;
}

.form-inline-input{
  border:1px solid #dadada;
  border-radius:5px;
}
.form-inline-input input,
.code-box{
  padding: 0 3px;
    width: 298px;
    height: 40px;
    color: #fff;
    text-shadow: 1px 1px 1px black;
    background: #efefef;
    border: 0;
    border-radius: 5px;
  outline: none;
}
.code-box{
  position: relative;
}
.code-box p,
.code-box span{
  display:block;
  position: absolute;
  left: 0;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  padding:0;
  margin:0;
}
.code-box span{
  width: 40px;
  background-color:#fff;
  font-size: 16px;
  cursor: pointer;
  margin-right:1px;
}
.code-box p{
  width: 0;
  background-color: #FFFF99;
  overflow: hidden;
  text-indent: -20px;
  transition: background 1s ease-in;
}
.code-box .code-input{
  display: none;
}
.code-box .code-input{
  display: none;
}
</style>
