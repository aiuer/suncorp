<template>
  <div class="leader-body">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in leaders" v-bind:key="index">
        <a><img class="swiper-img" :src="item.images"/></a>
        <div class="leader-intro">
          <p>姓名：{{item.name}}</p>
          <p>年龄：{{item.age}}</p>
          <p>出生时间：{{item.birth}}</p>
          <p>性别：{{item.sex}}</p>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgArr: [],
      leaders: [],
      swiperOption: {
        effect: 'cube',
        grabCursor: true,
        cubeEffect: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  mounted: function () {
    this.getLeaders()
  },
  methods: {
    getLeaders () {
      this.$ajax.get('http://localhost:3003/leaders').then((res) => {
        this.leaders = res.data
      })
    }
  }
}
</script>

<style scoped>
  .leader-body {
    margin-top: 6%;
    width: 100%;
    height: 80%;
  }
  .swiper-inner {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 80%;
      padding: 15px;
    }
  .swiper-container {
    width: 80%;
    height: 90%;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 5%;
    padding-top: 5%;
  }
  a {
    width: 48%;
    height: 100%;
  }
  .leader-intro {
    width: 48%;
    height: auto;
    font-size: 15px;
    overflow: hidden;
  }
  .swiper-img {
    width: 100%;
    height: 100%;
    padding-bottom: 10%;
  }
  .swiper-pagination {
    bottom: 0;
  }
</style>
