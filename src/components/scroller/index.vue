<template>
  <div class="wrapper" ref="wrapper">
    <!--插槽-->
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll"; //引入better-scroll插件
export default {
  name: "scroller",
  props: {
    handleToScroll: {
      type: Function,
      default: function () {},
    },
    handleToTouchEnd: {
      type: Function,
      default: function () {},
    },
  },
  mounted() {
    this.$nextTick(() => {
      //$nextTick确保内容都加载完才进行下一步
      this.scroll = new BScroll(this.$refs.wrapper, {
        //新建一个better-scroll实例
        click: true,
        probeType: 1, //触发scroll事件，会截流
      });
      this.scroll.on("scroll", (pos) => {
        //绑定scroll事件
        this.handleToScroll(pos);
      });

      this.scroll.on("touchEnd", (pos) => {
        //绑定touchend事件(滑动结束会触发)
        this.handleToTouchEnd(pos);
      });
    });
  },
  updated() {
    // 当数据更新时重新计算滑动值
    this.scroll.refresh();
  },
  methods: {
    toScrollTop(y) {
      this.scroll.scrollTo(0, y);
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>
