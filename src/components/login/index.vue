<template>
  <div class="login_body">
    <div>
      <input v-model="username" type="text" class="login_text" placeholder="账户名/手机号/email" />
    </div>

    <div>
      <input v-model="password" type="password" class="login_text" placeholder="密码" />
    </div>

    <div>
      <input v-model="verifyImg" class="login_text" placeholder="请输入你的验证码" />
      <img src="/api2/users/verifyImg" alt @touchstart="handleToVerifyImg" ref="verImg" />
    </div>

    <div class="login_btn">
      <input type="submit" value="登 录" @touchstart="handleToLogin" />
    </div>

    <div class="login_link">
      <router-link to="/mine/register">立即注册</router-link>
      <router-link to="/mine/findpassword">修改密码</router-link>
    </div>
  </div>
</template>

<script>
import { messageBox } from "@/components/JS";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      verifyImg: "",
    };
  },
  methods: {
    handleToLogin() {
      this.$axios
        .post("/api2/users/login", {
          username: this.username,
          password: this.password,
          verifyImg: this.verifyImg,
        })
        .then((res) => {
          var that = this;
          var status = res.data.status;
          if (status === 0) {
            //登陆成功
            messageBox({
              title: "登录",
              content: "登陆成功",
              ok: "确定",
              handleOk() {
                that.$router.push("/mine/center"); //登陆成功后跳转到个人中心
              },
            });

            this.$store.commit("user/changeLoginStatus", {
              isLogin: true,
            });
            localStorage.setItem("isLogin", true);
          } else {
            messageBox({
              title: "登录",
              content: res.data.msg,
              ok: "确定",
              handleOk() {
                that.$refs.verImg.src =
                  "/api2/users/verifyImg?" + Math.random(); //登录失败则更新图形验证码
              },
            });

            this.$store.commit("user/changeLoginStatus", {
              isLogin: false,
            });
            localStorage.setItem("isLogin", false);
          }
        });
    },

    handleToVerifyImg(e) {
      e.target.src = "/api2/users/verifyImg?" + Math.random(); //加个随机数能清除掉图形验证码的缓存
    },
  },
};
</script>

<style scoped>
.login_body {
  margin-top: 20px;
  width: 100%;
}

.login_body div {
  margin-bottom: 23px;
}

.login_body .login_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
  outline: none;
  padding: 0 5px;
  font-size: 18px;
}

.login_body .login_btn {
  height: 45px;
  margin: 10px;
}

.login_body .login_btn input {
  width: 100%;
  height: 100%;
  background: #946ddd;
  border-radius: 3px;
  border: none;
  display: block;
  color: #fff;
  font-size: 18px;
}

.login_body .login_link {
  display: flex;
  justify-content: space-between;
}

.login_body .login_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #946ddd;
  font-size: 16px;
}
</style>
