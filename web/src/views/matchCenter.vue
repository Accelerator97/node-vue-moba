<template>
  <div>
    <scroll
      class="scroll"
      :probe-type="3"
      click
      pullUpLoad
      ref="raceScroll"
      @pullingUp="pullingUp"
      scrollX
    >
      <list-card
        :categories="matchCates"
        :showHeader="false"
        icon="null"
        title="null"
      >
        <template #items="{ category }">
          <div>
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
            <ul class="p-0">
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
        </template>
      </list-card>
    </scroll>
  </div>
</template>

<script>
import ListCard from "../components/listCard.vue";
import Scroll from "../components/scroll.vue";
import dayjs from "dayjs";
export default {
  components: { ListCard, Scroll },
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
      console.log(this.matchCates);
    },
    beautify(date) {
      return dayjs(date).format("MM/DD");
    },
    async pullingUp() {
      this.scroll.refresh();
      this.isLoding = true;
      console.log("下拉");
      const res = await this.$http.get("/race/information", {
        params: {
          pageNum: this.pageNum,
        },
      });
      this.isLoding = false;
      // 如果拿到结果则让页数＋1，并重启下拉加载事件
      // 如果服务器出现错误，则重启下拉加载事件
      // 如果没有更多数据或页数等于3时，则终止下拉加载
      if (!res) return this.scroll.finishPullUp();
      if (res.data.length === 0) return (this.isSeeMore = true);
      for (let item of this.matchCates) {
        item.information_list.push(...res.data);
      }
      this.scroll.refresh();
      this.scroll.finishPullUp();
      console.log("滚动", this.matchCates);

      this.pageNum++;
    },
  },
  created() {
    this.fetchmatchCates();
  },
};
</script>

<style lang="scss" scoped>
::v-deep .card {
  padding-top: 0.25rem;
  padding-left: 0;
  padding-right: 0;
  height: 100%;
  .nav {
    overflow-x: auto;
    padding-left: 0;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    > .nav-item {
      margin-left: 0.4rem;
      margin-right: 0.4rem;
      white-space: nowrap;
    }
  }
}
.scroll {
  height: calc(100vh - 3.48rem);
  overflow: hidden;
  .logo-text {
    border: 1px solid #a2a2a2;
    border-radius: 50px;
    color: #a2a2a2;
    padding: 0.5% 2%;
    margin-left: 4%;
  }
}
</style>