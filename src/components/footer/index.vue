<template>
  <footer id="footer">
    <ul>
      <!--tag='li' 渲染时渲染成li标签-->
      <router-link tag="li" to="/movie" class="bar">
        <i class="iconfont icon-dianying"></i>
        <p>电影</p>
      </router-link>
      <router-link tag="li" to="/cinema" class="bar">
        <i class="iconfont icon-yingyuan"></i>
        <p>影院</p>
      </router-link>
      <router-link tag="li" to="/mine" class="bar">
        <i class="iconfont icon-wode"></i>
        <p>我的</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "footer",
};
</script>

<style scoped>
#footer {
  width: 100%;
  height: 48px;
  background: #fff;
  border-top: 2px;
  position: fixed;
  left: 0;
  bottom: 0;
  padding-top: 2px;
}

#footer ul {
  display: flex;
  text-align: center;
  height: 50px;
  align-items: center;
}

#footer ul .bar {
  flex: 1;
  height: 40px;
}

#footer ul .bar.router-link-active {
  color: #946ddd;
}

#footer ul i {
  font-size: 20px;
}

#footer ul p {
  font-size: 12px;
  line-height: 18px;
}
</style>
