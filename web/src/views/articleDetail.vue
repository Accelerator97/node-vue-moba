<template>
  <div class="page-articles" v-if="model">
    <div class="d-flex py-3 px-2 ai-center border-bottom">
      <div class="iconfont icon-back text-blue" @click="goback"></div>
      <strong class="flex-1 pl-3 text-blue">
        {{ model.title }}
      </strong>
      <div class="text-grey fs-sm">{{ beautify(model.updateTime) }}</div>
    </div>
    <div v-html="model.body" class="py-2 articles-body border-bottom"></div>
    <div class="mt-2">
      <div class=" d-flex ai-center">
        <i class="iconfont icon-menu pr-2"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div>
        <router-link
          class="nav-link"
          v-slot="{ navigate }"
          v-for="item in model.related"
          :key="item._id"
          :to="`/articles/${item._id}`"
        >
          <div @click="navigate" @keypress.enter="navigate" role="link" class="py-1">
            {{ item.title }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    id: {
      required: true,
    },
  },
  data() {
    return {
      model: null,
    };
  },
  watch: {
    id(){
        this.fetchDetail()
    }
  },
  created() {
    this.fetchDetail();
  },
  methods: {
    async fetchDetail() {
      const res = await this.$http.get(`/artilces/${this.id}`);
      this.model = res.data;
    },
    beautify(date) {
      return dayjs(date).format("YYYY/MM/DD");
    },
    goback() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
.page-articles {
  .icon-back {
    font-size: 1.6923rem;
  }
  .articles-body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>