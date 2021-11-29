<template>
  <div class="page-hero" v-if="model">
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
    <div>
        
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: null,
    };
  },
  created() {
    this.fetchHeroDetail();
  },
  methods: {
    async fetchHeroDetail() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.model = res.data;
      console.log(res)
    },
  },
};
</script>

<style lang="scss" scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>