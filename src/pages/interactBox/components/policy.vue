<template>
  <div class="policy-box">
    <div class="head">
      政策法规
    </div>
    <main>
      <a-table class="table" :columns="columns" :dataSource="data" :pagination="pagination" size='middle'>
        <a slot="infoID" slot-scope="text" href="javascript:">{{text}}</a>
        <a slot="infoTitle" slot-scope="text" class="content">{{text}}</a>
        <a slot="infoDate" slot-scope="text" class="content">{{text}}</a>
      </a-table>
    </main>
  </div>
</template>
<script>
const columns = [{
  title: '序号',
  dataIndex: 'infoID',
  key: 'ownerEmail',
  // 按名字长度排序
  sorter: (a, b) => a.infoID - b.infoID
}, {
  title: '法律法规',
  dataIndex: 'infoTitle',
  key: 'infoTitle',
  scopedSlots: { customRender: 'infoTitle' }
}, {
  title: '日期',
  dataIndex: 'infoDate',
  key: 'infoDate',
  // 按发件日期长度排序
  sorter: (a, b) => new Date(a.infoDate).getTime() - new Date(b.infoDate).getTime()
}]
export default {
  mounted: function () {
    this.getLaws()
  },
  data () {
    return {
      data: [],
      columns
      // identifyObj
    }
  },
  methods: {
    getLaws () {
      const sunCitizenmes = {
        type: '0'
      }
      const params = this.qs.stringify(sunCitizenmes)
      this.$ajax({
        url: `/api/webInfo/selectBytype?${params}`
      })
        .then((response) => {
          this.data = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="stylus">
.head
  width 100%
  font-size 25px
  padding 10px 0
main
  width 100%
  margin 20px 0
  min-height 600px
.ant-table-wrapper {
  zoom: 1;
  width: 80%;
}
.ant-table-thead > tr, .ant-table-tbody > tr {
  -webkit-transition: all 0.3s, height 0s;
  transition: all 0.3s, height 0s;
  height: 50px;
}
.ant-table-thead > tr > th, .ant-table-tbody > tr > td {
  padding: 0.213333rem 0.213333rem;
  text-align: center;
}
</style>
