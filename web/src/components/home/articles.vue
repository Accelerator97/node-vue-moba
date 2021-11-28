<template>
  <div>
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
import ListCard from "../listCard.vue";
import dayjs from "dayjs";
export default {
  components: { ListCard },
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
      this.newsCats = res.data;
    },
    beautify(date) {
      return dayjs(date).format("MM/DD");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>