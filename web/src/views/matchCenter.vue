<template>
  <van-tabs
    v-model:active="currentNavIndex"
    sticky
    animated
    swipeable
    @change="tabchange"
  >
    <van-tab v-for="cate in matchCates" :key="cate._id" :title="cate.name">
      <div class="mt-2">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="Loading"
            @load="pullingUp"
            offset="300"
            :finished="isFinished"
            :immediate-check="false"
            class="list"
          >
            <div class="race-content">
              <div class="d-flex mb-2 mt-1">
                <span class="text-blue fs-xxl" style="font-weight: bold"
                  >王者荣耀{{ cate.name }}</span
                >
                <span class="logo-text pb-2">官方举办</span>
              </div>
              <div>
                <img :src="cate.banner" class="w-100" />
              </div>
              <div
                class="w-100 bg-grey-2 mt-2 fs-lg text-center"
                style="color:#a2a2a2;height：28.5px;line-height:28.5px"
              >
                <span>赛事咨询</span>
              </div>

              <ul class="pl-0">
                <li
                  v-for="item in cate.information_list"
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
                  isFinished
                    ? "已显示全部内容"
                    : isLoading
                    ? "加载中..."
                    : "上拉加载更多"
                }}</span>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </van-tab>
  </van-tabs>
</template>

<script>
import dayjs from "dayjs";
export default {
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
      isFinished: false,
      isLoading: false,
      Loading: false,
      currentNavIndex: 0,
      isTabChange: false,
    };
  },
  methods: {
    //获取数据
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
    //下拉更新
    async pullingUp() {
      if (this.pageNum > 5) {
        this.isLoading = false;
        this.isFinished = true;
        return;
      }
      if (!this.isTabchange) {
        this.isLoading = true;
        const res = await this.$http.get("/race/information", {
          params: {
            id: this.matchCates[this.currentNavIndex]._id,
            pageNum: this.pageNum,
          },
        });
        // console.log("上拉加载请求回来的数据");
        // console.log(res.data);
        this.isLoading = false;
        // 如果拿到结果则让页数＋1，并重启下拉加载事件
        // 如果服务器出现错误，则重启下拉加载事件
        // 如果没有更多数据或页数等于5时，则终止下拉加载
        // if (res.data.length === 0 || this.pageNum > 5) return (this.isFinished = true);
        this.matchCates[this.currentNavIndex].information_list.push(
          ...res.data
        );
        // console.log("请求回来数据合并", this.matchCates);
        this.pageNum++;
      }
      this.isTabchange = false;
    },
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.pullingUp();
      this.isLoading = false; // 下拉加载完成，关闭，不然就会有两个显示加载中的转圈圈。list本身就有一个了
    },
    tabchange() {
      this.isTabchange = true;
      this.pageNum = 1;
      this.isFinished = false;
      this.isLoading = false;
      this.Loading = false;
    },
  },
  created() {
    this.fetchmatchCates();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/_variables.scss";
/deep/.van-tabs__wrap {
  touch-action: manipulation;
}
/deep/.van-tabs__line {
  background-color: map-get($colors, "primary");
}
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