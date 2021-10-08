<template>
  <div class="admin-sys">
    <div id="content">
      <div class="container">
        <h3 class="title">SPIDERMOVIE电影系统管理后台</h3>
        <div id="login">
          <div id="login_content">
            <span>
              <input
                id="username"
                class="tip"
                name="username"
                type="text"
                v-model="username"
                placeholder="请输入你的用户名"
              />
              <label for="username">用户名</label>
            </span>
            <span>
              <input
                id="password"
                class="tip"
                name="password"
                type="password"
                v-model="password"
                placeholder="请输入你的密码"
              />
              <label for="password">密码</label>
            </span>

            <span>
              <input
                id="verifyImg"
                v-model="verifyImg"
                class="tip"
                placeholder="请输入你的验证码"
                name="verifyImg"
              />
              <label for="verifyImg">验证码</label>
            </span>

            <img
              src="/api2/users/verifyImg"
              alt
              @click="handleToVerifyImg"
              ref="verImg"
              class="verifyImg"
            />
          </div>

          <button id="login_btn" type="submit" @click="handleToLogin">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLogin",
  data() {
    return {
      username: "",
      password: "",
      verifyImg: "",
    };
  },
  methods: {
    // 登录
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
          if (
            status === 0 &&
            this.username === "ckx9" &&
            this.password === "123"
          ) {
            this.$alert("登陆成功", "登录状态", {
              confirmButtonText: "确定",
              callback: () => {
                this.$router.push("/admin"); //登陆成功后跳转到个人中心
              },
            });
          } else {
            this.$alert("登录失败", "登录状态", {
              confirmButtonText: "确定",
              callback: () => {
                this.$refs.verImg.src =
                  "/api2/users/verifyImg?" + Math.random(); //登录失败则更新图形验证码
                this.username = "";
                this.password = "";
                this.verifyImg = "";
              },
            });
          }
        });
    },

    // 验证码切换
    handleToVerifyImg(e) {
      e.target.src = "/api2/users/verifyImg?" + Math.random(); //加个随机数能清除掉图形验证码的缓存
    },
  },
};
</script>

<style scoped>
.admin-sys {
  width: 100%;
  height: 500px;
  background: linear-gradient(skyblue, white);
}

.title {
  width: 100%;
  text-align: center;
  position: relative;
  top: 50px;
  font-size: 30px;
}

input {
  padding: 10px 15px;
  outline: 0;
  border: 0;
  border-radius: 3px;
  width: 200px;
}

#content {
  width: 100%;
}
.container {
  width: 960px;
  margin: 0 auto;
  text-align: center;
}

/*登录*/
#login {
  width: 400px;
  height: 400px;
  position: absolute;
  top: 55%;
  left: 50%;
  margin-top: -200px;
  margin-left: -200px;
  background: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
}

#login_content {
  height: 200px;
  padding: 30px 20px;
}
input {
  width: 300px;
  padding: 14px 15px;
  background: #f0f0f0;
  font: normal 16px/1.5 Helvetica, "Microsoft Yahei", Arial, sans-serif;
  color: #444;
}
span {
  position: relative;
  display: inline-block;
  height: 50px;
  margin-bottom: 30px;
}
.tip {
  text-indent: 80px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.tip:focus,
.tip:active {
  text-indent: 0;
}
.tip + label {
  position: absolute;
  top: 16px;
  left: 15px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.tip:focus + label,
.tip:active + label {
  -webkit-transform: translateY(-40px);
  -moz-transform: translateY(-40px);
  transform: translateY(-40px);
}
.icon-user,
.icon-lock {
  position: absolute;
  top: 16px;
  right: 14px;
  color: #999;
}
.tooltip {
  width: 200px;
  padding: 14px;
  position: absolute;
  left: 20%;
  top: 0;
  right: 0;
  color: #999;
  background: white;
  text-align: left;
  z-index: -1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.tooltip:after {
  width: 0;
  height: 0;
  content: "";
  position: absolute;
  right: 100%;
  top: 18px;
  color: #87cefa;
  border: 8px solid;
  border-right-color: white;
}

/*登录按钮 */
#login_btn {
  width: 100%;
  height: 60px;
  line-height: 60px;
  outline: 0;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 20px;
  background: skyblue;
  border-radius: 0 0 10px 10px;
  cursor: pointer;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  position: absolute;
  bottom: 5px;
  left: 0;
  transition: all 0.2s;
}

#login_btn:hover {
  background: mediumblue;
  bottom: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

/*验证码图片 */
.verifyImg {
  position: absolute;
  bottom: 87px;
  left: 52px;
}
</style>