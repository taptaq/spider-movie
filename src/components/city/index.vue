<template>
  <div class="city_body">
    <div class="city_list">
      <loading v-if="isLoading" />
      <scroller v-else ref="city_list">
        <div>
          <!-- 热门城市 -->
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li
                v-for="item in hotlist"
                :key="item.id"
                @click="handleToCity(item.name, item.code)"
              >{{ item.name }}</li>
            </ul>
          </div>

          <!-- 城市分类 -->
          <div class="city_sort" ref="city_sort">
            <div v-for="item in citylist" :key="item.index">
              <h2>{{ item.initial }}</h2>
              <ul>
                <li
                  v-for="itemlist in item.list"
                  :key="itemlist.code"
                  @click="handleToCity(itemlist.name, itemlist.code)"
                >{{ itemlist.name }}</li>
              </ul>
            </div>
          </div>
        </div>
      </scroller>

      <!-- 首字母侧边栏 -->
      <div class="city_index" ref="city_index">
        <ul>
          <li
            v-for="(item, index) in citylist"
            :key="item.index"
            @touchstart="handleToIndex(index)"
          >{{ item.initial }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "city",
  data() {
    return {
      hotlist: [],
      citylist: [],
      isLoading: true,
    };
  },
  mounted() {
    var citylist = window.localStorage.getItem("citylist");
    var hotlist = window.localStorage.getItem("hotlist");

    //若本地存储有相应的城市值，则直接赋值给citylist和hotlist数组
    if (citylist && hotlist) {
      this.citylist = JSON.parse(citylist);
      this.hotlist = JSON.parse(hotlist);
      this.isLoading = false;
    } else {
      //否则发起ajax请求
      this.$axios.get("/api/city.json").then((res) => {
        var msg = res.data.msg;
        if (msg === "ok") {
          this.isLoading = false;
          this.hotlist = res.data.hotcity[0].lists;
          this.citylist = res.data.city;
          // 本地存储城市数据
          window.localStorage.setItem(
            "citylist",
            JSON.stringify(this.citylist)
          );
          window.localStorage.setItem("hotlist", JSON.stringify(this.hotlist));
        }
      });
    }
  },
  methods: {
    handleToIndex(index) {
      //触碰对应的字母跳转到对应字母的城市选择区域
      var initial = this.$refs.city_sort.getElementsByTagName("h2");
      this.$refs.city_list.toScrollTop(-initial[index].offsetTop);
      var li = this.$refs.city_index.getElementsByTagName("li");
      for (let i = 0; i < li.length; i++) {
        li[i].style.background = "transparent"; //先把每一个字母的背景色变为透明色
      }
      li[index].style.background = "#ccc"; //选中的字母背景变色
    },

    handleToCity(nm, id) {
      this.$store.commit("city/CITY_INFO", { nm, id }); //把接收到对应的城市名和城市id都传给city的状态管理并更新
      window.localStorage.setItem("nowCitynm", nm);
      window.localStorage.setItem("nowCityid", id);
      this.$router.push("/movie/showing"); //选择完城市后自动跳转到正在上映的电影页面
      // window.location.reload();
    },
  },
};
</script>

<style scoped>
.city_body {
  margin-top: 95px;
  display: flex;
  width: 100%;
  height: 95vh;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  font-size: 15px;
}

.city_body .city_list {
  height: 100%;
  flex: 1;
  overflow: auto;
  background: #fff;
}

.city_body .city_list::-webkit-scrollbar {
  background: transparent;
  width: 0;
}

.city_body .city_hot {
  margin-top: 5px;
}

.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 28px;
  font-size: 16px;
  background: #f0f0f0;
  font-weight: normal;
}

.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 27%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 5px;
  text-align: center;
  box-shadow: 1px 1px 5px #ccc;
}

.city_body .city_sort div:first-child {
  margin-top: 20px;
}

.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}

.city_body .city_sort ul li {
  padding-left: 10px;
  line-height: 30px;
  box-shadow: 1px 1px 4px #ccc;
  padding-bottom: 5px;
  padding-top: 5px;
}

.city_body .city_index {
  background: #fff;
  position: fixed;
  top: 98px;
  right: 0;
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px solid #fff5f0;
  height: 100%;
}

.city_body .city_index ul {
  height: 100%;
  position: absolute;
  top: 26px;
  right: 0;
}

.city_body .city_index li {
  border-radius: 50%;
}
</style>
