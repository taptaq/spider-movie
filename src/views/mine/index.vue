<template>
  <div id="main">
    <Header title="我的蜘蛛"></Header>
    <div id="content">
      <!--渲染登录，注册，找回密码，个人中心页面 -->
      <router-view />
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";

export default {
  name: "mine",
  components: {
    Header,
    Footer,
  },
};
</script>

<style></style>
