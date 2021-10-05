<template>
  <div class="cinema_body">
    <loading v-if="isLoading" />
    <scroller v-else>
      <ul>
        <li v-for="item in cinemalist" :key="item.id">
          <div>
            <span class="cinema_name">{{ item.nm }}</span>
            <span class="q">
              <span class="price">{{ item.price }}</span>
              元起
            </span>
          </div>
          <div class="address clearfix">
            <span class="addre">{{ item.address }}</span>
            <span class="dis">{{ item.dis }}</span>
          </div>
          <div class="card">
            <div v-if="item.eat" class="eat">{{ item.eat }}</div>
            <div v-if="item.discount" class="discount">{{ item.discount }}</div>
            <div v-if="item.change" class="change">{{ item.change }}</div>
            <div v-if="item.DO" class="DO">{{ item.DO }}</div>
            <div v-if="item.children" class="children">{{ item.children }}</div>
          </div>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
export default {
  name: "cinemalist",
  data() {
    return {
      cinemalist: [],
      isLoading: true,
      prevCityId: -1,
    };
  },
  mounted() {
    var cityid = this.$store.state.city.id;
    if (this.prevCityId === cityid) {
      //表示没有切换城市，无需ajax请求
      return;
    }
    this.$axios.get("/api/address_city" + cityid + ".json").then((res) => {
      var msg = res.data.msg;
      if (msg === "ok") {
        this.cinemalist = res.data.cinemalist;
        this.isLoading = false;
        this.prevCityId = cityid;
      }
    });
  },
};
</script>

<style scoped>
.cinema_body {
  flex: 1;
  overflow: auto;
  height: 82vh;
}

.movie_body::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

.cinema_body .cinema_name {
  font-size: 15px;
  font-weight: 700;
}

.cinema_body ul {
  padding: 20px;
}

.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}

.cinema_body div {
  margin-bottom: 10px;
}

.cinema_body .q {
  font-size: 11px;
  color: #946ddd;
}

.cinema_body .price {
  font-size: 20px;
  margin-left: 10px;
  font-weight: 600;
}

.cinema_body .address {
  font-size: 14px;
  color: #666;
  position: relative;
}

.cinema_body .address span.addre {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 75vw;
  float: left;
  margin-right: 5px;
}

.cinema_body .address span.dis {
  position: absolute;
  right: 0;
  top: 0;
}

.cinema_body .card {
  display: flex;
}

.cinema_body .card div {
  padding: 2px 4px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  margin-right: 5px;
}

.cinema_body .card div.discount {
  color: #589daf;
  border: 1px solid #589daf;
}

.cinema_body .card div.change {
  color: #b3682b;
  border: 1px solid #b3682b;
}

.cinema_body .card div.DO {
  color: #1352db;
  border: 1px solid #1352db;
}

.cinema_body .card div.children {
  color: #89be24;
  border: 1px solid #89be24;
}
</style>
