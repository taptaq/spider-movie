<template>
  <div class="detailContainer slide-enter-active" :style="{ background: backgroundColor }">
    <Header title="影片详情">
      <i class="iconfont icon-zuojiantou arrow_back" @touchstart="handleToBack"></i>
    </Header>
    <loading v-if="isloading" />
    <div v-else class="content_container">
      <scroller>
        <div class="contentdetail">
          <!--电影的标题，时长，封面，地区等-->
          <div class="detail_list">
            <div class="detail_list_content">
              <div class="detail_list_img">
                <img :src="$filters.setWH(detailInfo.moviePoster, '128.180')" alt />
              </div>
              <div class="detail_list_info">
                <h2>{{ detailInfo.movieName }}</h2>
                <p>{{ detailInfo.movieEnName }}</p>
                <p>
                  <span v-for="item in detailInfo.movieType" :key="item.id">{{item}}&nbsp;</span>
                </p>
                <p>{{ detailInfo.area }} / {{ detailInfo.dur }}分钟</p>
                <p>{{ detailInfo.date }} 在 {{ detailInfo.area }} 上映</p>
              </div>
            </div>
          </div>

          <!--电影简介-->
          <div class="detail_intro">
            <h3>影片简介</h3>
            <p>{{ detailInfo.dra }}</p>
          </div>

          <!--演职人员-->
          <div class="detail_player swiper-container" ref="detail_player">
            <p class="star">演职人员</p>
            <ul class="swiper-wrapper">
              <li class="swiper-slide" v-for="item in detailInfo.actor" :key="item.id">
                <div>
                  <img :src="item.img" alt />
                </div>
                <p>{{ item.name }}</p>
                <p>饰：{{ item.role }}</p>
              </li>
            </ul>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";

export default {
  name: "detail",
  components: {
    Header,
  },
  data() {
    return {
      detailInfo: {},
      isloading: true,
      backgroundColor: "",
    };
  },
  props: ["movieId"],
  methods: {
    handleToBack() {
      this.$router.back(); //返回前一页(前一级路由)
    },
  },
  mounted() {
    this.$axios
      .get(`/api2/movies/getMovie?movieId=${this.movieId}`)
      .then((res) => {
        let detailMsg = res.data.data.detailMsg[0];
        let status = res.data.status;
        if (status === 0) {
          this.detailInfo = detailMsg;
          this.backgroundColor = this.detailInfo.background;
          console.log(detailMsg);
          this.isloading = false;
          this.$nextTick(() => {
            new Swiper(this.$refs.detail_player, {
              slidesPerView: "auto", //设置slider容器能够同时显示的slides数量为自动
              freeMode: true, //自由拖放
              freeModeSticky: true, //自由对齐
              direction: "horizontal", // 水平切换选项
            });
          });
        }
      });
  },
};
</script>

<style>
.detailContainer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  z-index: 1000;
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

.content_container {
  height: 100vh;
  overflow: auto;
}

.contentdetail {
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

.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #577ab1;
  opacity: 0.55;
  /* position: relative; */
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
  width: 108px;
  height: 150px;
  margin: 20px;
}

.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}

.detail_list .detail_list_info {
  margin-top: 20px;
  color: #fff;
}

.detail_list .detail_list_info h2 {
  font-size: 22px;
  font-weight: normal;
  line-height: 40px;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 200px;
}

.detail_list .detail_list_info p {
  line-height: 20px;
  font-size: 14px;
  margin-bottom: 5px;
}

.detail_intro {
  margin-top: -5px;
  padding: 5px 17px;
  font-size: 16px;
  color: #fff;
}

.detail_intro h3 {
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: 600;
}

.detail_intro p {
  width: 343px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

.detail_player {
  margin: 20px;
  color: #fff;
}

.detail_player .star {
  font-size: 20px;
}

.detail_player .swiper-slide {
  margin-right: 20px;
  text-align: center;
  font-size: 14px;
  margin-top: 9px;
  width: 100px;
}

.detail_player .swiper-slide img {
  margin-bottom: 5px;
}

.detail_player .swiper-slide p {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.detail_player .swiper-slide p:nth-of-type(2) {
  color: #999;
}
</style>
