<template>
  <div id="main">
    <Header title="蜘蛛电影"></Header>
    <div>
      <div class="movie_menu">
        <!--tag='div' 渲染时渲染成div标签-->
        <router-link tag="div" to="/movie/city" class="city_name" ref="city_name">
          <span>{{ $store.state.city.nm }}</span>
          <i class="iconfont icon-xiajiantou"></i>
        </router-link>
        <div class="hot_switch">
          <router-link tag="div" to="/movie/showing" class="hot_item">电影列表</router-link>
          <!--
          <router-link tag="div" to="/movie/coming" class="hot_item"
            >即将上映</router-link
          >
          -->
        </div>
        <router-link tag="div" to="/movie/search" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>

      <!-- 正在热映和即将上映的电影展示页面 -->
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <Footer></Footer>
    <!-- 电影详情的页面 -->
    <router-view name="detail" />
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
import { messageBox } from "@/components/JS";

export default {
  name: "movie",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      nowCityName: window.localStorage.getItem("nowCitynm"),
    };
  },
  mounted() {
    this.handleOk(); //先进行定位,将定位得到城市赋值给弹窗的content
    this.ifCityEq();
  },
  updated() {
    //数据更新了就判断一下当前的城市状态和当前定位的城市是否相等，看是否需要重新定位
    this.ifCityEq();
  },
  methods: {
    // 定位的方法
    handleOk() {
      AMap.plugin("AMap.Geolocation", () => {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 500,
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", this.onComplete);
        AMap.event.addListener(geolocation, "error", this.onError);
      });
    },

    // 定位获取成功
    onComplete(data) {
      // data是具体的定位信息
      // console.log("定位成功信息：", data);
      var nowCityName = data.addressComponent.city.slice(0, -1); //截掉最后一个字---'市'
      var nowCityId = data.addressComponent.citycode;
      this.nowCityName = nowCityName;
      // 本地存储定位的当前城市名和城市id
      window.localStorage.setItem("nowCitynm", nowCityName);
      window.localStorage.setItem("nowCityid", nowCityId);
      this.$store.commit("city/CITY_INFO", { nm: nowCityName, id: nowCityId }); //更新当前城市的状态
    },

    // 定位获取失败
    onError(data) {
      // 定位出错
      console.log("定位失败错误：", data);
      // 调用ip定位
      this.getLngLatLocation();
    },

    getLngLatLocation() {
      AMap.plugin("AMap.CitySearch", function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            console.log("通过ip获取当前城市：", result);
            //逆向地理编码
            AMap.plugin("AMap.Geocoder", function () {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode,
              });

              var lnglat = result.rectangle.split(";")[0].split(",");
              geocoder.getAddress(lnglat, function (status, data) {
                if (status === "complete" && data.info === "OK") {
                  // result为对应的地理位置详细信息
                  console.log(data);
                }
              });
            });
          }
        });
      });
    },

    // 判断当前获取的城市和当前状态的城市是否相等，若不相等则弹出定位弹窗
    ifCityEq() {
      if (this.$store.state.city.nm !== this.nowCityName) {
        setTimeout(() => {
          messageBox({
            title: "定位",
            content: this.nowCityName,
            cancel: "取消",
            ok: "切换定位",
            handleOk: () => {
              this.handleOk();
              window.location.reload(); //切换后重新加载页面
            },
          });
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
.movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.movie_menu .city_name {
  margin-left: 20px;
  height: 100%;
  line-height: 45px;
  font-size: 16px;
}

.movie_menu .city_name.router-link-active {
  color: #946ddd;
}

.movie_menu .hot_switch {
  display: flex;
  height: 100%;
  line-height: 45px;
  margin-left: -13px;
}

.movie_menu .hot_switch .hot_item {
  font-size: 15px;
  color: #000;
  width: 80px;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
  flex: 1;
}

.movie_menu .hot_switch .hot_item.router-link-exact-active {
  color: #946ddd;
  border-bottom: 2px solid #946ddd;
}

.movie_menu .hot_switch .hot_item.active {
  color: #946ddd;
  border-bottom: 2px solid #946ddd;
}

.movie_menu .search_entry {
  margin-right: 20px;
  height: 100%;
  line-height: 45px;
}

.movie_menu .search_entry.router-link-active {
  color: #946ddd;
}

.movie_menu .search_entry i {
  font-size: 22px;
}
</style>
