<template>
  <el-container class="container" style="height: 100vh; border: 1px solid #eee">
    <el-aside class="aside" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1']" unique-opened :default-active="$route.path">
        <el-sub-menu index="1" class="menu">
          <template #title>
            <el-icon class="icon"><Menu /></el-icon>
            <span class="title">内容管理</span>
          </template>
          <el-menu-item-group>
            <template #title>物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template #title>英雄</template>
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template #title>文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu class="menu" index="2">
          <template #title>
            <el-icon class="icon"><Menu /></el-icon>
            <span class="title">运营管理</span>
          </template>
          <el-menu-item-group>
            <template #title>广告位</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu class="menu" index="3">
          <template #title>
            <el-icon class="icon"><Menu /></el-icon>
            <span class="title">系统管理</span>
          </template>
          <el-menu-item-group>
            <template #title>分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template #title>管理员</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
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
        <router-view :key="$route.path"></router-view>
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