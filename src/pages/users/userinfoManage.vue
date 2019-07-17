<template>
<div>
  <div style="margin: 6px 10px 6px 10px">
    <a-button
      type="primary"
      @click="showDeleteConfirm"
      :disabled="!hasSelected"
      :loading="loading"
    >
      删除
    </a-button>
    <span style="margin-left: 8px">
      <template v-if="hasSelected">
        {{`选择了 ${selectedRowKeys.length} 项`}}
      </template>
    </span>
  </div>
  <a-modal
      title="确认框"
      v-model="visible"
      @ok="handleOk"
    >
      <p>你确定要删除这些用户吗？</p>
  </a-modal>
  <a-table :columns="columns"
    :dataSource="data"
    :pagination="pagination"
    :scroll="{ x: 1300, y: 800 }"
    @change="handleTableChange"
    :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
  >
    <a slot="action" @click="() => edit(selectedRowKeys)">修改</a>
    <template slot="name" slot-scope="name">
      {{name.first}} {{name.last}}
    </template>
  </a-table>
</div>
</template>
<script>
const columns = [
  {
    title: '姓名',
    dataIndex: 'citiname',
    sorter: true,
    width: '10%',
    scopedSlots: { customRender: 'citiname' }
  },
  {
    title: '身份证号码',
    dataIndex: 'citicreditid',
    width: '15%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    filters: [
      { text: 'M', value: '男' },
      { text: 'FM', value: '女' }
    ],
    width: '10%'
  },
  {
    title: '籍贯',
    dataIndex: 'nativeaddress',
    width: '20%'
  },
  {
    title: '联系电话',
    dataIndex: 'phonenumber',
    width: '15%'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '20%'
  },
  {
    title: '编辑',
    key: 'x',
    fixed: 'right',
    scopedSlots:
    {
      customRender: 'action'
    }
  }
]

export default {
  mounted () {
    this.fetch()
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  data () {
    return {
      data: [],
      pagination: {},
      loading: false,
      visible: false,
      columns,
      selectedRowKeys: []
    }
  },
  methods: {
    handleOk () {
      for (var i = 0; i < this.selectedRowKeys.length; i++) {
        var temp = {
          creditId: this.data[this.selectedRowKeys[i]].citicreditid
        }
        let param = this.qs.stringify(temp)
        this.$ajax({
          url: `/api/citizenMes/deleteuser?${param}`,
          methods: 'get'
        }).then((response) => {
          if (response.status === 200) {
            alert('删除成功！')
            this.$router.go(0)
          }
        }).catch((error) => {
          console.log(error)
        })
      }
      this.visible = false
    },
    edit (key) {
    },
    showDeleteConfirm () {
      this.visible = true
    },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    fetch (params = {}) {
      console.log('params:', params)
      this.loading = true
      this.$ajax({
        url: '/api/citizenMes/all',
        methods: 'get'
      }).then((response) => {
        console.log(response.data)
        const pagination = { ...this.pagination }
        // Read total count from server
        pagination.total = this.data.length
        // pagination.total = 200
        this.loading = false
        this.data = response.data
        this.pagination = pagination
      })
        .catch((error) => {
          console.log(error)
        })
      // reqwest({
      //   url: 'https://randomuser.me/api',
      //   method: 'get',
      //   data: {
      //     results: 10,
      //     ...params
      //   },
      //   type: 'json'
      // }).then((data) => {
      //   const pagination = { ...this.pagination }
      //   // Read total count from server
      //   // pagination.total = data.totalCount
      //   pagination.total = 200
      //   this.loading = false
      //   this.data = data.results
      //   this.pagination = pagination
      // })
    }
  }
}
</script>
