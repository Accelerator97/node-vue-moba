<template>
  <div>
    <div class="nav pb-3 jc-between pt-3">
      <div
        class="nav-item mx-2"
        :class="{ active: currentNavIndex === index }"
        v-for="(category, index) in matchCates"
        :key="index"
        @click="handleClick(index)"
      >
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <swiper
      ref="list"
      @swiper="onSwiper"
      @slide-change="slideChange"
      :options="{ autoHeight: true }"
    >
      <swiper-slide v-for="(category, index) in matchCates" :key="index">
        <div class="race-content">
          <div class="d-flex mb-2 mt-1">
            <span class="text-blue fs-xxl" style="font-weight: bold"
              >王者荣耀{{ category.name }}</span
            >
            <span class="logo-text pb-2">官方举办</span>
          </div>
          <div>
            <img :src="category.banner" class="w-100" />
          </div>
          <div
            class="w-100 bg-grey-2 mt-2 fs-lg text-center"
            style="color:#a2a2a2;height：28.5px;line-height:28.5px"
          >
            <span>赛事咨询</span>
          </div>

          <ul class="pl-0">
            <li
              v-for="item in category.information_list"
              :key="item._id"
              class="my-1"
            >
              <a :href="item.url" style="color: #a2a2a2">
                <span
                  class="text-ellipse mr-4 ml-1"
                  style="width: 85%; vertical-align: middle"
                  >{{ item.title }}</span
                >
                <span style="width: 15%; vertical-align: middle">{{
                  beautify(item.updateTime)
                }}</span>
              </a>
            </li>
          </ul>
          <div
            class="w-100 bg-grey-2 mt-2 fs-lg text-center"
            style="color:#a2a2a2;height：28.5px;line-height:28.5px"
          >
            <span>{{
              isSeeMore
                ? "已显示全部内容"
                : isLoding
                ? "加载中..."
                : "上拉加载更多"
            }}</span>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { List } from "vant";
import Scroll from "../components/scroll.vue";
import dayjs from "dayjs";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
export default {
  components: { Swiper, SwiperSlide },
  data() {
    return {
      matchCates: [],
      matchBanners: [
        { img: require("../assets/images/matchBanner/1.jpg") },
        { img: require("../assets/images/matchBanner/2.jpg") },
        { img: require("../assets/images/matchBanner/3.jpg") },
        { img: require("../assets/images/matchBanner/4.jpg") },
        { img: require("../assets/images/matchBanner/5.jpg") },
        { img: require("../assets/images/matchBanner/6.jpg") },
        { img: require("../assets/images/matchBanner/7.jpg") },
        { img: require("../assets/images/matchBanner/8.jpg") },
      ],
      pageNum: 1,
      isSeeMore: false,
      isLoding: false,
      currentNavIndex: 0,
      swiper: null,
    };
  },
  computed: {
    scroll() {
      return this.$refs.raceScroll.scroll;
    },
  },
  methods: {
    async fetchmatchCates() {
      const res = await this.$http.get("/race/information");
      this.matchCates = res.data;
      this.matchCates.map((item, i) => {
        item.banner = this.matchBanners[i].img;
      });
    },
    beautify(date) {
      return dayjs(date).format("MM/DD");
    },
    async pullingUp() {
      this.scroll.refresh();
      this.isLoding = true;
      const res = await this.$http.get("/race/information", {
        params: {
          id: this.matchCates[this.currentNavIndex]._id,
          pageNum: this.pageNum,
        },
      });
      // console.log("上拉加载请求回来的数据");
      // console.log(res.data);
      this.isLoding = false;
      // 如果拿到结果则让页数＋1，并重启下拉加载事件
      // 如果服务器出现错误，则重启下拉加载事件
      // 如果没有更多数据或页数等于5时，则终止下拉加载
      if (!res) return this.scroll.finishPullUp();
      if (res.data.length === 0) return (this.isSeeMore = true);
      this.matchCates[this.currentNavIndex].information_list.push(...res.data);
      this.scroll.refresh();
      this.scroll.finishPullUp();
      // console.log("请求回来数据合并", this.matchCates);
      this.pageNum++;
    },
    handleClick(index) {
      this.$nextTick(() => {
        this.scroll.refresh();
      });
      this.swiper.slideTo(index);
      this.currentNavIndex = index;
      if (this.matchCates[this.currentNavIndex].information_list.length > 50) {
        this.pageNum = 5;
        this.isSeeMore = false;
      } else if (
        this.matchCates[this.currentNavIndex].information_list.length <= 50 &&
        this.matchCates[this.currentNavIndex].information_list.length > 40
      ) {
        this.pageNum = 4;
        this.isSeeMore = false;
        this.scroll.finishPullUp();
      } else if (
        this.matchCates[this.currentNavIndex].information_list.length <= 30 &&
        this.matchCates[this.currentNavIndex].information_list.length > 20
      ) {
        this.pageNum = 3;
        this.isSeeMore = false;
        this.scroll.finishPullUp();
      } else if (
        this.matchCates[this.currentNavIndex].information_list.length <= 20 &&
        this.matchCates[this.currentNavIndex].information_list.length > 10
      ) {
        this.pageNum = 2;
        this.isSeeMore = false;
        this.scroll.finishPullUp();
      } else {
        this.pageNum = 1;
        this.isSeeMore = false;
        this.scroll.finishPullUp();
      }
    },
    slideChange() {
      this.$nextTick(() => {
        this.scroll.refresh();
      });
      this.scroll.scrollTo(0, 0, 500);
      this.currentNavIndex = this.swiper.realIndex;
      if (this.matchCates[this.currentNavIndex].information_list.length > 50) {
        this.pageNum = 5;
        this.isSeeMore = false;
      } else if (
        this.matchCates[this.currentNavIndex].information_list.length <= 50 &&
        this.matchCates[this.currentNavIndex].information_list.length > 40
      ) {
        this.pageNum = 4;
        this.isSeeMore = false;
        this.scroll.finishPullUp();
      } else if (
        this.matchCates[this.currentNavIndex].information_list.length <= 30 &&
        this.matchCates[this.currentNavIndex].information_list.length > 20
      ) {
        this.pageNum = 3;
        this.isSeeMore = false;
        this.scroll.finishPullUp();
      } else if (
        this.matchCates[this.currentNavIndex].information_list.length <= 20 &&
        this.matchCates[this.currentNavIndex].information_list.length > 10
      ) {
        this.pageNum = 2;
        this.isSeeMore = false;
        this.scroll.finishPullUp();
      } else {
        this.pageNum = 1;
        this.isSeeMore = false;
        this.scroll.finishPullUp();
      }
    },
    onSwiper(swiper) {
      this.swiper = swiper;
    },
  },
  created() {
    this.fetchmatchCates();
  },
};
</script>

<style lang="scss" scoped>
// .scroll {
//   height: calc(100vh - 3.48rem);
//   overflow: hidden;
//   touch-action: none;
  .nav {
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .nav-item {
      white-space: nowrap;
    }
  }
  .logo-text {
    border: 1px solid #a2a2a2;
    border-radius: 50px;
    min-width: 5.4254rem;
    color: #a2a2a2;
    padding: 0.5% 2%;
    margin-left: 4%;
    width: auto;
  }
</style>