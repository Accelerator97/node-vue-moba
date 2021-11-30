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
      <div
        class="d-flex flex-wrap sprite-list"
        :class="{ 'sprite-hidden': !isShowAll }"
      >
        <div
          class="nav-item mb-3"
          v-for="(item, i) in spriteData"
          :key="i"
          @click="open(item.url)"
        >
          <i class="sprite sprite-item" :style="item.position"></i>
          <div class="py-2">{{ item.text }}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm" @click="entryBtnClick">
        <i class="sprite sprite-arrow-up mr-2" :class="{'sprite-arrow-down':!isShowAll}"></i>
        <span>{{ isShowAll ? "收起" : "展开" }}</span>
      </div>
    </div>
    <!-- 精灵图结束 -->
    <Articles />
    <Heroes />
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
import Heroes from "../components/home/heroes.vue";
import Articles from "../components/home/articles.vue";
export default {
  components: { Swiper, SwiperSlide, Heroes, Articles },
  data() {
    return {
      //精灵图数据
      spriteData: [
        {
          text: "爆料站",
          position: {
            "background-position": "63.546% 15.517%",
          },
          url: "https://pvp.qq.com/m/m201706/coming/index.htm",
        },
        {
          text: "故事站",
          position: {
            "background-position": "90.483% 15.614%",
          },
          url: "https://pvp.qq.com/act/a20160510story/index.htm?ADTAG=PC.QrCode.TG",
        },
        {
          text: "周边商城",
          position: {
            "background-position": " 36.746% 1.05%",
          },
          url: "https://pvp.qq.com/mall/m",
        },
        {
          text: "体验服",
          position: {
            "background-position": "10.408% 15.517%",
          },
          url: "https://pvp.qq.com/cp/a20161116tyf/page01.htm",
        },
        {
          text: "新人专区",
          position: {
            "background-position": "89.733% 1.266%",
          },
          url: "https://pvp.qq.com/m/m201606/goCenter.shtml",
        },
        {
          text: "荣耀传承",
          position: {
            "background-position": "36.467% 15.287%",
          },
          url: "https://pvp.qq.com/m/memory/index.shtml",
        },
        {
          text: "资料库",
          position: {
            "background-position": "10% 1.2%",
          },
          url: "https://pvp.qq.com/m/wzmnzm/index.html",
        },
        {
          text: "王者营地",
          position: {
            "background-position": "63.3% 0.92%",
          },
          url: "https://image.ttwz.qq.com/wzry/wzryzs_download_4001.htm?ADTAG=mpvp.qq.com",
        },
        {
          text: "公众号",
          position: {
            "background-position": "89.733% 1.266%",
          },
          url: "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90102708&appid=wx95a3a4d7c627e07d&url=https%3A%2F%2Fgame.weixin.qq.com%2Fcgi-bin%2Fh5%2Fstatic%2Fsubscribe%2Findex.html%3Fappid%3Dwx95a3a4d7c627e07d#wechat_redirect",
        },
        {
          text: "版本介绍",
          url: "https://pvp.qq.com/cp/a20190320bbgxsmm/index.html",
        },
        {
          text: "对局环境",
          url: "https://pvp.qq.com/cp/a20190917station/index.html",
        },
        {
          text: "创意互动营",
          url: "https://pvp.qq.com/m/hdy/p1/index.html",
        },
      ],
      //收起展开
      isShowAll: true,
    };
  },
  methods: {
    open(url) {
      window.open(url);
    },
    entryBtnClick() {
      this.isShowAll = !this.isShowAll;
    },
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

.sprite-list {
  transition: all 0.1s;
  &.sprite-hidden {
    height: 3.5rem;
    overflow: hidden;
    flex-wrap: no-wrap;
  }
}
</style>