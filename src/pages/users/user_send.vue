<template>
  <div class='sendBox'>
    <p>发件箱</p>
    <a-table :columns="columns" :dataSource="data" :pagination="pagination" size='middle'>
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
          <p>收件人: admin</p>
        </header>
        <main>
          <p>内容</p>
          <p style="font-weight: 400">{{modal.content}}</p>
        </main>
        <footer>
          <p class="p-time">{{modal.letterTime}}</p>
        </footer>
      </div>
    </modal>
  </div>
</template>
<script>
const columns = [{
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
      loading: false,
      modal: {
        letterid: '',
        title: '',
        content: '',
        letterTime: ''
      }
    }
  },
  methods: {
    getLetters () {
      const sunCitizenmes = {
        userid: sessionStorage.getItem('user')
      }
      const params = this.qs.stringify(sunCitizenmes)
      this.$ajax({
        url: `api/letters/resident?${params}`
      })
        .then((response) => {
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
        content: e.lettercontent,
        title: e.lettertitle,
        letterTime: e.lettertime
      }
      this.$modal.show('message-detail')
    }
  }
}
</script>
<style lang="stylus" scoped>
.sendBox
  width 8rem
  background-color #fff
  margin-bottom 55px
  border-radius 10px
  p
    margin-top 1em
    padding-left 1em
    font-weight 500
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
.p-time
  text-align right
  margin-right 30px
</style>
