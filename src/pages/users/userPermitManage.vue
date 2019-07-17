<template>
  <a-table :dataSource="data" :columns="columns">
    <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" class='custom-filter-dropdown'>
      <a-input v-ant-ref="c => searchInput = c" :placeholder="`Search ${column.dataIndex}`" :value="selectedKeys[0]"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm)"
        style="width: 188px; margin-bottom: 8px; display: block;"
      />
      <a-button
        type='primary'
        @click="() => handleSearch(selectedKeys, confirm)"
        icon="search"
        size="small"
        style="width: 90px; margin-right: 8px"
      >Search</a-button>
      <a-button
        @click="() => handleReset(clearFilters)"
        size="small"
        style="width: 90px"
      >Reset</a-button>
    </div>
    <a-icon slot="filterIcon" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : undefined }" />
    <template slot="customRender" slot-scope="text">
      <span v-if="searchText">
        <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
          <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{fragment}}</mark>
          <template v-else>{{fragment}}</template>
        </template>
      </span>
      <template v-else>{{text}}</template>
    </template>
     <a-dropdown slot="edit">
        <a class="ant-dropdown-link" id="drop" href="#">
          点我 <a-icon type="down" />
        </a>
        <a-menu slot="overlay" @click="handMenuClick">
        <a-menu-item key="1">
            <a href="javascript:;">居民</a>
        </a-menu-item>
        <a-menu-item key="2">
            <a href="javascript:;">警察</a>
        </a-menu-item>
        <a-menu-item key="3">
            <a href="javascript:;">片区管理员</a>
        </a-menu-item>
        <a-menu-item key="4">
            <a href="javascript:;">系统管理员</a>
        </a-menu-item>
        <a-menu-item key="5">
            <a href="javascript:;">局长</a>
        </a-menu-item>
        </a-menu>
  </a-dropdown>
  <template slot="action" slot-scope="text, record">
      <a-button type="primary" @click="submit(record)">确认</a-button>
  </template>
  </a-table>
</template>

<script>
const data = [
  {
    key: '1',
    citiname: 'John Brown',
    citicreditid: '32231234',
    identity: '居民'
  },
  {
    key: '2',
    citiname: 'Joe Black',
    citicreditid: '3223521234',
    identity: '警察'
  },
  {
    key: '3',
    citiname: 'Jim Green',
    citicreditid: '3223231234',
    identity: '片区管理员'
  },
  {
    key: '4',
    citiname: 'Jim Red',
    citicreditid: '32213241234',
    identity: '系统管理员'
  }
]

export default {
  data () {
    return {
      data,
      searchText: '',
      choicecreditid: '',
      choiceidentity: '',
      searchInput: null,
      columns: [
        {
          title: '姓名',
          dataIndex: 'citiname',
          key: 'citiname',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.citiname.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          }
        },
        {
          title: '身份证号码',
          dataIndex: 'citicreditid',
          key: 'citicreditid',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.citicreditid.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: '原身份',
          dataIndex: 'identity',
          key: 'identity',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => record.identity.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          }
        },
        {
          title: '修改身份',
          dataIndex: 'edit',
          key: 'x',
          scopedSlots:
          {
            customRender: 'edit'
          }
        },
        {
          title: '确认',
          scopedSlots:
          {
            customRender: 'action'
          }
        }
      ]
    }
  },
  methods: {
    handMenuClick ({ key }) {
      // this.choice = e.citicreditid
      var temp = document.getElementsById('drop')
      var userarray = ['居民', '警察', '片区管理员', '系统管理员', '局长']
      console.log(userarray[key])
      temp.innerHTML = userarray[key]
      this.choice = key
      // switch (e.key) {
      //   case 1:
      //     this.choice = '1'
      //     break
      //   case 2:
      //     this.choice = '2'
      //     break
      //   case 3:
      //     this.choice = '3'
      //     break
      //   case 4:
      //     this.choice = '4'
      //     break
      //   case 5:
      //     this.choice = '5'
      //     break
      // }
    },
    submit (key) {
      const sunCitizenmes = {
        Id: data[key].citicreditid,
        roleId: this.choice
      }
      const params = this.qs.stringify(sunCitizenmes)
      this.$ajax({
        url: `api/citizenMes/modifypermit?${params}`
      })
        .then((response) => {
          alert('更新成功')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleMenuClick (e) {
      console.log('click', e)
    },
    loadingdata () {
      this.$ajax({
        url: `/api/citizenMes/all`
      })
        .then((response) => {
          this.data = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },
    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    }
  },
  mounted () {
    this.loadingdata()
  }
}
</script>
<style scoped>
.custom-filter-dropdown{
  padding:8px;
  border-radius:4px;
  background:#fff;
  box-shadow:0 2px 8px rgba(0, 0, 0, .15);
}
.highlight{
  background-color:rgb(255, 192, 105);
  padding:0px;
}
</style>
