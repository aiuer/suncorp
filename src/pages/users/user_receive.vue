<template>
  <div class='receiveBox'>
    <p>收件箱</p>
    <a-table :columns="columns" :dataSource="data" :pagination="pagination" size='middle'>
      <span slot="sendp" slot-scope="text" class="content">{{text}}</span>
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
    <v-dialog/>
  </div>
</template>
<script>
const columns = [{
  title: '发件人',
  dataIndex: 'sendp',
  key: 'sendp'
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
      userid: '',
      modal: {
        letterid: '',
        title: '',
        content: '',
        userName: '',
        returnMessage: '',
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
          var i = 0
          var j = 0
          var ming = []
          while (i < response.data.length) {
            var temp = response.data[i].returninfo
            if (temp === null || temp === undefined || temp === '') {
              i++
            } else {
              ming[j] = response.data[i]
              i++
              j++
            }
          }
          this.data = ming
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
    }
  }
}
</script>
<style lang="stylus" scoped>
.receiveBox
  width 8rem
  background-color #fff
  margin-top 55px
  margin-bottom 55px
  border-radius 10px
  min-height 600px
  p
    margin-top 1em
    padding-left 1em
    font-weight 500
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
