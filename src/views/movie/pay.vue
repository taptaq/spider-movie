<template>
  <div class="payContainer slide-enter-active">
    <Header title="支付页面">
      <i class="iconfont icon-zuojiantou arrow_back" @touchstart="handleToBack"></i>
    </Header>
    <loading v-if="isLoading" />
    <div v-else>
      <scroller>
        <div class="contentDetail">
          <!--电影的标题，时长，封面，地区等-->
          <div class="detail_list">
            <div class="detail_list_content">
              <div class="detail_list_img">
                <img :src="$filters.setWH(detailInfo.moviePoster, '128.180')" alt />
              </div>
              <div class="detail_list_info">
                <h2>{{ detailInfo.movieName }}</h2>
                <p>{{$store.state.movie.sum/40}}张 &nbsp; 票价: {{$store.state.movie.sum}}元</p>
                <p>影院：SFC上影影城</p>
                <p>场次：今天 10月6 16:00</p>
                <p class="seat">
                  座位：
                  <span
                    v-for="(item,index) in JSON.parse($store.state.movie.curSelectSeats)"
                    :key="index"
                  >{{item.x}}排{{item.y}}座&nbsp;</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!--支付类型-->
        <div class="payType" ref="payType">
          <div :class="payType==='1'?'active':''" data-type="1">
            <img src="@/assets/wechat.png" alt data-type="1" /> 微信
          </div>

          <div :class="payType==='2'?'active':''" data-type="2">
            <img src="@/assets/alipay.png" alt data-type="2" /> 支付宝
          </div>

          <div :class="payType==='3'?'active':''" data-type="3">
            <img src="@/assets/bank.png" alt data-type="3" />银行卡
          </div>
        </div>

        <div class="wechatCode" v-if="wechatCode" @click="disappear">
          <p>微信支付</p>
          <img :src="wechatCode" alt />
        </div>

        <el-result icon="error" title="取消付款" v-if="disappearStatus">
          <template #extra>
            <el-button type="primary" size="medium" @click="confirm">确认</el-button>
          </template>
        </el-result>

        <!--支付按钮-->
        <div class="footer">
          <div class="sum">￥{{$store.state.movie.sum}}</div>
          <button @click="goPay">确认支付</button>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";

export default {
  name: "Pay",
  components: {
    Header,
  },
  data() {
    return {
      detailInfo: {},
      isLoading: true,
      payType: "1",
      wechatCode: "",
      disappearStatus: false,
    };
  },
  props: ["sum", "seats"],

  mounted() {
    this.$axios
      .get(
        `/api2/movies/getMovie?movieId=${this.$store.state.movie.curMovieId}`
      )
      .then((res) => {
        let detailMsg = res.data.data.detailMsg[0];
        let status = res.data.status;
        if (status === 0) {
          this.detailInfo = detailMsg;
          this.isLoading = false;
          this.$nextTick(() => {
            new Swiper(this.$refs.detail_player, {
              slidesPerView: "auto", //设置slider容器能够同时显示的slides数量为自动
              freeMode: true, //自由拖放
              freeModeSticky: true, //自由对齐
              direction: "horizontal", // 水平切换选项
            });

            this.$refs.payType.children.forEach((item) => {
              item.addEventListener("click", (e) => {
                // console.log(e.target.dataset.type);
                if (e.target.dataset.type === "1") {
                  this.payType = "1";
                } else if (e.target.dataset.type === "2") {
                  this.payType = "2";
                }
                if (e.target.dataset.type === "3") {
                  this.payType = "3";
                }
              });
            });
          });
        }
      });
  },

  methods: {
    handleToBack() {
      this.$router.back(); //返回前一页(前一级路由)
    },

    goPay() {
      // 传给后端的相关数据
      let data = {
        sum: this.$store.state.movie.sum, //金额
        name: this.detailInfo.movieName, //电影名
      };

      // 支付宝支付接口
      if (this.payType === "2") {
        this.$axios({
          method: "post",
          url: "/api2/aliPayment",
          data: this.$qs.stringify(data),
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }).then((res) => {
          window.location.href = res.data.data;
        });
      }
      // 微信支付接口
      else if (this.payType === "1") {
        this.$axios({
          method: "post",
          url: "/api2/wechatPayment",
          data: this.$qs.stringify(data),
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }).then((res) => {
          this.wechatCode = res.data.data;
          console.log(this.wechatCode);
          // console.log(res.data);
        });
      } else {
        alert("功能开发中...");
      }
    },

    // 隐藏微信支付付款界面
    disappear(e) {
      e.target.classList.add("hidden");
      this.disappearStatus = true;
    },

    confirm() {
      this.disappearStatus = false;
    },
  },
};
</script>

<style>
.el-result {
  width: 240px;
  height: 200px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
</style>

<style scoped>
.payContainer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  z-index: 1000;
  background: rgba(26, 173, 241, 0.2);
}

.arrow_back {
  position: absolute;
  left: 5px;
  top: 50%;
  margin-top: -13px;
  font-size: 25px;
}

.slide-enter-active {
  animation: slideMove 0.5s;
}

/*切换电影详情页的动画*/
@keyframes slideMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.contentDetail {
  margin-top: 0;
  height: auto;
}

.detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  background: 0 40%;
  filter: blur(20px);
}

.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}

.detail_list .detail_list_img {
  width: 120px;
  height: 160px;
  margin: 20px;
}

.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}

.detail_list .detail_list_info {
  margin-top: 20px;
  padding-right: 5px;
  color: #000;
}

.detail_list .detail_list_info h2 {
  font-size: 22px;
  font-weight: 800;
  line-height: 40px;
  margin-bottom: 10px;
}

.detail_list .detail_list_info p {
  line-height: 20px;
  font-size: 14px;
  margin-bottom: 5px;
}

.detail_list .detail_list_info .seat span:first-child {
  margin-left: -4px;
}

/*支付类型 */
.payType {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

.payType div {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 15px 20px;
  margin: 0 10px;
  border-radius: 10px;
  transition: all 0.2s;
  font-weight: 750;
}

.payType div img {
  width: 70%;
  margin-bottom: 5px;
}

.payType div.active {
  background: rgba(26, 173, 241, 0.3);
  color: #fff;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
  transform: scale(1.1);
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
}

.footer .sum {
  font-size: 25px;
  color: rgb(26, 173, 241);
}

.footer button {
  width: 40%;
  background: rgba(26, 173, 241, 0.8);
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 8px #ccc;
  padding: 10px 15px;
  font-size: 18px;
  color: #fff;
}

/*微信二维码 */
.wechatCode {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.wechatCode p {
  font-size: 30px;
  color: #fff;
  margin-bottom: 20px;
}

.wechatCode.hidden {
  display: none;
}
</style>
