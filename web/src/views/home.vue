<template>
  <div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img class="w-100" src="../assets/images/1.jpeg" alt="" />
        </div>
        <div class="swiper-slide">
          <img class="w-100" src="../assets/images/2.jpeg" alt="" />
        </div>
        <div class="swiper-slide">
          <img class="w-100" src="../assets/images/3.jpeg" alt="" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper/swiper-bundle.min.js";
import "swiper/swiper-bundle.min.css";
export default {
  data() {
    return {
      active: 0,
    };
  },
  mounted() {
    new Swiper(".swiper-container", {
      loop: true, //循环
      //   autoplay: true,
      indicatorColor: "black",
      indicatorActiveColor: "#009f7f",
      pagination: {
        //分页符
        el: ".swiper-pagination",
      },
    });
  },
};
</script>

<style lang="scss">
@import "../assets/styles/_variables.scss";
.swiper-pagination {
  z-index: 99;
  > .swiper-pagination-bullet {
    background: #fff;
    opacity:0.5;
    text-align: right;
    &.swiper-pagination-bullet-active {
      background: map-get($colors,'info');
    }
  }
}
</style>