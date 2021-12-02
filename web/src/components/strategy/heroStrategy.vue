<template>
  <div>
    <Card icon="heroMenu" title="英雄攻略" plain>
      <div class="d-flex jc-around">
        <!-- 头像 -->
        <div
          v-for="(hero, index) in targetHeroList"
          :key="hero._id"
          style="width: 10%"
          @click="
            fetchHeroStrategies(hero._id);
            active = index;
          "
          :class="{ active: active === index }"
          class="icon-border"
        >
          <img :src="hero.avatar" class="w-100 h-100" />
        </div>
        <!-- 展示更多英雄 -->
        <div
          @click="showMoreHeores"
          class="d-flex ai-center jc-center bg-white-3"
          style="width: 10%; border: 1px solid #ddd"
        >
          {{ isMoreHeroes ? "收起" : "展开" }}
        </div>
      </div>
      <!-- 单个英雄攻略信息 -->
      <div v-if="heroStrategies" class="border-bottom heroStrategies-wrapper">
        <!-- 胜率登场 -->
        <div class="d-flex mt-3 bg-white-3">
          <div class="flex-1 d-flex">
            <div>登场排名:{{ heroStrategies.appearance_rank }}</div>
            <div class="ml-2">胜率排名:{{ heroStrategies.win_rate_rank }}</div>
          </div>
          <router-link
            v-slot="{ navigate }"
            :to="`/heroes/${heroStrategies._id}`"
            class="ml-1"
          >
            <div @click="navigate" @keypress.enter="navigate" role="link">
              查看英雄详细信息
            </div>
          </router-link>
        </div>
        <!-- 英雄视频攻略 -->
        <div class="d-flex jc-between mt-3 pb-2 border-bottom" v-if="heroStrategies.videos">
          <div
            v-for="item in heroStrategies.videos"
            :key="item._id"
            style="width:48%"
          >
            <img :src="item.img" class="w-100" style="height: 8.0769rem" />
            <div class="video-title">{{ item.title }}</div>
            <div class="d-flex mt-2">
              <i class="iconfont icon-shipin mr-2"></i>
              <div>{{ item.play_volume }}</div>
            </div>
          </div>
        </div>
        <!-- 英雄图文攻略 -->
        <div class="mt-3 border-bottom pb-2" v-if="heroStrategies.graphics">
          <div
            class="d-flex"
            v-for="item in heroStrategies.graphics"
            :key="item._id"
          >
            <a :href="item.url">
              <img :src="item.img" style="height: 8.0769rem" />
            </a>
            <div class="text-ellipse">
              <div class="pt-1">
                <a :href="item.url">
                  <strong class="fs-lg ml-2 text-black">{{
                    item.title
                  }}</strong>
                </a>
              </div>
              <div class="fs-md ml-2 mt-3 text-grey">
                {{ item.title }}
              </div>
              <div class="fs-md ml-2 mt-3 text-grey">
                {{ beautify(item.updatedAt) }}
              </div>
            </div>
          </div>
        </div>
        <!-- 下拉英雄列表 -->
        <div
          class="hero-dropdown d-flex clearfix"
          v-show="isMoreHeroes"
          v-if="heroList"
        >
          <!-- 英雄头像/名称 -->
          <div class="flex-1" style="overflow-y: auto">
            <ul class="m-0 p-0 d-flex jc-between flex-wrap herolist">
              <li
                v-for="item in selectedCategory.heroesList"
                :key="item._id"
                style="width: 24%"
                @click="showSingleHeroStragies(item)"
              >
                <img :src="item.avatar" class="w-100" />
                <div class="text-center fs-xs">{{ item.name }}</div>
              </li>
            </ul>
          </div>
          <!-- 英雄分类 -->
          <div class="hero-categories ml-2 text-center" style="width: 20%">
            <ul class="m-0 p-0">
              <li
                v-for="(item, index) in heroList"
                :key="item._id"
                @click="
                  selectedCategoryIndex = index;
                  selectCategory(item);
                "
                :class="{ selected: selectedCategoryIndex === index }"
                style="height: 40px; line-height: 40px"
              >
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mt-3 text-center">
        加载更多<span class="text-primary" v-if="heroStrategies"
          >"{{ heroStrategies.name }}"</span
        >攻略内容
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../card.vue";
import dayjs from "dayjs";
export default {
  components: { Card },
  data() {
    return {
      targetHeroList: [],
      heroList: [],
      isMoreHeroes: false,
      heroStrategies: null,
      active: 0,
      selectedCategoryIndex: 0,
      selectedCategory: [],
    };
  },
  methods: {
    async fetchTargetHeroList() {
      const res = await this.$http.get("/strategy/targetheroes");
      this.targetHeroList = res.data;
      this.fetchHeroStrategies(this.targetHeroList[0]._id);
    },
    showMoreHeores() {
      this.isMoreHeroes = !this.isMoreHeroes;
    },
    async fetchHeroStrategies(id) {
      const res = await this.$http.get(`/strategy/hero_strategies/${id}`);
      this.heroStrategies = res.data;
    },
    async fetchAllhero() {
      const res = await this.$http.get("/heroes/list");
      this.heroList = res.data;
      this.selectedCategory = res.data[0];
    },
    beautify(date) {
      return dayjs(date).format("YYYY-MM-DD ");
    },
    selectCategory(item) {
      this.selectedCategory = item;
    },
    async showSingleHeroStragies(hero) {
      this.isMoreHeroes = false
      const res = await this.$http.get(`/strategy/hero_strategies/${hero._id}`);
      this.heroStrategies = res.data;
      this.targetHeroList[this.targetHeroList.length - 1] = res.data
      this.active = this.targetHeroList.length - 1
    },
  },
  created() {
    this.fetchTargetHeroList();
    this.fetchAllhero();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_variables.scss";
.icon-border {
  border: 3px solid map-get($colors, "white");
  &.active {
    border: 3px solid map-get($colors, "primary");
    border-radius: 5%;
  }
}
.heroStrategies-wrapper {
  position: relative;
  > .hero-dropdown {
    position: absolute;
    display: flex;
    z-index: 99;
    top: 2.3rem;
    width: 102%;
    left: -1%;
    height: 22.3846rem;
    background-color: #fff;
    border: 0.04rem solid #e5e5e5;
    .hero-categories {
      li {
        cursor: pointer;
        &.selected {
          color: map-get($colors, "white");
          background: map-get($colors, "primary");
        }
      }
    }
    .herolist {
      overflow-y: auto;
      > li {
        /* 如果最后一行是3个元素 */
        &:last-child:nth-child(4n - 1) {
          margin-right: calc(24% + 4% / 3);
        }
        /* 如果最后一行是2个元素 */
        &:last-child:nth-child(4n - 2) {
          margin-right: calc(48% + 8% / 3);
        }
      }
    }
  }
}
</style>