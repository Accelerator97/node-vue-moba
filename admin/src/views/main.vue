<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="140px" style="background-color: rgb(238, 241, 246)">
      <el-menu router>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Menu /></el-icon>内容管理
          </template>
          <el-menu-item-group>
            <template #title>分类</template>
            <el-menu-item index="/category/create">新建分类</el-menu-item>
            <el-menu-item index="/category/list">分类列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; height:50px">
      </el-header>
      <el-main>
         <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Menu } from "@element-plus/icons";
export default {
  components: { Menu },
};
</script>

<style lang="scss" scoped>
.el-container{
  font-size: 14px;
  .el-header {
  background-color: #b3c0d1;
}
}
</style>