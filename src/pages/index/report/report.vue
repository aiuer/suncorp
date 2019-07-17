<template>
  <div class="rep-body">
    <div v-for="(item,index) in aArr" :key="index"  class="rep-container">
      <a href="item.ahref"><img :src="item.images"></a>
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
import r1 from './r1.png'
import r2 from './r2.png'
import r3 from './r3.png'
import r4 from './r4.png'
import r5 from './r5.png'
import r6 from './r6.png'
export default {
  data () {
    return {
      aArr: [
        {
          images: r1,
          title: '政务服务事项',
          ahref: '#'
        },
        {
          images: r2,
          title: '权力清单',
          ahref: '#'
        },
        {
          images: r3,
          title: '职权信息',
          ahref: '#'
        },
        {
          images: r4,
          title: '政策法规',
          ahref: '#'
        },
        {
          images: r5,
          title: '行政规范性文件',
          ahref: '#'
        },
        {
          images: r6,
          title: '文书公开',
          ahref: '#'
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
.rep-body
  margin-top 7%
  width 100%
  height auto
  overflow-y auto
  .rep-container
    width 33.333333%
    height 100%
    display inline-block
    text-align center
    vertical-align center
    p
      margin 0
      padding 0
</style>
