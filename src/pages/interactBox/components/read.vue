<template>
  <div class='receiveBox'>
    <div class="head">
      热门信件
    </div>
    <a-table :columns="columns" :dataSource="data" :pagination="pagination" size='middle'>
      <span slot="identify" slot-scope="text" class="content">{{identifyObj[text]}}</span>
      <span slot="owneremail" slot-scope="text" class="content">{{text}}</span>
      <span slot="lettertime" slot-scope="text" class="content">{{text}}</span>
      <span slot="lettertitle" slot-scope="text" class="content">{{text}}</span>
      <span slot="action" slot-scope="text, record">
        <a href="javascript:" @click="onPressCheck(record)">详情</a>
      </span>
    </a-table>
    <modal name="message-detail" height="auto" :scrollable="true">
      <div class="modal-box">
        <header>
          <p>dear {{modal.userName}}</p>
        </header>
        <main class="origin-box">
          <p>原信件内容:</p>
          <p style="font-weight: 400;text-indent: 2em;">{{modal.content}}</p>
          <p class="time-box">{{modal.letterTime}}</p>
        </main>
        <main class="back-box">
          <p>回复内容:</p>
          <p style="font-weight: 400;text-indent: 2em;">{{modal.returnMessage}}</p>
        </main>
        <footer>
          <p>from 局长</p>
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
        title: '',
        content: '',
        userName: '',
        returnMessage: '',
        letterTime: ''
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
    onPressCheck (e) {
      this.modal = {
        letterid: e.letterid,
        title: e.lettertitle,
        content: e.lettercontent,
        userName: e.owneremail,
        returnMessage: e.returninfo,
        letterTime: e.lettertime
      }
      this.$modal.show('message-detail')
    }
  }
}
</script>
<style lang="stylus" scoped>
.head
  width 100%
  font-size 25px
  padding 10px 0
.receiveBox
  margin 0 auto
  min-height 600px
  width 800px
  background-color #fff
  border-radius 10px
  p
    font-weight 600
  main
    p
      margin-top 1em
      padding-left 1em
      text-align left
      font-weight 500
  .footer-form
    display flex
    flex-direction column
    align-items flex-end
.ant-table-wrapper {
  zoom: 1;
  width: 100%;
}
.ant-table-thead > tr, .ant-table-tbody > tr {
  transition: all 0.3s, height 0s;
  height: 40px;
}
footer
  margin-top 50px
  text-align right
  border-top #416786 1px solid
.origin-box
  background-color #416786
  padding 3px 0
  color white
  border-radius 15px
.back-box
  margin-top 40px
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
.time-box
  margin-left 600px
</style>
