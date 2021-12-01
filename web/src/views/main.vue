<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-2 pb-2">
      <div class="nav nav-inverse jc-around ai-center">
        <div
          class="nav-item"
          :class="{ 'active': active=== index }"
          v-for="(item, index) in navPaths"
          :key="index"
          @click="active = index"
        >
          <router-link
            class="nav-link text-white"
            v-slot="{ navigate }"
            :to="item.path"
          >
            <div @click="navigate" @keypress.enter="navigate" role="link">
              {{ item.name }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      navPaths: [
        { path: "/home", name: "首页" },
        { path: "/strategycenter", name: "攻略中心" },
        { path: "/matchcenter", name: "赛事中心" },
      ],
    };
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
