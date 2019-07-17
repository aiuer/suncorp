<template>
<div class="wrapper">
  <a-list :grid="{ gutter: 16, column: 4 }" :dataSource="data">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-card :title="item.vitename"><a-button type="primary" block @click="showVoteDetail(index)">进入投票</a-button></a-card>
    </a-list-item>
  </a-list>
  <a-modal v-model="visible" title="投票详情" onOk="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">返回</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          提交
        </a-button>
      </template>
      <h1>{{data[choiceindex].vitename}}</h1>
      <h2>{{data[choiceindex].voteintro}}</h2>
      <p>选项</p>
      <a-list itemLayout="horizontal" :dataSource="itemdata">
        <a-list-item slot="renderItem" slot-scope="">
          <a-list-item-meta
            description=item.itemIntro
          >
            <a slot="title" href="https://vue.ant.design/">item.itemName</a>
            <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-modal>
</div>
</template>
<script>
const data = []
// const itemdata = []
export default {
  data () {
    return {
      data,
      itemdata: data.voteItem,
      loading: false,
      visible: false,
      choiceindex: 0
    }
  },
  mounted () {
    this.loadingdata()
  },
  methods: {
    loadingdata () {
      this.$http.get('api/voteMes').then((res) => {
        if (res) {
          console.log(res.body)
          this.data = res.body
        }
      })
    },
    showVoteDetail (index) {
      this.visible = true
      this.choiceindex = index
    },
    handleOk (e) {
      this.loading = true
      setTimeout(() => {
        this.visible = false
        this.loading = false
      }, 3000)
    },
    handleCancel (e) {
      this.visible = false
    }
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  margin 80px auto 50px auto
  width 100%
</style>
