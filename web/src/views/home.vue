<template>
  <div>
    <!-- 轮播图开始 -->
    <swiper
      class="swiper-container"
      autoplay
      loop
      :slides-per-view="1"
      :pagination="{ clickable: false }"
    >
      <swiper-slide class="swiper-slide">
        <img class="w-100" src="../assets/images/1.jpeg" />
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <img class="w-100" src="../assets/images/2.jpeg" />
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <img class="w-100" src="../assets/images/3.jpeg" />
      </swiper-slide>
    </swiper>
    <!-- 轮播图结束 -->
    <!-- 精灵图开始 -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-item"></i>
          <div class="py-2">哈哈哈</div>
        </div>
      </div>

      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-2"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- 精灵图结束 -->
    <Articles/>
    <Heroes/>
  </div>
</template>

<script>
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
import Heroes from '../components/home/heroes.vue'
import Articles from '../components/home/articles.vue'
export default {
  components: {  Swiper, SwiperSlide,Heroes,Articles },
 
};
</script>

<style lang="scss">
@import "../assets/styles/_variables.scss";
.swiper-pagination {
  z-index: 99;
  > .swiper-pagination-bullet {
    background: #fff;
    opacity: 0.5;
    text-align: right;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-left: 1px solid $border-color;
    &:nth-child(4n + 1) {
      border-radius: none;
    }
  }
}
</style>