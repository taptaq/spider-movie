<template>
  <div>
    <el-table :data="nowTableData" border style="width: 100%">
      <el-table-column prop="cinemaid" label="影院ID"> </el-table-column>
      <el-table-column prop="cinemaname" label="影院名"> </el-table-column>
      <el-table-column prop="address" label="影院地址"> </el-table-column>
      <el-table-column prop="star" label="评分"> </el-table-column>
      <el-table-column prop="price" label="票价"> </el-table-column>
      <el-table-column prop="movieList" label="上映电影目录"> </el-table-column>
      <el-table-column label="操作" width="220">
        <template #default="scope">
          <el-button size="small"> 编辑 </el-button>
          <el-button size="small"> 增添 </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleToDelete(scope.$index, scope.row)"
            >删除</el-button
          >
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
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "cinema",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 3,
    };
  },
  mounted() {
    this.$axios.get("/api2/admin/userList").then((res) => {
      var status = res.data.status;
      if (status === 0) {
        this.tableData = res.data.data.userList;
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
        .post("/api2/admin/deleteUser", {
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

<style></style>
