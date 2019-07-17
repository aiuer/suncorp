<template>
  <div class='receiveBox'>
    <p style="padding-left: 1em">收件箱</p>
    <a-table :columns="columns" :dataSource="data" :pagination="pagination" size='middle'>
      <span slot="identify" slot-scope="text" class="content">{{identifyObj[text]}}</span>
      <span slot="owneremail" slot-scope="text" class="content">{{text}}</span>
      <span slot="lettertime" slot-scope="text" class="content">{{text}}</span>
      <span slot="lettertitle" slot-scope="text" class="content">{{text}}</span>
      <span slot="action" slot-scope="text, record">
        <a href="javascript:" @click="onPressDel(record)">删除</a>
        <a href="javascript:" @click="onPressCheck(record)">详情</a>
      </span>
    </a-table>
    <modal name="message-detail" height="auto" :scrollable="true">
      <div class="modal-box">
        <header>
          <p>发件人: {{modal.userName}}</p>
        </header>
        <main>
          <p>内容</p>
          <p style="font-weight: 400">{{modal.content}}</p>
        </main>
        <footer>
          <p>回复</p>
          <div class="footer-form">
            <a-textarea
              placeholder="Basic usage"
              :value="inputValue"
              @change="e => this.inputValue = e.target.value"
              :rows="4" />
            <a-button
                type="primary"
                :loading="loading"
                @click="onPressSendBtn"
                class="btn-form">
                发送
              </a-button>
          </div>
        </footer>
      </div>
    </modal>
  </div>
</template>
<script>
const identifyObj = {
  'admin': '管理员',
  'police': '警察',
  'resident': '居民'
}
const columns = [{
  dataIndex: 'identify',
  title: '身份',
  key: 'identify',
  scopedSlots: { customRender: 'identify' },
  // 筛选发件人的身份
  filters: [
    { text: '管理员', value: 'admin' },
    { text: '警察', value: 'police' },
    { text: '居民', value: 'resident' }
  ],
  onFilter: (value, record) => record.identify.indexOf(value) === 0
}, {
  title: '发件人',
  dataIndex: 'owneremail',
  key: 'owneremail',
  // 按名字长度排序
  sorter: (a, b) => a.owneremail.length - b.owneremail.length
}, {
  title: '日期',
  dataIndex: 'lettertime',
  key: 'lettertime',
  // 按发件日期长度排序
  sorter: (a, b) => new Date(a.lettertime).getTime() - new Date(b.lettertime).getTime()
}, {
  title: '简要内容',
  dataIndex: 'lettertitle',
  key: 'lettertitle',
  scopedSlots: { customRender: 'lettertitle' }
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]

export default {
  mounted: function () {
    this.getLetters()
  },
  data () {
    return {
      data: [],
      columns,
      visible: false,
      inputValue: '',
      loading: false,
      modal: {
        letterid: '',
        source: '',
        content: '',
        userName: ''
      },
      identifyObj
    }
  },
  methods: {
    getLetters () {
      this.$ajax({
        url: `/api/letter/capitalseeletters`
      })
        .then((response) => {
          console.log(response.data)
          this.data = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    onPressDel (e) {
      const i = this.data.findIndex(item => item.key === e.key)
      const sunCitizenmes = {
        letterid: this.data[i].letterid
      }
      const params = this.qs.stringify(sunCitizenmes)
      this.$ajax({
        url: `/api/letters/deleteByletterid?${params}`
      })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      this.data.splice(i, 1)
    },
    onPressCheck (e) {
      this.modal = {
        letterid: e.letterid,
        source: e.identify,
        content: e.lettercontent,
        userName: e.owneremail
      }
      this.$modal.show('message-detail')
    },
    onPressSendBtn () {
      // TODO: 这里需要后端提供方法发送信息
      const sunCitizenmes = {
        id: this.modal.letterid,
        returnText: this.inputValue
      }
      const params = this.qs.stringify(sunCitizenmes)
      this.$ajax({
        url: `/api/letter/return?${params}`
      })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      this.loading = true
      setTimeout(() => { this.loading = false }, 2000)
    }
  }
}
</script>
<style lang="stylus" scoped>
.receiveBox
  min-height 600px
  width 8rem
  background-color #fff
  margin-top 55px
  margin-bottom 55px
  border-radius 10px
  padding-top 1em
  p
    font-weight 600
  main
    // min-height 10em
  .footer-form
    display flex
    flex-direction column
    align-items flex-end
    .btn-form
      margin-top 1em
.detailBox
  width 100%
  height 100%
  display flex
  flex-direction column
  align-items center
.content
  overflow hidden
  text-overflow ellipsis
  max-width 200px
  max-height 53px
  white-space nowrap
  display block
.modal-box
  padding 1.6em
</style>
