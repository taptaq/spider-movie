<template>
  <div class="findpassword_body">
    <div class="email">
      邮箱：
      <input v-model="email" class="findpassword_text" type="text" />
      <button class="sendverify" :disabled="disabled" @touchstart="handleToVerify">{{ verifyInfo }}</button>
    </div>
    <div>
      新密码：
      <input v-model="password" class="findpassword_text" type="password" />
    </div>
    <div>
      验证码：
      <input v-model="verify" class="findpassword_text" type="text" />
    </div>
    <div class="findpassword_btn">
      <button @touchstart="handleToPassword">确认修改</button>
    </div>
    <div class="findpassword_link">
      <router-link to="/mine/login">立即登录</router-link>
      <router-link to="/mine/findpassword">立即注册</router-link>
    </div>
  </div>
</template>

<script>
import { messageBox } from "@/components/JS";
export default {
  name: "findPassword",
  data() {
    return {
      email: "",
      password: "",
      verify: "",
      verifyInfo: "发送验证码",
      disabled: false,
    };
  },
  methods: {
    handleToVerify() {
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
    handleToPassword() {
      this.$axios
        .post("/api2/users/findPassword", {
          email: this.email,
          password: this.password,
          verify: this.verify,
        })
        .then((res) => {
          var status = res.data.status;
          var that = this;
          if (status === 0) {
            messageBox({
              title: "修改密码",
              content: "修改成功",
              ok: "确定",
              handleOk() {
                that.$router.push("/mine/login");
              },
            });
          } else {
            messageBox({
              title: "修改密码",
              content: "修改失败",
              ok: "确定",
            });
          }
        });
    },

    countDown() {
      var count = 60;
      this.disabled = true;
      var timer = setInterval(() => {
        count--;
        this.verifyInfo = `剩余${count}秒`;
        if (count === 0) {
          count = 60;
          clearInterval(timer);
          this.verifyInfo = "发送验证码";
          this.disabled = false;
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
.findpassword_body {
  margin-top: 20px;
  width: 100%;
  font-size: 18px;
}

.findpassword_body div {
  margin-bottom: 15px;
  padding-left: 5px;
}

.findpassword_body .findpassword_text {
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
  background: #946ddd;
  border-radius: 3px;
  border: none;
  display: block;
  color: #fff;
}

.findpassword_body .findpassword_btn {
  height: 45px;
  margin: 10px;
}

.findpassword_body .findpassword_btn button {
  width: 100%;
  height: 100%;
  background: #946ddd;
  border-radius: 3px;
  border: none;
  display: block;
  color: #fff;
  font-size: 18px;
}

.findpassword_body .findpassword_link {
  display: flex;
  justify-content: space-between;
}

.findpassword_body .findpassword_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #946ddd;
  font-size: 16px;
}
</style>
