<template>
  <el-container class="container" style="height: 100vh; border: 1px solid #eee">
    <el-aside class="aside" style="background-color: rgb(238, 241, 246)">
      <el-menu router>
        <el-sub-menu index="1" class="menu">
          <template #title>
            <el-icon class="icon"><Menu /></el-icon>
            <span class="title">内容管理</span>
          </template>
          <el-menu-item-group>
            <template #title>分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template #title>物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header
        style="text-align: right; height: 50px; background-color: #b3c0d1"
      >
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
.menu {
  margin: 0 auto;
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-right: -10px;
  }
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.3em;
  }
}
</style>