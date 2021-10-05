<template>
  <header id="header">
    <slot></slot>
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: "header",
  props: {
    title: {
      type: String,
      default: "蜘蛛电影",
    },
  },
};
</script>

<style scoped>
#header {
  width: 100%;
  height: 50px;
  color: #fff;
  background: #946ddd;
  border-bottom: 1px solid #946ddd;
  position: relative;
}

#header h1 {
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  font-weight: normal;
}
</style>
