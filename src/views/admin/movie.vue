<template>
  <div class="movie-wrap">
    <el-button size="small" @click="handleToAdd" class="addMovie" type="primary">添加电影信息</el-button>
    <el-table :data="nowTableData" border style="width: 100%">
      <el-table-column prop="movieId" label="电影ID"></el-table-column>
      <el-table-column prop="movieName" label="电影名"></el-table-column>
      <el-table-column prop="movieEnName" label="电影英文名" width="180"></el-table-column>
      <el-table-column prop="moviePoster" width="180" label="电影海报">
        <template #default="scope">
          <img class="moviePoster" :src="$filters.setWH(scope.row.moviePoster, '180.150')" alt />
        </template>
      </el-table-column>
      <el-table-column prop="director" label="导演">
        <template #default="scope">
          <p v-for="item in scope.row.director" :key="item.id">{{item}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="actor" width="130" label="主演">
        <template #default="scope">
          <p v-for="item in scope.row.actor" :key="item.id">{{item.name}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="评分"></el-table-column>
      <el-table-column prop="movieType" label="类型">
        <template #default="scope">
          <p v-for="item in scope.row.movieType" :key="item.id">{{item}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="hot" label="热度"></el-table-column>
      <el-table-column prop="date" label="上映时间" width="150"></el-table-column>
      <el-table-column prop="dur" label="电影时长"></el-table-column>
      <el-table-column prop="area" label="地区"></el-table-column>
      <el-table-column prop="dra" label="电影描述" width="200">
        <template #default="scope">
          <p class="dra">{{scope.row.dra}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="background" label="背景颜色" width="150"></el-table-column>
      <el-table-column label="操作" width="160">
        <template #default="scope">
          <el-button size="small" @click="handleToEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleToDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      :total="tableData.length"
    ></el-pagination>
    <div class="mc" v-show="editForm"></div>

    <el-form ref="form" :model="movieForm" label-width="85px" v-show="editForm">
      <el-form-item label="电影ID">
        <el-input v-model="movieForm.movieId" :disabled="opType==='2'?false:true"></el-input>
      </el-form-item>
      <el-form-item label="电影名">
        <el-input v-model="movieForm.movieName" :disabled="opType==='2'?false:true"></el-input>
      </el-form-item>
      <el-form-item label="电影英文名">
        <el-input v-model="movieForm.movieEnName"></el-input>
      </el-form-item>
      <el-form-item label="电影海报">
        <el-input v-model="movieForm.moviePoster"></el-input>
      </el-form-item>
      <el-form-item label="导演">
        <el-input v-model="movieForm.director"></el-input>
      </el-form-item>
      <el-form-item label="主演">
        <el-input v-model="movieForm.actor"></el-input>
      </el-form-item>
      <el-form-item label="评分">
        <el-input v-model="movieForm.score"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="movieForm.movieType"></el-input>
      </el-form-item>
      <el-form-item label="热度">
        <el-input v-model="movieForm.hot"></el-input>
      </el-form-item>
      <el-form-item label="上映时间">
        <el-input v-model="movieForm.date"></el-input>
      </el-form-item>
      <el-form-item label="电影时长">
        <el-input v-model="movieForm.dur"></el-input>
      </el-form-item>
      <el-form-item label="地区">
        <el-input v-model="movieForm.area"></el-input>
      </el-form-item>
      <el-form-item label="电影描述">
        <el-input v-model="movieForm.dra" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="背景颜色">
        <el-input v-model="movieForm.background"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="editForm=false">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: "movie",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 3,
      editForm: false,
      movieForm: {
        movieId: "",
        movieName: "",
        movieEnName: "",
        moviePoster: "",
        director: "",
        actor: "",
        score: "",
        movieType: "",
        hot: "",
        date: "",
        dur: "",
        area: "",
        dra: "",
        background: "",
      },
      opType: "1", //判断操作是编辑(1)还是添加(2)
    };
  },
  mounted() {
    this.$axios.get("/api2/movies/movieList").then((res) => {
      var status = res.data.status;
      if (status === 0) {
        this.tableData = res.data.data.movieList;
      }
    });
  },
  computed: {
    nowTableData() {
      return (
        this.tableData.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        ) || []
      );
    },
  },
  methods: {
    handleToDelete(index, row) {
      this.$axios
        .post("/api2/movies/deleteMovie", {
          movieId: row.movieId,
        })
        .then((res) => {
          var status = res.data.status;
          if (status === 0) {
            this.$alert("删除操作成功", "提示信息", {
              confirmButtonText: "确定",
              callback: (action) => {
                this.tableData.splice(index, 1);
                window.location.reload();
              },
            });
          } else {
            this.$alert("删除操作失败", "提示信息", {
              confirmButtonText: "确定",
              callback: (action) => {
                window.location.reload();
              },
            });
          }
        });
    },

    handleCurrentChange(val) {
      this.currentPage = val;
    },

    // 编辑电影数据
    handleToEdit(index, row) {
      this.opType = "1";
      this.editForm = true;
      this.movieForm.movieId = row.movieId;
      this.movieForm.movieName = row.movieName;
      this.movieForm.movieEnName = row.movieEnName;
      this.movieForm.moviePoster = row.moviePoster;
      this.movieForm.director = row.director;
      this.movieForm.actor = JSON.stringify(row.actor);
      this.movieForm.score = row.score;
      this.movieForm.movieType = row.movieType;
      this.movieForm.hot = row.hot;
      this.movieForm.date = row.date;
      this.movieForm.dur = row.dur;
      this.movieForm.area = row.area;
      this.movieForm.dra = row.dra;
      this.movieForm.background = row.background;
    },

    // 添加电影数据
    handleToAdd() {
      this.opType = "2";
      this.editForm = true;
      this.movieForm.movieId = "";
      this.movieForm.movieName = "";
      this.movieForm.movieEnName = "";
      this.movieForm.moviePoster = "";
      this.movieForm.director = "";
      this.movieForm.actor = "";
      this.movieForm.score = "";
      this.movieForm.movieType = "";
      this.movieForm.hot = "";
      this.movieForm.date = "";
      this.movieForm.dur = "";
      this.movieForm.area = "";
      this.movieForm.dra = "";
      this.movieForm.background = "";
    },

    // 提交数据
    onSubmit() {
      if (this.opType === "1") {
        this.$axios
          .post("/api2/movies/updateMovie", {
            movieForm: this.movieForm,
          })
          .then((res) => {
            var status = res.data.status;
            if (status === 0) {
              this.$alert("更新操作成功", "提示信息", {
                confirmButtonText: "确定",
                callback: (action) => {
                  window.location.reload();
                },
              });
            } else {
              this.$alert("更新操作失败", "提示信息", {
                confirmButtonText: "确定",
                callback: (action) => {
                  window.location.reload();
                },
              });
            }
          });
      } else if (this.opType === "2") {
        this.$axios
          .post("/api2/movies/addMovie", {
            movieForm: this.movieForm,
          })
          .then((res) => {
            var status = res.data.status;
            if (status === 0) {
              this.$alert("添加操作成功", "提示信息", {
                confirmButtonText: "确定",
                callback: (action) => {
                  window.location.reload();
                },
              });
            } else {
              this.$alert("添加操作失败", "提示信息", {
                confirmButtonText: "确定",
                callback: (action) => {
                  window.location.reload();
                },
              });
            }
          });
      }
    },
  },
};
</script>



<style>
.el-form {
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translateX(-50%);
  background: #fff;
  width: 40%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 16px;
  border-radius: 10px;
}

.el-form-item {
  width: 48%;
}

.el-form-item:last-child {
  width: 100%;
  position: relative;
  top: -12px;
  left: -30px;
}

.el-form-item:last-child button {
  margin: 0 10px;
}

.el-textarea__inner {
  height: 100px;
}
</style>

<style scoped>
.movie-wrap {
  text-align: center;
}

.page {
  margin-top: 20px;
  margin-left: -10px;
}

.dra {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

.mc {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 120%;
  background: rgba(0, 0, 0, 0.5);
}

.addMovie {
  position: absolute;
  right: 30px;
  top: 20px;
}
</style>
