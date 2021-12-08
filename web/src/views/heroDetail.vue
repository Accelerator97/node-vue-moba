<template>
  <div class="page-hero" v-if="model">
    <!-- 导航栏 -->
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 flex-1">
        <span>王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link to="/" v-slot="{ navigate }">
        <div @click="navigate" @keypress.enter="navigate" role="link">
          更多英雄 &gt;
        </div>
      </router-link>
    </div>
    <!-- 背景图Banner -->
    <div class="top" :style="{ 'background-image': `url(${model.banner})` }">
      <div class="info text-white p-3 d-flex flex-column h-100 jc-end">
        <div>{{ model.title }}</div>
        <h2 class="my-2">{{ model.name }}</h2>
        <div>{{ model.categories.map((v) => v.name).join("/") }}</div>
        <div class="d-flex jc-between">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{ model.scores.difficult }}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{ model.scores.skills }}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{ model.scores.attack }}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{ model.scores.survive }}</span>
          </div>
          <router-link v-slot="{ navigate }" to="/">
            <span
              @click="navigate"
              @keypress.enter="navigate"
              role="link"
              class="text-grey"
            >
              皮肤:2 &gt;
            </span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- swiper -->
    <div>
      <div class="bg-white px-3">
        <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom">
              <div class="d-flex">
                <router-link v-slot="{ navigate }" to="/" class="flex-1">
                  <button
                    class="btn btn-lg mx-2 w-100"
                    @click="navigate"
                    @keypress.enter="navigate"
                    role="link"
                  >
                    <i class="iconfont icon-heroMenu"></i>
                    英雄介绍视频
                  </button>
                </router-link>
                <router-link v-slot="{ navigate }" to="/" class="flex-1">
                  <button
                    class="btn btn-lg mx-2 w-100"
                    @click="navigate"
                    @keypress.enter="navigate"
                    role="link"
                  >
                    <i class="iconfont icon-heroMenu"></i>
                    一图识英雄
                  </button>
                </router-link>
              </div>
              <!-- skills -->
              <div class="skills bg-white mt-3">
                <div class="d-flex jc-around">
                  <img
                    class="icon"
                    :class="{ active: currentSkillIndex === i }"
                    @click="currentSkillIndex = i"
                    :src="item.icon"
                    v-for="(item, i) in model.skills"
                    :key="item.name"
                  />
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex pt-4 pb-3">
                    <h3 class="m-0">{{ currentSkill.name }}</h3>
                    <span class="text-grey ml-4">
                      (冷却值:{{ currentSkill.delay }} 消耗:{{
                        currentSkill.cost
                      }})
                    </span>
                  </div>
                  <p>
                    {{ currentSkill.description }}
                  </p>
                  <div class="border-bottom"></div>
                </div>
              </div>
            </div>
            <Card plain icon="menu" title="出装推荐" class="heroes-items" showHeader>
              <div class="fs-xl">顺风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" class="icon" />
                  <div class="fs-xm">{{ item.name }}</div>
                </div>
              </div>
              <div class="border-bottom mt-3"></div>
              <div class="fs-xl mt-3">逆风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items2" :key="item.name">
                  <img :src="item.icon" class="icon" />
                  <div class="fs-xm">{{ item.name }}</div>
                </div>
              </div>
            </Card>
            <Card plain icon="menu" title="使用技巧" showHeader>
              <p class="m-0">{{ model.usageTips }}</p>
            </Card>
            <Card plain icon="menu" title="对抗技巧" showHeader>
              <p class="m-0">{{ model.battleTips }}</p>
            </Card>
            <Card plain icon="menu" title="团战思路" showHeader>
              <p class="m-0">{{ model.teamTips }}</p>
            </Card>
            <Card plain icon="menu" title="英雄关系"> 
                <div class="fs-xl">最佳搭档</div>
                <div v-for="item in model.partners" :key="item.name" class="d-flex pt-4">
                    <img :src="item.hero.avatar" height="50" >
                    <p class="flex-1 m-0 ml-3">{{item.description}}</p>
                </div>
                <div class="border-bottom mt-3"></div>
            </Card>
          </div>
        </swiper-slide>
      </swiper>
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
import Card from "../components/card.vue";
export default {
  components: { Card, Swiper, SwiperSlide },
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: null,
      currentSkillIndex: 0,
    };
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    },
  },
  created() {
    this.fetchHeroDetail();
  },
  methods: {
    async fetchHeroDetail() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.model = res.data;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/_variables.scss";
.page-hero {
  .topbar {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .top {
    //背景图是要给高度才能显示
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
    .info {
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
      .scores {
        .badge {
          margin: 0 0.25rem;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          line-height: 1rem;
          text-align: center;
          border-radius: 50%;
          font-size: 0.6rem;
          border: 1px solid rbga(255, 255, 255, 0.2);
        }
      }
    }
  }
  .skills {
    img.icon {
      width: 70px;
      height: 70px;
      border: 3px solid map-get($colors, "white");
      &.active {
        border: 3px solid map-get($colors, "primary");
        border-radius: 45%;
      }
    }
  }
  .heroes-items {
    img.icon {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>