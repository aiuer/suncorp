<template>
  <div class="log-box">
    <div class="manage-box">
        <p style="padding-left: 1em">操作日志管理</p>
        <a-table :columns="columns1" :dataSource="mdata" :pagination="pagination" size='middle'>
            <span slot="create_time" slot-scope="text" class="content">{{identifyObj[text]}}</span>
            <span slot="url" slot-scope="text" class="content">{{text}}</span>
            <span slot="user_id" slot-scope="text" class="content">{{text}}</span>
        </a-table>
    </div>
    <div class="system-box">
        <p style="padding-left: 1em">系统日志管理</p>
        <a-table :columns="columns2" :dataSource="sdata" :pagination="pagination" size='middle'>
            <span slot="level" slot-scope="text" class="content">{{identifyObj[text]}}</span>
            <span slot="logger" slot-scope="text" class="content">{{text}}</span>
            <span slot="time" slot-scope="text" class="content">{{text}}</span>
            <span slot="message" slot-scope="text" class="content">{{text}}</span>
        </a-table>
    </div>
  </div>
</template>
<script>

const columns1 = [{
  title: '触发时间',
  dataIndex: 'create_time',
  key: 'create_time',
  // 按发件日期长度排序
  sorter: (a, b) => new Date(a.create_time).getTime() - new Date(b.create_time).getTime()
}, {
  title: '路径',
  dataIndex: 'url',
  key: 'url'
  // 按名字长度排序
}, {
  title: '操作用户',
  dataIndex: 'user_id',
  key: 'user_id',
  scopedSlots: { customRender: 'user_id' }
}]

const columns2 = [{
  title: '等级',
  dataIndex: 'level',
  key: 'level',
  sorter: (a, b) => a.level - b.level
}, {
  title: '日志',
  dataIndex: 'logger',
  key: 'logger'
}, {
  title: '触发时间',
  dataIndex: 'time',
  key: 'time',
  sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
}, {
  title: '提示信息',
  dataIndex: 'message',
  key: 'message'
}]

export default {
  mounted: function () {
    this.getManageLog()
    this.getSystemLog()
  },
  data () {
    return {
      mdata: [],
      sdata: [],
      columns1,
      columns2,
      visible: false,
      loading: false
    }
  },
  methods: {
    getManageLog () {
      this.$ajax({
        url: `/api/log/getlog`
      })
        .then((response) => {
          console.log(response.data)
          this.mdata = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getSystemLog () {
      this.$ajax({
        url: `/api/log/getsystemlog`
      })
        .then((response) => {
          console.log(response.data)
          this.sdata = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.manage-box
  min-height 600px
  width 90%
  background-color #fff
  margin-top 55px
  margin-bottom 55px
  border-radius 10px
  padding-top 1em
  p
    font-weight 600
.system-box
  min-height 600px
  width 90%
  background-color #fff
  margin-top 55px
  margin-bottom 55px
  border-radius 10px
  padding-top 1em
  p
    font-weight 600
</style>
