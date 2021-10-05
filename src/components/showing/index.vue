<template>
  <div class="movie_body" ref="movie_body">
    <!--正在加载就显示加载组件-->
    <loading v-if="isLoading" />
    <scroller
      v-else
      :handleToScroll="handleToScroll"
      :handleToTouchEnd="handleToTouchEnd"
    >
      <ul>
        <li class="pullDownMsg">{{ pullDownMsg }}</li>
        <li v-for="item in movielist" :key="item.id">
          <div class="pic_show" @click="handleToDetail(item.id)">
            <img :src="$filters.setWH(item.img, '128.180')" alt="" />
          </div>
          <div class="info_list" @click="handleToDetail(item.id)">
            <h2>
              {{ item.nm }}
            </h2>
            <img
              v-if="item.version == 'v3d imax'"
              src="@/assets/3dmax.png"
              class="version"
            />
            <img
              v-if="item.version == 'v2d imax'"
              src="@/assets/2dmax.png"
              class="version"
            />
            <img
              v-if="item.version == 'v3d'"
              src="@/assets/3d.png"
              class="threedversion"
            />
            <p>
              观众评：<span class="grade">{{ item.sc }}</span>
            </p>
            <P>主演：{{ item.star }}</P>
            <P>{{ item.showInfo }}</P>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
import BScroll from "better-scroll"; //引入better-scroll插件
export default {
  name: "showing",
  data() {
    return {
      movielist: [],
      pullDownMsg: "",
      isLoading: true,
    };
  },
  mounted() {
    this.$axios.get("/api/showing.json").then((res) => {
      var msg = res.data.msg;
      if (msg === "ok") {
        this.movielist = res.data.movieList;
        this.isLoading = false; //数据请求完就不用了加载了
      }
    });
  },

  methods: {
    handleToDetail(movieId) {
      // console.log(movieId);
      this.$router.push("/movie/detail/1/" + movieId);
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        //当向上拖拽的距离大于30才触发
        this.pullDownMsg = "正在加载中...";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 50) {
        //当向上拖拽的距离大于30才触发
        this.$axios.get("/api/showing.json").then((res) => {
          var msg = res.data.msg;
          if (msg === "ok") {
            this.pullDownMsg = "加载成功";
            setTimeout(() => {
              this.movielist = res.data.movieList;
              this.pullDownMsg = "";
            }, 1000);
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.movie_body {
  flex: 1;
  overflow: auto;
  height: 77vh;
}

.movie_body::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

.movie_body ul {
  margin: 0 12px;
  overflow: auto;
}

.movie_body ul .pulldownmsg {
  font-size: 16px;
  margin: 0;
  padding: 0;
  border: none;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 10px;
}

.movie_body .pic_show {
  width: 64px;
  height: 90px;
}

.movie_body .pic_show img {
  width: 100%;
}

.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}

.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 155px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.movie_body .info_list .version {
  width: 55px;
  height: 20px;
  position: absolute;
  right: 18px;
  top: 3px;
}

.movie_body .info_list .threedversion {
  width: 30px;
  height: 20px;
  position: absolute;
  right: 18px;
  top: 3px;
}

.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}

.movie_body .btn_mall {
  width: 47px;
  height: 27px;
  line-height: 27px;
  text-align: center;
  background: #946ddd;
  color: #fff;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
}

.movie_body .pullDownMsg {
  margin: 0;
  padding: 0;
  border: none;
  text-align: center;
}
</style>
