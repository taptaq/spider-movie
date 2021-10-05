<template>
  <div class="movie_body">
    <scroller>
      <ul>
        <li v-for="item in cominglist" :key="item.id">
          <div class="pic_show" @touchstart="handleToDetail(item.id)">
            <img :src="$filters.setWH(item.img, '128.180')" alt="" />
          </div>
          <div class="info_list" @touchstart="handleToDetail(item.id)">
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
              <span class="person">{{ item.wish }}</span
              >人想看
            </p>
            <p>主演：{{ item.star }}</p>
            <p>{{ item.rt }}上映</p>
          </div>
          <div class="btn_pre">预售</div>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
export default {
  name: "coming",
  data() {
    return {
      cominglist: [],
      prevCityId: -1, //表示选中上一次城市的id
    };
  },
  mounted() {
    var cityid = this.$store.state.city.id;
    if (this.prevCityId === cityid) {
      //表示没有切换城市，无需ajax请求
      return;
    }
    this.$axios.get("/api/coming_city" + cityid + ".json").then((res) => {
      var msg = res.data.msg;
      if (msg === "ok") {
        this.cominglist = res.data.coming;
        this.prevCityId = cityid;
      }
    });
  },
  methods: {
    handleToDetail(movieId) {
      this.$router.push("/movie/detail/2/" + movieId);
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
  margin-top: 15px;
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

.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 27px;
  text-align: center;
  background: #3c9fe6;
  color: #fff;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
}
</style>
