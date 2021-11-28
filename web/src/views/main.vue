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
        <div class="nav-item active">
          <router-link class="nav-link text-white" v-slot="{ navigate }" to="/home">
            <div @click="navigate" @keypress.enter="navigate" role="link">
              首页
            </div>
          </router-link>
        </div>
        <div class="nav-item ">
          <router-link class="nav-link text-white" v-slot="{ navigate }" to="/strategycenter">
            <div @click="navigate" @keypress.enter="navigate" role="link">
              攻略中心
            </div>
          </router-link>
        </div>
        <div class="nav-item ">
          <router-link class="nav-link text-white" v-slot="{ navigate }" to="/matchcenter">
            <div @click="navigate" @keypress.enter="navigate" role="link">
              赛事中心
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
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.topbar{
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
