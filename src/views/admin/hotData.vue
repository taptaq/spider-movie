<template>
  <div class="hot_wrap">
    <div class="movieType">
      <div class="censusType" ref="censusType"></div>
      <h2>电影类型统计（前8种）</h2>
    </div>

    <div class="movieHot">
      <div class="censusHot" ref="censusHot"></div>
      <h2>电影热度值统计（TOP3）</h2>
    </div>

    <div class="movieScore">
      <div class="censusScore" ref="censusScore"></div>
      <h2>电影分值统计（TOP3）</h2>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "hotData",
  data() {
    return {
      movieList: [],
      hotData: [],
      typeData: [],
      scoreData: [],
    };
  },

  mounted() {
    this.$axios.get("/api2/movies/movieList").then((res) => {
      var status = res.data.status;
      if (status === 0) {
        this.movieList = res.data.data.movieList;
        let objType = {};
        this.movieList.forEach((item) => {
          // 遍历各电影名字及热度值
          let movieHotMsg = {
            movieName: item.movieName,
            hot: item.hot,
          };
          this.hotData.push(movieHotMsg);

          // 遍历各电影类型
          item.movieType.forEach((item) => {
            if (!objType[item]) {
              objType[item] = 1;
            } else {
              objType[item]++;
            }
          });

          // 遍历各电影名字及分值
          let movieScoreMsg = {
            movieName: item.movieName,
            score: item.score,
          };
          this.scoreData.push(movieScoreMsg);
        });
        // 对热度数据进行处理
        this.hotData = this.hotData.sort((a, b) => b.hot - a.hot).slice(0, 3);
        // 对类型数据进行处理
        this.typeData = Object.entries(objType)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8);
        // 对分值数据进行处理
        this.scoreData = this.scoreData
          .sort((a, b) => b.score - a.score)
          .slice(0, 3);
        // 执行对应配置
        this.setOption1();
        this.setOption2();
        this.setOption3();
      }
    });
  },

  methods: {
    // 类型统计的配置
    setOption1() {
      let myChart1 = echarts.init(this.$refs.censusType);
      let data = [];
      this.typeData.forEach((item) => {
        let obj = {
          value: item[1],
          name: item[0],
        };
        data.push(obj);
      });
      let option1 = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: data,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option1);
    },

    // 热度统计的配置
    setOption2() {
      let myChart2 = echarts.init(this.$refs.censusHot);
      let hot = [];
      let name = [];
      this.hotData.forEach((item) => {
        if (item.movieName.length > 4) {
          item.movieName = item.movieName.slice(0, 4) + "...";
        }
        hot.push(item.hot);
        name.push(item.movieName);
      });

      let option2 = {
        xAxis: {
          type: "category",
          data: name,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: hot,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
            label: {
              show: true,
              position: "top",
            },
          },
        ],
      };

      myChart2.setOption(option2);
    },

    // 评分统计的配置
    setOption3() {
      let myChart3 = echarts.init(this.$refs.censusScore);
      let score = [];
      let name = [];
      this.scoreData.forEach((item) => {
        if (item.movieName.length > 4) {
          item.movieName = item.movieName.slice(0, 4) + "...";
        }
        score.push(item.score);
        name.push(item.movieName);
      });

      let option3 = {
        xAxis: {
          type: "category",
          data: name,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: score,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
            label: {
              show: true,
              position: "top",
            },
          },
        ],
      };

      myChart3.setOption(option3);
    },
  },
};
</script>

<style scoped>
.hot_wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.movieType,
.movieHot,
.movieScore {
  width: 450px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.censusType,
.censusHot,
.censusScore {
  width: 300px;
  height: 378px;
}

h2 {
  position: relative;
  top: -30px;
  font-size: 25px;
}
</style>
