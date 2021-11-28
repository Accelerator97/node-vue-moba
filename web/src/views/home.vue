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
    <ListCard icon="Menu" title="新闻资讯" :categories="newsCats">
      <template #items="{ category }">
        <div
          v-for="(news, index) in category.newsList"
          :key="index"
          class="py-2 fs-lg d-flex"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark text-ellipse">{{ news.title }}</span>
          <span class="fs-sm">{{ beautify(news.createTime) }}</span>
        </div>
      </template>
    </ListCard>
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
import ListCard from "../components/listCard.vue";
import dayjs from "dayjs";
export default {
  components: { ListCard, Swiper, SwiperSlide },
  data() {
    return {
      newsCats: [],
    };
  },
  created() {
    this.fetchNewsCats();
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      console.log(res.data);
      this.newsCats = res.data;
    },
    beautify(date) {
      return dayjs(date).format("MM/DD");
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
</style>