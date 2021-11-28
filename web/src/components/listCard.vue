<template>
  <Card :icon="icon" :title="title">
    <div class="nav pb-3 jc-between">
      <div
        class="nav-item"
        :class="{ active: active === index }"
        v-for="(category, index) in categories"
        :key="index"
        @click="handleClick(index)"
      >
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <swiper autoHeight @swiper="onSwiper">
      <swiper-slide v-for="(category, index) in categories" :key="index">
        <slot name="items" :category="category"></slot>
      </swiper-slide>
    </swiper>
  </Card>
</template>

<script>
import Card from "../components/card.vue";
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

export default {
  components: { Card, Swiper, SwiperSlide },
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  data() {
    return {
      active: 0,
      swiper: null,
    };
  },
  methods: {
    handleClick(index) {
      this.active = index;
      this.swiper.slideTo(index); /*滑动到对应的滑块*/
    },
    onSwiper(swiper) {
      this.swiper = swiper;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>