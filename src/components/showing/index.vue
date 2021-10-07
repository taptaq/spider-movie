<template>
  <div class="movie_body" ref="movie_body">
    <div class="sort-wrap">
      <span :class="hot ? 'active' : ''" @click="sortByHot">
        <i class="icon-redu iconfont"></i> 按热度排序
      </span>
      <span :class="hot ? '' : 'active'" @click="sortByScore">
        <i class="icon-pingfen iconfont"></i> 按评分排序
      </span>
    </div>
    <!--正在加载就显示加载组件-->
    <loading v-if="isLoading" />
    <scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li class="pullDownMsg">{{ pullDownMsg }}</li>
        <li v-for="item in movieList" :key="item.movieId">
          <div class="pic_show" @click="handleToDetail(item.movieId)">
            <img :src="$filters.setWH(item.moviePoster, '128.180')" alt />
          </div>
          <div class="info_list" @click="handleToDetail(item.movieId)">
            <h2>{{ item.movieName }}</h2>
            <p>
              观众评：
              <span class="grade">{{ item.score }}</span>
            </p>
            <P>
              主演：
              <span v-for="item1 in item.actor" :key="item1.id">{{item1.name}}&nbsp;</span>
            </P>
            <P>{{ item.date }}</P>
          </div>
          <div class="btn_mall" @click="toSelect(item.movieId,item.movieName)">购票</div>
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
      movieList: [],
      pullDownMsg: "",
      isLoading: true,
      hot: true,
    };
  },
  mounted() {
    this.$axios.get("/api2/movies/movieList").then((res) => {
      var status = res.data.status;
      if (status === 0) {
        this.movieList = res.data.data.movieList;
        // 默认按热度排序
        this.movieList = this.movieList.sort((a, b) => {
          return b.hot - a.hot;
        });
        this.isLoading = false; //数据请求完就不用了加载了
        // console.log(this.movieList);
      }
    });
  },

  methods: {
    handleToDetail(movieId) {
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

    // 去选座
    toSelect(movieId, movieName) {
      this.$store.commit("movie/changeCurMovieMsg", {
        curMovieId: movieId,
        curMovieName: movieName,
      });
      localStorage.setItem("curMovieId", movieId);
      localStorage.setItem("curMovieName", movieName);
      this.$router.push("/selectSeat");
    },

    sortByHot(e) {
      this.movieList = this.movieList.sort((a, b) => {
        return b.hot - a.hot;
      });

      this.hot = true;
    },

    sortByScore(e) {
      this.movieList = this.movieList.sort((a, b) => {
        return b.score - a.score;
      });

      this.hot = false;
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
  padding-top: 32px;
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

/*排序区域*/
.sort-wrap {
  padding: 5px 0;
  font-size: 14px;
  width: 375px;
  height: 28px;
  background: #fff;
  position: absolute;
  z-index: 100;
}

.sort-wrap::after {
  content: "";
  display: block;
  clear: both;
}

.sort-wrap span {
  float: right;
  margin-right: 10px;
}

.sort-wrap span:first-child {
  float: left;
  margin-left: 10px;
}

.sort-wrap span.active {
  color: #946ddd;
  font-weight: 700;
}
</style>
