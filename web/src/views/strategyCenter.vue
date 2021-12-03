<template>
  <div>
    <!-- 轮播图 -->
    <swiper
      class="swiper-container"
      autoplay
      loop
      :slides-per-view="1"
      :pagination="{ clickable: false }"
    >
      <swiper-slide
        class="swiper-slide"
        v-for="item in slides.items"
        :key="item._id"
      >
        <img class="w-100" :src="item.image" />
      </swiper-slide>
    </swiper>
    <!-- 热门视频 -->
    <HotVideo/>
    <!-- 英雄攻略 -->
    <HeroStrategy />
    <!-- 精品栏目 -->
    <Videos />
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
import HotVideo from "../components/strategy/hotVideo.vue";
import HeroStrategy from "../components/strategy/heroStrategy.vue";
import Videos from "../components/home/videos.vue";
export default {
  components: { Swiper, SwiperSlide,HotVideo,HeroStrategy,Videos },
  data() {
    return {
      slides: {},
    };
  },
  methods: {
    async fetchSlides() {
      const res = await this.$http.get("/ads/list");
      this.slides = res.data[0];
    },
  },
  created() {
    this.fetchSlides();
  },
};
</script>

<style lang="scss" scoped>
</style>