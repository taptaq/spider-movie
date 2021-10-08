<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h2>蜘蛛电影管理后台</h2>
        <!--欢迎用户：
        <span>{{ $store.state.user.name }}</span>
        -->
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1" class="el-menu-vertical-demo">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <router-link to="/admin/user" slot="title" tag="span">用户管理</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <router-link to="/admin/movie" slot="title" tag="span">电影管理</router-link>
            </el-menu-item>
            <!--
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <router-link to="/admin/cinema" slot="title" tag="span">影院管理</router-link>
            </el-menu-item>
            -->
            <el-menu-item index="3">
              <i class="el-icon-s-marketing"></i>
              <router-link to="/admin/hotData" slot="title" tag="span">数据分析</router-link>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 渲染用户，电影，影院管理界面 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "admin",
  // 进入此路由前
  beforeRouteEnter(to, from, next) {
    let that = this;
    axios.get("/api2/admin").then((res) => {
      var status = res.data.status;
      if (status === 0) {
        //若为管理员则可进入管理页面
        next();
      } else {
        next("/mine/login"); //反之跳转到登录页面
      }
    });
  },
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  padding-left: 20px;
  line-height: 60px;
  font-size: 18px;
  font-weight: 600;
}

.el-header h2 {
  font-size: 22px;
  font-weight: 700;
  display: inline-block;
  margin-right: 10px;
}

.el-header span {
  color: rgb(211, 30, 30);
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
