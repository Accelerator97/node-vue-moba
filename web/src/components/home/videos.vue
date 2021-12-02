<template>
  <div>
    <ListCard icon="shipin" title="精彩视频" :categories="videoCats">
      <template #items="{ category }">
        <div class="d-flex flex-wrap border-bottom" style="margin: 0 -0.5rem">
          <div
            v-for="video in category.videoList"
            :key="video._id"
            class="p-2"
            style="width: 50%; height: 13.3846rem; max-height: 13.3846rem"
          >
            <div>
              <a :href="video.url">
                <img :src="video.img" class="w-100" style="height: 7.9rem" />
                <div class="text-left video-title" style="height: 2.3992rem">
                  {{ video.title }}
                </div>
              </a>
              <div class="d-flex jc-between mt-2">
                <div>
                  <i class="iconfont icon-shipin"></i>
                  <span class="pl-1">{{ video.play_volume }}</span>
                </div>
                <div>{{ beautify(video.updatedAt) }}</div>
              </div>
            </div>
          </div>
        </div>
        <router-link v-slot="{ navigate }" to="/strategycenter">
          <div
            @click="navigate"
            @keypress.enter="navigate"
            role="link"
            class="mt-3 text-center"
          >
            加载更多内容
          </div>
        </router-link>
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
      videoCats: [],
    };
  },
  created() {
    this.fetchVideoCats();
  },
  methods: {
    async fetchVideoCats() {
      const res = await this.$http.get("/strategy/list");
      this.videoCats = res.data;
    },
    beautify(date) {
      return dayjs(date).format("MM-DD");
    },
    toHref(url) {
      window.open(url);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>