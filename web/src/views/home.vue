<template>
  <div>
    <!-- 轮播图开始 -->
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
    <Card icon="Menu" title="新闻资讯">
        <div class="nav pb-3 jc-between">
          <div class="nav-item active">
            <router-link class="nav-link" v-slot="{ navigate }" to="/home">
              <div @click="navigate" @keypress.enter="navigate" role="link">
                热门
              </div>
            </router-link>
          </div>
          <div class="nav-item">
            <router-link
              class="nav-link"
              v-slot="{ navigate }"
              to="/strategycenter"
            >
              <div @click="navigate" @keypress.enter="navigate" role="link">
                新闻
              </div>
            </router-link>
          </div>
          <div class="nav-item">
            <router-link
              class="nav-link"
              v-slot="{ navigate }"
              to="/matchcenter"
            >
              <div @click="navigate" @keypress.enter="navigate" role="link">
                公告
              </div>
            </router-link>
          </div>
                    <div class="nav-item">
            <router-link
              class="nav-link"
              v-slot="{ navigate }"
              to="/matchcenter"
            >
              <div @click="navigate" @keypress.enter="navigate" role="link">
                活动
              </div>
            </router-link>
          </div>
                    <div class="nav-item">
            <router-link
              class="nav-link"
              v-slot="{ navigate }"
              to="/matchcenter"
            >
              <div @click="navigate" @keypress.enter="navigate" role="link">
                赛事
              </div>
            </router-link>
          </div>
        </div>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="m in 5" :key="m">
               <div class="py-2" v-for="n in 5" :key="n">
                   <span>[新闻]</span>
                    <span>|</span>
                    <span>虎牙雷霆杯新玩法上限，看主播</span>
                    <span>11/26</span>
               </div>
            </div>
          </div>
        </div>
    </Card>
    <Card icon="Menu" title="英雄列表"/>
  </div>
</template>

<script>
import Swiper from "swiper/swiper-bundle.min.js";
import "swiper/swiper-bundle.min.css";
import Card from '../components/card.vue'
export default {
  components:{Card},
  data() {
    return {
      active: 0,
    };
  },
  mounted() {
    new Swiper(".swiper-container", {
      loop: true, //循环
      autoplay: true,
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