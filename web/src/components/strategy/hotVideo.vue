<template>
  <div class="card bg-white p-3 mt-3">
    <div :class="{ 'list-hidden': !isShowAll }">
      <div class="card-header d-flex ai-center py-3">
        <i class="iconfont icon-shipin"></i>
        <strong class="fs-xl flex-1 px-2">热门视频</strong>
        <div class="nav">
          <span
            v-for="(item, i) in hotVideosList"
            :key="i"
            class="mx-2 py-1 nav-item"
            @click="handleClick(i)"
            :class="{'active':active === i}"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
      <div class="card-body pt-3 pb-2">
        <swiper
          ref="list"
          autoHeight
          @swiper="onSwiper"
          @slide-change="() => (active = swiper.realIndex)"
        >
          <swiper-slide v-for="(item, index) in hotVideosList" :key="index">
            <div
              v-for="(video, i) in item.data"
              :key="video._id"
              class="d-flex border-bottom my-3"
            >
              <div class="mr-1">{{ i + 1 + "." }}</div>
              <a
                :href="video.url"
                class="text-ellipse flex-1 text-black pb-2"
                >{{ video.title }}</a
              >
              <div>
                <i class="iconfont icon-shipin mr-1"></i>
                <span class="fs-xxs">{{ video.play_volume }}</span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="py-2 fs-sm text-center" @click="showAll">
      <span>{{ isShowAll ? "收起" : "查看完整内容" }}</span>
    </div>
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
export default {
  components: { Swiper, SwiperSlide },
  data() {
    return {
      hotVideosList: [],
      active: 0,
      isShowAll: false,
    };
  },
  methods: {
    async fetchhotVideosList() {
      const res = await this.$http.get("/strategy/hotvideos");
      this.hotVideosList = res.data;
    },
    onSwiper(swiper) {
      this.swiper = swiper;
    },
    showAll() {
      this.isShowAll = !this.isShowAll;
    },
    handleClick(index){
        this.active = index
        this.swiper.slideTo(index)
    }
  },
  created() {
    this.fetchhotVideosList();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_variables.scss";
.card {
  .card-header {
    border-bottom: 1px solid $border-color;
  }
}
.list-hidden {
  height: 13.5rem;
  overflow: hidden;
}
</style>