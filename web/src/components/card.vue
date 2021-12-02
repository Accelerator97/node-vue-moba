<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header d-flex ai-center pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <strong class="fs-xl flex-1 px-2">{{ title }}</strong>
      <i class="iconfont icon-more" v-if="!plain"></i>
    </div>
    <div class="card-body pt-3 pb-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    plain:{
      type:Boolean,
      defaults:false
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/_variables.scss';
.card{
    .card-header{
        border-bottom: 1px solid $border-color;
    }
}
</style>