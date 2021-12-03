<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
BScroll.use(Pullup);
export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    click: {
      type: Boolean,
      default: false,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    bounce: {
      type: Boolean,
      default: false,
    },
    scrollX: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.initBscroll();
  },
  methods: {
    initBscroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        pullUpLoad: this.pullUpLoad,
        bounce: this.bounce,
        eventPassthrough: this.scrollX ? "horizontal" : "",
        stopPropagation: true,
      });
      //监听滚动事件
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
        console.log('滚动')
      });
      //监听上拉加载事件
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
        console.log('上拉加载')
      });
    },
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll.refresh();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>