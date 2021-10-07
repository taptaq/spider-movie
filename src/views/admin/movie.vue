<template>
  <div class="movie-wrap">
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
          <el-button size="small">编辑</el-button>
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
          email: row.email,
        })
        .then((res) => {
          var status = res.data.status;
          if (status === 0) {
            this.$alert("删除操作成功", "提示信息", {
              confirmButtonText: "确定",
              callback: (action) => {
                this.tableData.splice(index, 1);
              },
            });
          } else {
            this.$alert("删除操作成功", "提示信息", {
              confirmButtonText: "确定",
            });
          }
        });
    },

    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>


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
</style>
