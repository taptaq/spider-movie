<template>
  <div class="register_body">
    <div class="email">
      邮箱：<input v-model="email" class="register_text" type="text" />
      <button class="sendverify" :disabled="disabled" @touchstart="handleToVerify">
        {{ verifyInfo }}
      </button>
    </div>
    <div>用户名：<input v-model="username" class="register_text" type="text" /></div>
    <div>密码：<input v-model="password" class="register_text" type="password" /></div>
    <div>确认密码：<input class="register_text" type="password" /></div>
    <div>验证码：<input v-model="verify" class="register_text" type="text" /></div>
    <div class="register_btn"><button @touchstart="handleToRegister">注 册</button></div>
    <div class="register_link">
      <router-link to="/mine/login">立即登录</router-link>
      <router-link to="/mine/findpassword">修改密码</router-link>
    </div>
  </div>
</template>

<script>
import { messageBox } from "@/components/JS";
export default {
  name: "register",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      verify: "",
      verifyInfo: "发送验证码",
      disabled: false,
    };
  },
  methods: {
    handleToVerify() {
      if (this.disabled) {
        return;
      }
      this.$axios.get("/api2/users/verify?email=" + this.email).then((res) => {
        var status = res.data.status;
        var that = this;
        if (status === 0) {
          messageBox({
            title: "验证码",
            content: "验证码已发送",
            ok: "确定",
            handleOk() {
              that.countDown();
            },
          });
        } else {
          messageBox({
            title: "验证码",
            content: "验证码发送失败",
            ok: "确定",
          });
        }
      });
    },
    handleToRegister() {
      this.$axios
        .post("/api2/users/register", {
          email: this.email,
          username: this.username,
          password: this.password,
          verify: this.verify,
        })
        .then((res) => {
          var status = res.data.status;
          var that = this;
          if (status === 0) {
            messageBox({
              title: "注册",
              content: "注册成功",
              ok: "确定",
              handleOk() {
                that.$router.push("/mine/login"); //注册成功则跳转到登录页面
              },
            });
          } else {
            messageBox({
              title: "验证码",
              content: res.data.msg + "，请重新注册",
              ok: "确定",
            });
          }
        });
    },

    countDown() {
      this.disabled = true;
      var count = 60;
      var timer = setInterval(() => {
        count--;
        this.verifyInfo = `剩余${count}秒`;
        if (count === 0) {
          this.disabled = false;
          count = 60;
          this.verifyInfo = "发送验证码";
          clearInterval(timer);
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
.register_body {
  margin-top: 20px;
  width: 100%;
  font-size: 18px;
}

.register_body div {
  margin-bottom: 15px;
  padding-left: 5px;
}

.register_body .register_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
  outline: none;
  padding: 0 5px;
  font-size: 18px;
}

.email {
  position: relative;
}

.sendverify {
  position: absolute;
  right: 7px;
  top: 27px;
  padding: 5px;
}

.register_body .register_btn {
  height: 45px;
  margin: 10px;
}

.register_body .register_btn button {
  width: 100%;
  height: 100%;
  background: #946ddd;
  border-radius: 3px;
  border: none;
  display: block;
  color: #fff;
  font-size: 18px;
}

.register_body .register_link {
  display: flex;
  justify-content: space-between;
}

.register_body .register_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #946ddd;
  font-size: 16px;
}
</style>
