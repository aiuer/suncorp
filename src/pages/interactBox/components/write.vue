<template>
  <div class="write-box">
    <div class="box-title">
      <p>“局长信箱”为您服务</p>
    </div>
    <div class="box-require">
      <p>（一）"局长信箱"是我局反映信访问题的渠道之一，也是我局进一步密切与人民群众联系的桥梁和纽带。受理举报、咨询、批评建议、申诉、控告及其他要求解决个人问题的信访事项。具体受理范围包括：</p>
      <ol>
        <li>刑事、治安类违法犯罪线索；</li>
        <li>咨询人口、出入境、交通管理等各类公安业务；</li>
        <li>对公安工作提出批评、建议；</li>
        <li>对公安机关的各类处理决定提出申诉；</li>
        <li>对公安民警在执法过程中发生的问题提出控告、投诉；</li>
        <li>涉及公安业务的其他问题。</li>
      </ol>
      <p>（二）填报人应逐项如实、详尽填写相关内容，以便得到及时的回复，相同内容的信件填写一次即可.</p>
      <p>（三）已经通过书信、走访、传真、电话渠道向市局信访部门反映的问题，请通过原反映问题渠道查询办理情况。</p>
    </div>
    <div class="box-input">
      <a-form
        :form="form"
        @submit="handleSubmit"
      >
        <a-form-item
          v-bind="formItemLayout"
          label="姓名"
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{
                  required: true, message: '真实姓名不能为空!',
                }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="身份证号"
        >
          <a-input
            v-decorator="[
              'cardId',
              {
                rules: [{
                  required: true, message: '身份证号不能为空!',
                }, {
                  pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                  message: '身份证号格式不正确！'
                }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="电话号码"
        >
          <a-input
            v-decorator="[
              'phone',
              {
                rules: [{ required: true, message: '电话号码不得为空!' }],
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
          label="所属区域"
        >
          <a-cascader
            v-decorator="[
              'residence',
              {
                initialValue: ['成都', '龙泉驿区'],
                rules: [{ type: 'array', required: true, message: '请选择你所属区域!' }],
              }
            ]"
            :options="residences"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="信件标题"
        >
          <a-input
            v-decorator="[
              'title',
              {
                rules: [{
                  required: true, message: '信件标题不能为空!',
                }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="信件内容"
        >
          <a-textarea
             v-decorator="[
              'content',
              {
                rules: [{ required: true, message: '信件内容不得为空!' }],
              }
            ]"
            :rows="5"/>
        </a-form-item>
        <a-form-item style="text-align:center;">
          <a-button
            type="primary"
            html-type="submit"
          >
            发送
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
const residences = [{
  label: '四川',
  value: 'sichuan',
  children: [{
    label: '成都',
    value: 'chengdu',
    children: [{
      label: '龙泉驿区',
      value: 'longquan'
    },
    {
      label: '武侯区',
      value: 'wuhou'
    },
    {
      label: '锦江区',
      value: 'jinjiang'
    }]
  }]
}]
export default {
  data () {
    return {
      confirmDirty: false,
      residences,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    handleSubmit  (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (err) {
          console.log('Received values of form: ', values)
        } else {
          const sunCitizenmes = {
            creditId: values.cardId,
            LetterTitle: values.title,
            LetterContent: values.content
          }
          console.log('success values of form: ', sunCitizenmes)
          const params = this.qs.stringify(sunCitizenmes)
          this.$ajax({
            url: `/api/letter/addLetterByCardid?${params}`
          })
            .then((response) => {
              this.$notification.open({
                message: '发送成功',
                description: '发送成功！感谢你的意见和互动！感谢你的支持~',
                icon: <a-icon type="smile" style="color: #108ee9" />
              })
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
    },
    handleConfirmBlur  (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    }
  }
}
</script>
<style lang="stylus" scoped>
.write-box
  width 800px
  display flex
  background-color white
  flex-direction column
  align-items  flex-end
  margin 0 auto
.box-title
  width 100%
  margin-top 10px
  font-size 20px
  border-bottom gray 1px solid
  p
    text-align left
    margin auto 0
    padding 10px 0
.box-input
  width 100%
  padding 10px 10px
.ant-form-item-control {
  position: relative;
  zoom: 1;
  text-align: center;
}
</style>
