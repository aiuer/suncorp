<template>
  <div :style="{height: '100%', display: 'flex', flexDirection: 'column'}" id="app">
    <v-header class="header"/>
    <div class="body">
      <router-view @touser='jumptouser'></router-view>
    </div>
    <v-footer class="footer"/>
  </div>
</template>
<script>
import header from './components/header/header.vue'
import footer from './components/footer/footer.vue'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    'v-header': header,
    'v-footer': footer
  },
  methods: {
    jumptolog (mes) {
      if (mes === 'jumped') {
        this.$router.push('/log')
      }
    },
    jumptouser (mes) {
      if (mes === 'logged') {
        this.$router.push('/user')
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header
    width 100%
    // height auto
    // min-height 100%
  .footer
    position relative
    width 100%
    height 280px
    margin 0px auto 0 auto
    clear both
  .body
   display flex
   flex 1
   background #5282aa
</style>
