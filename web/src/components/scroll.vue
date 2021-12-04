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
import ObserveDOM from '@better-scroll/observe-dom'
import ObserveImage from "@better-scroll/observe-image";
BScroll.use(ObserveImage);
BScroll.use(Pullup);
BScroll.use(ObserveDOM)
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
    scrollY: {
      type: Boolean,
      default: false,
    },
    observeImage: {
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
    setTimeout(() => {
      this.initBscroll();
    }, 2000);
  },
  methods: {
    initBscroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        scrollY: this.scrollY,
        click: this.click,
        pullUpLoad: this.pullUpLoad,
        bounce: this.bounce,
        eventPassthrough: this.scrollX ? "horizontal" : "",
        stopPropagation: true,
        observeDOM: true,
        observeImage: this.observeImage,
      });
      //监听滚动事件
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
      //监听上拉加载事件
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
      this.scroll.on("beforeScrollStart", () => {
        this.scroll.refresh();
      });
    },
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  overflow: hidden;
}
</style>