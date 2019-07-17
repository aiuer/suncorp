<template>
  <swiper :options="swiperOption" class="swiper-box">
    <swiper-slide v-for="(item, index) in imgArr" v-bind:key="index">
      <div class="swiper-img" :style="{'background-image': `url(${item})`}" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import slide1 from './slide1.png'
import slide2 from './slide2.png'
import slide3 from './slide3.png'
import slide4 from './slide4.png'
import slide5 from './slide5.png'
export default {
  data () {
    return {
      imgArr: [slide1, slide2, slide3, slide4, slide5],
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: false
        // },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
        // wrapperClass: '.swiper-wrapper'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.swiper-box
  width 100%
  height 100%
.swiper-wrapper
  display flex
  align-items center
.swiper-slide
  width 100%
  height 100%
.swiper-img
  width 100%
  height 100%
  background-size contain
  background-repeat no-repeat
  background-position center
</style>
