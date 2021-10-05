<template>
  <div class="center_body">
    <p class="center">个人中心</p>
    <p>当前用户：{{ $store.state.user.name }}</p>
    <p v-if="$store.state.user.isAdmin">
      用户身份：管理员
      <router-link to="/admin" tag="button" target="_blank">进入管理后台</router-link>
    </p>
    <p v-else>用户身份：平民</p>
    <div class="upLoad">
      <input type="file" name="file" @change="handleToUpload" class="file" />
      <p>当前头像：</p>
      <img class="userHead" :src="$store.state.user.userHead" alt="" />
    </div>

    <button @touchstart="handleToLogout" class="logout">退出</button>
  </div>
</template>

<script>
import axios from "axios";
import { messageBox } from "@/components/JS";
export default {
  name: "center",
  methods: {
    handleToLogout() {
      this.$axios.get("/api2/users/logout").then((res) => {
        var status = res.data.status;
        if (status === 0) {
          localStorage.removeItem("username");
          localStorage.removeItem("isAdmin");
          this.$store.commit("user/USER_NAME", {
            name: "",
            isAdmin: false,
            userHead: "",
          });
          //退出成功则跳转到登录页面
          this.$router.push("/mine/login");
        }
      });
    },

    handleToUpload(e) {
      var file = e.target.files[0];
      var param = new FormData();
      param.append("file", file, file.name);
      var config = {
        "Content-Type": "multipart/form-data",
      };

      this.$axios.post("/api2/users/uploadUserHead", param, config).then((res) => {
        var status = res.data.status;
        var that = this;
        if (status === 0) {
          messageBox({
            title: "信息",
            content: "上传头像成功",
            ok: "确定",
            handleOk() {
              that.$store.commit("user/USER_NAME", {
                name: that.$store.state.user.name,
                isAdmin: that.$store.state.user.isAdmin,
                userHead: res.data.data.userHead + "?" + Math.random(), //清除缓存
              });
            },
          });
        } else {
          messageBox({
            title: "信息",
            content: "上传头像失败",
            ok: "确定",
          });
        }
      });
    },
  },

  // 进入此路由前
  beforeRouteEnter(to, from, next) {
    axios.get("/api2/users/getUser").then((res) => {
      var status = res.data.status;
      if (status === 0) {
        //登陆的用户可以进行下一步进去此组件并保存用户名到当前的用户状态
        next((vm) => {
          localStorage.setItem("username", res.data.data.username);
          localStorage.setItem("isAdmin", res.data.data.isAdmin);
          vm.$store.commit("user/USER_NAME", {
            name: res.data.data.username,
            isAdmin: res.data.data.isAdmin,
            userHead: res.data.data.userHead,
          });
        });
      } else {
        next("/mine/login"); //反之跳转到登录页面
      }
    });
  },
};
</script>

<style scoped>
.center_body {
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.center {
  font-weight: 1000;
  font-size: 25px;
  margin-bottom: 10px;
}

.center_body p a {
  background: #946ddd;
  margin-left: 5px;
  color: #fff;
  padding: 3px 5px;
  border-radius: 5px;
  font-size: 15px;
}

.userHead {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #000;
  margin-left: 74px;
  margin-bottom: 45px;
}

.upLoad {
  margin-top: 50px;
}

.file {
  background: #946ddd;
  border-radius: 5px;
  color: #fff;
  padding: 5px;
}

.logout {
  background: #946ddd;
  border: none;
  outline: none;
  box-shadow: 0 0 10px #000;
  width: 80px;
  height: 40px;
  padding: 5px;
  line-height: 20px;
  font-size: 20px;
  color: #fff;
}
</style>
