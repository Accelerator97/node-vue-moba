<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items" class="table">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="username" label="管理员名称"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button
            type="primary"
            size="medium"
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
          >
            编辑
          </el-button>
          <el-button 
            type="primary" 
            size="medium" 
            @click="remove(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/admin_users");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确认删除管理员:${row.username}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/admin_users/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.fetch(); //删除数据之后重新获取数据
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>