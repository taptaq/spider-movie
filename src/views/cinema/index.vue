<template>
  <div id="main">
    <Header title="蜘蛛影院"></Header>
    <div>
      <div class="cinema_menu">
        <!--tag='div' 渲染时渲染成div标签-->
        <router-link tag="div" to="/movie/city" class="city_name">
          <span>全城</span>
          <i class="iconfont icon-xiajiantou"></i>
        </router-link>
        <router-link tag="div" to="/movie/city" class="city_name">
          <span>品牌</span>
          <i class="iconfont icon-xiajiantou"></i>
        </router-link>
        <router-link tag="div" to="/movie/city" class="city_name">
          <span>特色</span>
          <i class="iconfont icon-xiajiantou"></i>
        </router-link>
      </div>
      <!-- 影院展示页面 -->
      <keep-alive>
        <cinemalist />
      </keep-alive>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
import cinemalist from "@/components/cinemalist";
export default {
  name: "cinema",
  components: {
    Header,
    Footer,
    cinemalist,
  },
};
</script>

<style scoped>
.cinema_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  flex: 1;
  display: flex;
  justify-content: space-around;
}

.cinema_menu .city_name {
  margin-left: 10px;
  height: 100%;
  line-height: 45px;
  font-size: 16px;
}

.cinema_menu .city_name i {
  margin-left: 5px;
}

.movie_menu .city_name.router-link-active {
  color: #ef4238;
}
</style>
