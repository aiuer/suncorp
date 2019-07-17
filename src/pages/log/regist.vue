<template>
    <div class="wrapper">
        <!-- <form action="" class="formbox">
            <span class="title">姓名:</span><input class="input-box" v-model="citiname" type="text"><br/>
            <span class="title">身份证号:</span><input class="input-box" v-model="citicreditid" type="text"><br/>
            <span class="title">密码:</span><input class="input-box" type="password"><br/>
            <span class="title">确认密码:</span><input class="input-box" v-model="password" type="password"><br/>
            <span class="title">性别:</span>男<input type="radio" @click="choose1">&nbsp;女<input type="radio" @click="choose2"><br/>
            <span class="title">民族:</span><input class="input-box" type="text" v-model="nation"><br/>
            <span class="title">出生日期:</span>
            <a-date-picker>
                <template slot="dateRender" slot-scope="current, today">
                    <div class="ant-calendar-date" :style="getCurrentStyle(current, today)">
                    {{current.date()}}
                    </div>
                </template>
                </a-date-picker>
            <br/>
            <span class="title">电话号码:</span><input class="input-box" type="text" v-model="phonenumber"><br/>
            <span class="title">常住地址:</span><input class="input-box" type="text" v-model="nativeaddress"><br/>
            <input class="button" type="button" value="注册" @click="doRegist">
        </form> -->
    <a-form
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item
        v-bind="formItemLayout"
      >
      <span slot="label">
        姓名&nbsp;
      </span>
      <a-input
        v-model="citiname"
        v-decorator="[
          '姓名',
          {
            rules: [{ required: true, message: '请输入你的姓名!', whitespace: true }]
          }
        ]"
      />
      </a-form-item>
      <a-form-item
        label="身份证号码"
        v-bind="formItemLayout"
        >
      <a-input
         v-decorator="[
          'creditid',
          { rules: [{ required: true, message: '请输入你的身份证号码!' }] }
        ]"
        v-model="citicreditid">
      </a-input>
      </a-form-item>
      <a-form-item
          v-bind="formItemLayout"
          label="密码"
        >
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{
                required: true, message: '请输入你的密码!',
              }, {
                validator: validateToNextPassword,
              }],
            }
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="确认密码"
      >
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [{
                required: true, message: '请确认你的密码!',
              }, {
                validator: compareToFirstPassword,
              }],
            }
          ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="性别"
      >
        <span slot="label">
          性别&nbsp;
        </span>
        <a-radio-group name="radioGroup" :defaultValue="1">
          <a-radio :value="1" @click="choose1">男</a-radio>
          <a-radio :value="2" @click="choose1">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="民族"
      >
        <span slot="label">
          民族&nbsp;
        </span>
        <a-input
          v-model="nation"
          v-decorator="[
            '民族',
            {
              rules: [{ required: true, message: '请输入你的民族!', whitespace: true }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="出生日期"
      >
        <a-date-picker>
          <template slot="dateRender" slot-scope="current, today">
              <div class="ant-calendar-date" :style="getCurrentStyle(current, today)">
              {{current.date()}}
              </div>
          </template>
        </a-date-picker>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="电话号码"
      >
        <a-input
          v-model="phonenumber"
          v-decorator="[
            'phone',
            {
              rules: [{ required: true, message: '请输入你的电话号码!' }],
            }
          ]"
          style="width: 100%"
        >
          <a-select
            slot="addonBefore"
            v-decorator="[
              'prefix',
              { initialValue: '86' }
            ]"
            style="width: 70px"
          >
            <a-select-option value="86">
              +86
            </a-select-option>
            <a-select-option value="87">
              +87
            </a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="常住地址"
      >
        <a-cascader
          v-decorator="[
            'residence',
            {
              initialValue: ['浙江省', '杭州市', '西湖'],
              rules: [{ type: 'array', required: true, message: '请输入的常住地址!' }],
            }
          ]"
          :options="residences"
        />
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button
          type="primary"
          html-type="submit"
        >
          注&nbsp;&nbsp;&nbsp;&nbsp;册
        </a-button>
      </a-form-item>
    </a-form>
    </div>
</template>
<script>
const residences = [{
  value: '浙江省',
  label: '浙江省',
  children: [{
    value: '杭州市',
    label: '杭州市',
    children: [{
      value: '西湖',
      label: '西湖'
    }]
  }]
}, {
  value: '江苏省',
  label: '江苏省',
  children: [{
    value: '南京市',
    label: '南京市',
    children: [{
      value: '中华门',
      label: '中华门'
    }]
  }]
}]
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  data () {
    return {
      residences,
      citiname: '',
      citicreditid: '',
      password: '',
      sex: '',
      phonenumber: '',
      // nativeaddress: '',
      birthdat: '',
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 26,
            offset: 12
          }
        }
      }
    }
  },
  methods: {
    handleSubmit  (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.doRegist()
        }
      })
    },
    choose1 () {
      this.sex = '男'
    },
    choose2 () {
      this.sex = '女'
    },
    handleConfirmBlur  (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword  (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback(new Error('两次密码输入不一致!'))
      } else {
        this.password = value
        callback()
      }
    },
    validateToNextPassword  (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    doRegist () {
      const sunCitizenmes = {
        citicreditid: this.citicreditid,
        citiname: this.citiname,
        sex: this.sex,
        nation: this.nation,
        phonenumber: this.phonenumber,
        nativeaddress: this.residences,
        birthdat: this.birthdat,
        password: this.password
      }
      const params = this.qs.stringify(sunCitizenmes)
      this.$ajax({
        url: `/api/citizenMes/register?${params}`,
        methods: 'get'
      })
        .then((response) => {
          if (response.state !== 200) {
            alert('注册成功OK')
            this.$router.push('/log')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getCurrentStyle (current, today) {
      const style = {}
      this.birthdat = current.date()
      if (current.date() === 1) {
        style.border = '1px solid #1890ff'
        style.borderRadius = '50%'
      }
      return style
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.ant-form
  margin-top: 80px
  padding-right: 70px
  padding-top: 30px
  padding-bottom: 40px
  box-shadow: 0 0 20px #888888
</style>
